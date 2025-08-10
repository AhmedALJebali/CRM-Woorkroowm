"use client";
import { useCompleteProfileForm } from "@/hooks/useCompleteProfileForm";
import Step2_CompanyInfo from "../../_components/CompanyInfoForm";
import CompleteProfileForm from "../../_components/CompleteProfileForm";

const Page = () => {
  const formState = useCompleteProfileForm();

  return (
    <main className="min-h-[94vh] flex">
      <section
        className="col-span-3 w-full max-w-3xl mx-auto pt-10 pb-8 bg-white rounded-3xl shadow-md px-6 sm:px-10"
        aria-labelledby="complete-profile-form-title"
      >
        {formState.submitted ? (
          <CompleteProfileForm {...formState} />
        ) : (
          <Step2_CompanyInfo />
        )}
      </section>
    </main>
  );
};

export default Page;
