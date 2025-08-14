"use client";
import { useForm } from "react-hook-form";
import { useCompanyForm } from "@/hooks/useCompanyInfoForm";
import { Button } from "@/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/form";
import { Input } from "@/ui/input";
import CompanySearchCard from "./Cards/CompanySearchCard";

type JoinCompanyFormData = {
  companyName: string;
};
export default function JoinCompanyForm() {
  const {
    searchTerm,
    setSearchTerm,
    filteredCompanies,
    noMatch,
    existingCompanies,
  } = useCompanyForm();
  const form = useForm<JoinCompanyFormData>({
    defaultValues: { companyName: "" },
  });

  const onSubmit = (data: any) => {
    console.log("Joining company:", data);
  };

  return (
    <section
      className="w-full bg-white rounded-xl p-8 shadow max-w-5xl mx-auto min"
      aria-labelledby="join-company-form"
    >
      <h2 id="join-company-form" className="sr-only">
        Company Search Form
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <fieldset>
            <legend className="sr-only">Select your company</legend>

            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    htmlFor="companySearch"
                    className="block mb-3 font-medium text-lg"
                  >
                    Select your company
                  </FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div
                          className="flex items-center justify-between p-4 border rounded-lg bg-gray-100"
                          role="status"
                        >
                          <span className="font-medium text-gray-800">
                            {
                              existingCompanies.find(
                                (c) => c.value === field.value
                              )?.label
                            }
                          </span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => field.onChange("")}
                            aria-label="Change selected company"
                          >
                            Change
                          </Button>
                        </div>
                      ) : (
                        <Input
                          id="companySearch"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          aria-describedby="searchHelp"
                        />
                      )}

                      <p id="searchHelp" className="sr-only">
                        Type to search for your company name
                      </p>

                      {searchTerm && !noMatch && !field.value && (
                        <div
                          className="grid gap-2 mt-3"
                          role="listbox"
                          aria-live="polite"
                        >
                          {filteredCompanies.map((company) => (
                            <CompanySearchCard
                              key={company.value}
                              title={company.label}
                              onClick={() => {
                                field.onChange(company.value);
                                setSearchTerm("");
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {noMatch && !field.value && (
                        <p
                          className="text-sm text-gray-500 mt-2"
                          role="alert"
                          aria-live="assertive"
                        >
                          No matches found for "{searchTerm}"
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <Button
            type="submit"
            className="w-full py-3 text-lg"
            aria-label="Submit company join form"
          >
            Join Company
          </Button>
        </form>
      </Form>
    </section>
  );
}
