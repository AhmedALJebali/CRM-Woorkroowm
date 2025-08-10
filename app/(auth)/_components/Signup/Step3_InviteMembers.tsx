"use client";

import { Button } from "@/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/ui/form";
import { Input } from "@/ui/input";
import { Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import { ProfileFormData } from "@/lib/validators/profileSchema";
import { useFieldArray } from "react-hook-form";

const Step3_InviteMembers = ({
  form,
}: {
  form: UseFormReturn<ProfileFormData>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teamMembers",
  });

useEffect(() => {
  const currentMembers = form.getValues("teamMembers");
  if (!currentMembers || currentMembers.length === 0) {
    append({ email: "" });
  }
}, [append, form]);

  return (
    <div className="w-[80%] mx-auto p-4 grid grid-cols-1 gap-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Invite Team Members
      </h2>

      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={form.control}
          name={`teamMembers.${index}.email`}
          render={({ field: fieldProps }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel>Member Email</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="email"
                  placeholder="member@example.com"
                  className="flex-1"
                />
              </FormControl>
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => remove(index)}
                >
                  <X />
                </Button>
              )}
            </FormItem>
          )}
        />
      ))}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ email: "" })}
          className="p-4"
        >
          <Plus /> Add another Member
        </Button>
      </div>
    </div>
  );
};

export default Step3_InviteMembers;
