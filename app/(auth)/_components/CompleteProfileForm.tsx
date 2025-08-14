"use client";

import { useSupabaseUpload } from "@/hooks/useSupabaseUpload";
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

interface CompleteProfileFormProps {
  form: UseFormReturn<ProfileFormData>;
  submitted: boolean;
  error: string;
  onFinalSubmit: (values: ProfileFormData) => Promise<void>;
  userId: string | null;
}

const CompleteProfileForm = ({
  form,
  onFinalSubmit,
  submitted,
  error,
}: CompleteProfileFormProps) => {
  const {
    preview,
    uploading,
    fileInputRef,
    fileNameToShow,
    handleFileSelect,
    uploadFile,
    selectedFile,
    
  } = useSupabaseUpload({
    bucket: "avatars",
    allowedTypes: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
  });

  const handleSubmit = async (values: ProfileFormData) => {
    let avatarUrl = values.avatarUrl;

    if (selectedFile) {
      const uploadedUrl = await uploadFile();
      if (!uploadedUrl) return; // Stop if upload failed
      avatarUrl = uploadedUrl;
    }

    await onFinalSubmit({ ...values, avatarUrl });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col justify-between min-h-[580px]"
        noValidate
      >
        <header>
          <h1 className="text-3xl font-extrabold text-center mb-4 text-gray-900">
            Complete Your Profile
          </h1>
          <p className="text-center text-gray-600 max-w-lg mx-auto mb-4">
            Please provide your personal details to complete your profile setup.
          </p>
        </header>

        <div className="mx-auto w-full p-4 grid grid-cols-1 gap-6">
          {/* Avatar Field */}
          <FormField
            control={form.control}
            name="avatarUrl"
            render={() => (
              <FormItem>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-28 h-28 rounded-full border overflow-hidden relative mb-3">
                      {preview ? (
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
                      onChange={(e) =>
                        handleFileSelect(e.target.files?.[0] || null)
                      }
                    />

                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="px-6 py-2 bg-primary text-white w-full sm:w-auto"
                    >
                      {preview ? "Change" : "Upload"}
                    </Button>

                    <p
                      className="mt-2 truncate text-sm text-gray-600 w-full"
                      title={fileNameToShow}
                    >
                      {fileNameToShow || "No file selected"}
                    </p>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="First Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Last Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Age"
                      value={field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      min={0}
                      max={120}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone Form */}
          <PhoneCountryForm form={form} />
        </div>

        <div className="flex justify-end pt-8 border-t border-gray-200 w-full">
          <Button type="submit" disabled={submitted || uploading}>
            {submitted || uploading ? "Processing..." : "Submit"}
          </Button>
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}
      </form>
    </FormProvider>
  );
};

export default CompleteProfileForm;
