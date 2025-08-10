"use client";

import { useAvatarUpload } from "@/hooks/useAvatarUpload";
import { ProfileFormData } from "@/lib/validators/profileSchema";
import { Button } from "@/ui/button";
import DefualtAvatar from "@/ui/defualtavatar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import Image from "next/image";
import { FormProvider, UseFormReturn } from "react-hook-form";
import PhoneCountryForm from "./PhoneCountryFrom";

const CompleteProfileForm = ({
  form,
  onFinalSubmit,
  submitted,
  error,
}: {
  form: UseFormReturn<ProfileFormData>;
  submitted: boolean;
  error: string;
  onFinalSubmit: (values: ProfileFormData) => Promise<void>;
}) => {
  const { preview, uploading, fileInputRef, fileNameToShow, handleFileChange } =
    useAvatarUpload(form);
  return (

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onFinalSubmit)}
          className="flex flex-col justify-between min-h-[580px]"
          noValidate
        >
          <header>
            <h1
              id="complete-profile-form-title"
              className="text-3xl font-extrabold text-center mb-4 text-gray-900"
            >
              Complete Your Profile
            </h1>
            <p className="text-center text-gray-600 max-w-lg mx-auto mb-4">
              Please provide your personal details to complete your profile
              setup.
            </p>
          </header>

          <div className="mx-auto w-full">
            <div className="p-4 grid grid-cols-1 gap-6">
              <FormField
                control={form.control}
                name="avatarUrl"
                render={() => (
                  <FormItem>
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-28 h-28 rounded-full border overflow-hidden relative mb-3">
                          {preview && !uploading ? (
                            <Image
                              src={preview}
                              alt="Avatar Preview"
                              fill
                              className="object-cover"
                              sizes="112px"
                            />
                          ) : (
                            <DefualtAvatar className="w-full h-full" />
                          )}
                        </div>
                        <FormLabel className="text-base font-semibold">
                          Profile Photo
                        </FormLabel>
                      </div>

                      <div className="flex flex-col items-start w-full max-w-xs">
                        <Input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          aria-label="Upload profile photo"
                          onChange={(e) =>
                            handleFileChange(e.target.files?.[0] || null)
                          }
                        />

                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="px-6 py-2 rounded bg-primary text-white disabled:opacity-50 w-full sm:w-auto"
                          aria-disabled={uploading}
                        >
                          {uploading
                            ? "Uploading..."
                            : preview
                            ? "Change"
                            : "Upload"}
                        </Button>

                        <p
                          className="mt-2 truncate text-sm text-gray-600 w-full"
                          title={fileNameToShow}
                        >
                          {fileNameToShow || "No file selected"}
                        </p>
                      </div>
                    </div>

                    <FormMessage className="mt-1 text-sm text-red-600" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="firstName" className="font-semibold">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="firstName"
                          placeholder="First Name"
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-sm text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="lastName" className="font-semibold">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="lastName"
                          placeholder="Last Name"
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-sm text-red-600" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="age" className="font-semibold">
                        Age
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="age"
                          type="number"
                          {...field}
                          placeholder="Age"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                          min={0}
                          max={120}
                          inputMode="numeric"
                        />
                      </FormControl>
                      <FormMessage className="mt-1 text-sm text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="gender" className="font-semibold">
                        Gender
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="mt-1 text-sm text-red-600" />
                    </FormItem>
                  )}
                />
              </div>
              <PhoneCountryForm form={form} />
            </div>
          </div>

          <div className="flex justify-end pt-8 border-t border-gray-200 w-full">
            <Button
              type="submit"
              className=" text-white px-8 py-3 rounded-lg shadow-md transition"
              disabled={submitted}
              aria-busy={submitted}
            >
              {submitted ? "Submitting..." : "Submit"}
            </Button>
          </div>

          {error && (
            <p
              className="text-red-600 text-sm mt-4 text-center"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}
        </form>
      </FormProvider>
  
  );
};

export default CompleteProfileForm;
