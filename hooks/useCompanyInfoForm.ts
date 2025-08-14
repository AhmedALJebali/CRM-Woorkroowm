// hooks/useCompanyInfoForm.ts
"use client";

import { CompanyFormData, companySchema } from "@/lib/validators/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const existingCompanies = [
  { label: "Tech Solutions", value: "tech_solutions" },
  { label: "Marketing Hub", value: "marketing_hub" },
  { label: "EduPro", value: "edupro" },
] as const;
const teamSizeOptions = [
  { label: "Only me", value: "only_me" },
  { label: "2 - 5", value: "2_5" },
  { label: "6 - 10", value: "6_10" },
  { label: "11 - 20", value: "11_20" },
  { label: "21 - 40", value: "21_40" },
  { label: "41 - 50", value: "41_50" },
  { label: "51 - 100", value: "51_100" },
  { label: "101 - 500", value: "101_500" },
  { label: "501 - 1000", value: "501_1000" },
  { label: "More than 1000", value: "more_than_1000" },
] as const;
export function useCompanyForm(defaultValues?: Partial<CompanyFormData>) {
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      companyCountry: "",
      companyCity: "",
      businessDirection: "",
      teamSize: "",
      companyLogo: "",
      ...defaultValues,
    },
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = useMemo(() => {
    return existingCompanies.filter((company) =>
      company.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const noMatch = searchTerm && filteredCompanies.length === 0;

  return {
    form,
    searchTerm,
    setSearchTerm,
    filteredCompanies,
    noMatch,
    existingCompanies,
    teamSizeOptions,
  };
}
