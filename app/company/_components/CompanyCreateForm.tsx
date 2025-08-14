"use client";

import { useCompanyForm } from "@/hooks/useCompanyInfoForm";
import { useSupabaseUpload } from "@/hooks/useSupabaseUpload";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/ui/button";
import DefualtAvatar from "@/ui/defualtavatar";
import {
  Form,
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function CreateCompanyForm() {
  const { form, teamSizeOptions } = useCompanyForm();
  const [userId, setUserId] = useState<string | null>(null);

  const {
    preview,
    uploading,
    fileInputRef,
    fileNameToShow,
    handleFileSelect,
    uploadFile,
    selectedFile,
    setPreview,
  } = useSupabaseUpload({
    bucket: "compiany-logos",
    allowedTypes: [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/jfif",
      "image/webp",
      "image/svg",
    ],
    maxFileSizeMB: 5,
    replaceOldFiles: true,
  });
  const router = useRouter();
  // Load saved logo from localStorage on mount
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.id) setUserId(data.user.id);
    });
    const savedLogo = localStorage.getItem("compianyLogo");
    if (savedLogo) {
      setPreview(savedLogo);
      form.setValue("compianyLogo", savedLogo);
    }
  }, [form, setPreview]);

  const onSubmit = async (data: any) => {
    // let logoUrl = data.compianyLogo;

    // // If a new file is selected, upload it
    // if (selectedFile) {
    //   const uploadedUrl = await uploadFile();
    //   if (!uploadedUrl) return; // Stop if upload failed
    //   logoUrl = uploadedUrl;
    //   localStorage.setItem("compianyLogo", uploadedUrl);
    // }

    const { error } = await supabase.from("companies").upsert({
      name: data.companyName,
      email: data.companyEmail,
      phone: data.companyPhone,
      country: data.companyCountry,
      city: data.companyCity,
      business_direction: data.businessDirection,
      team_size: data.teamSize,
      created_by_user_id: userId,
    });

    if (error) {
      console.error(error);
      alert("Error creating company");
    } else {
      alert("Company created successfully!");
    }
    // router.push("/dashboard");
  };

  return (
    <section
      className="bg-white rounded-xl p-8 shadow max-w-5xl mx-auto"
      aria-labelledby="create-company-form"
    >
      <h2 id="create-company-form" className="sr-only">
        Company Registration Form
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Logo */}
            <FormField
              control={form.control}
              name="companyLogo"
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
                        Company Logo
                      </FormLabel>
                    </div>

                    <div className="flex flex-col items-start w-full max-w-xs">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        aria-label="Upload company logo"
                        onChange={(e) =>
                          handleFileSelect(e.target.files?.[0] || null)
                        }
                      />

                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="px-6 py-2 rounded bg-primary text-white disabled:opacity-50 w-full sm:w-auto"
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

            {/* Company Name */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel htmlFor="companyName">
                    Your Company's Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="companyName"
                      {...field}
                      placeholder="Company Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="companyEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="companyEmail">Company Email</FormLabel>
                  <FormControl>
                    <Input
                      id="companyEmail"
                      {...field}
                      placeholder="info@company.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="companyPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="companyPhone">Company Phone</FormLabel>
                  <FormControl>
                    <Input
                      id="companyPhone"
                      {...field}
                      placeholder="+20 100 000 0000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
              <legend className="sr-only">Company Address</legend>

              <FormField
                control={form.control}
                name="companyCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="companyCountry">Country</FormLabel>
                    <FormControl>
                      <Input
                        id="companyCountry"
                        {...field}
                        placeholder="Enter country"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="companyCity">City</FormLabel>
                    <FormControl>
                      <Input
                        id="companyCity"
                        {...field}
                        placeholder="Enter city"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>

            {/* Business Direction */}
            <FormField
              control={form.control}
              name="businessDirection"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="businessDirection">
                    Business Direction
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id="businessDirection" className="w-full">
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it_programming">
                          IT & Programming
                        </SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Team Size */}
            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem className="mb-6 col-span-2">
                  <FormLabel className="text-base">
                    How many people in your team?
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-4 mt-2">
                      {teamSizeOptions.map((option) => (
                        <Button
                          key={option.value}
                          type="button"
                          variant={
                            field.value === option.value ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => field.onChange(option.value)}
                          className="px-3 py-1 text-sm"
                        >
                          {option.label}
                        </Button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <Button type="submit" className="w-full py-3 text-lg">
            Create Company
          </Button>
        </form>
      </Form>
    </section>
  );
}
