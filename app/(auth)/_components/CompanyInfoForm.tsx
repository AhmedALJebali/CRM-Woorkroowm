"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import CompanySearchCard from "./Cards/CompanySearchCard";

export default function CompanyForm() {
  const {
    form,
    searchTerm,
    setSearchTerm,
    filteredCompanies,
    noMatch,
    existingCompanies,
    teamSizeOptions,
  } = useCompanyForm();

  const onSubmit = (data: any) => {
    console.log("Submitted:", data);
  };

  return (
    <div className=" w-full items-center justify-center px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Company Information
      </h2>
      <div className="w-full  bg-white rounded-xl p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Company Status */}
            <FormField
              control={form.control}
              name="companyStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-3 font-medium text-lg">
                    Do you have an existing company?
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant={
                          field.value === "existing" ? "default" : "outline"
                        }
                        className="flex-1"
                        onClick={() => field.onChange("existing")}
                      >
                        Yes
                      </Button>
                      <Button
                        type="button"
                        variant={field.value === "new" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => field.onChange("new")}
                      >
                        No, create new
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Existing company search */}
            {form.watch("companyStatus") === "existing" && (
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-3 font-medium text-lg">
                      Select your company
                    </FormLabel>
                    <FormControl>
                      <div>
                        {field.value ? (
                          <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-100">
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
                            >
                              Change
                            </Button>
                          </div>
                        ) : (
                          <Input
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        )}

                        {searchTerm && !noMatch && !field.value && (
                          <div className="grid gap-2 mt-3">
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
                          <p className="text-sm text-gray-500 mt-2">
                            No matches found for "{searchTerm}"
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* New company fields */}
            {/* New company fields */}
            {form.watch("companyStatus") === "new" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company Name */}
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Your Company's Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Company Name" />
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
                      <FormLabel>Company Email</FormLabel>
                      <FormControl>
                        <Input
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
                      <FormLabel>Company Phone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="+20 100 000 0000" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <FormField
                    control={form.control}
                    name="companyCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter country" />
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
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter city" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Subscription Plan */}
                {/* <FormField
                  control={form.control}
                  name="subscriptionPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subscription Plan</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a plan" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="free">Free</SelectItem>
                            <SelectItem value="basic">Basic</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="enterprise">
                              Enterprise
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Business Direction */}
                <FormField
                  control={form.control}
                  name="businessDirection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Direction</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
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
                                field.value === option.value
                                  ? "default"
                                  : "outline"
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
                      <FormMessage className="mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <Button type="submit" className="w-full py-3 text-lg">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
