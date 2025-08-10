"use client";

import { ProfileFormData } from "@/lib/validators/profileSchema";
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
import { useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

interface PhoneCountryFormProps {
  form: UseFormReturn<ProfileFormData>;
}

export default function PhoneCountryForm({ form }: PhoneCountryFormProps) {
  const countryData = useMemo(
    () => ({
      EG: { code: 20, name: "Egypt", placeholder: "100 000 0000" },
      SA: { code: 966, name: "Saudi Arabia", placeholder: "5 000 0000" },
      AE: { code: 971, name: "UAE", placeholder: "50 000 0000" },
      MA: { code: 212, name: "Morocco", placeholder: "6 000 0000" },
      LB: { code: 961, name: "Lebanon", placeholder: "3 000 000" },
    }),
    []
  );

 
  const country = form.getValues("country");
  const countryCode = form.getValues("countryCode");

  const phonePlaceholder =
    (country && countryData[country]?.placeholder) || "100 000 0000";

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* اختيار البلد */}
      <div className="w-full">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="country" className="font-semibold">
                Country
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);

                    if (val && countryData[val]) {
                      const code = countryData[val].code;
                      if (form.getValues("countryCode") !== code) {
                        form.setValue("countryCode", code, {
                          shouldValidate: true,
                        });
                      }
                    }
                  }}
                >
                  <SelectTrigger className="w-full">
                    <div className="truncate">
                      {field.value ? countryData[field.value]?.name : "Country"}
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(countryData).map(([key, val]) => (
                      <SelectItem key={key} value={key}>
                        {val.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="mt-1 text-sm text-red-600" />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <FormLabel htmlFor="phoneNumber" className="font-semibold">
          Phone Number
        </FormLabel>
        <div className="w-full flex gap-2 ">
          <FormField
            control={form.control}
            name="countryCode"
            render={({ field }) => (
              <FormItem className="w-[20%]">
                <FormControl>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) => {
                      const numCode = Number(val); // نحوله لنمبر عشان يطابق zod.number()
                      field.onChange(numCode);

                      const found = Object.entries(countryData).find(
                        ([, valObj]) => valObj.code === numCode
                      );
                      if (found) {
                        const countryKey = found[0];
                        if (form.getValues("country") !== countryKey) {
                          form.setValue("country", countryKey, {
                            shouldValidate: true,
                          });
                        }
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(countryData).map((item) => (
                        <SelectItem key={item.code} value={String(item.code)}>
                          +{item.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder={phonePlaceholder}
                    inputMode="numeric"
                  />
                </FormControl>
                <FormMessage className="mt-1 text-sm text-red-600" />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
