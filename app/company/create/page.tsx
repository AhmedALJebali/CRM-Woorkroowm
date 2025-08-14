import CompanyCreateForm from "@/app/company/_components/CompanyCreateForm";
const page = () => {
  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create New Company</h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below to register your company.
        </p>
      </header>
      <CompanyCreateForm />
    </>
  );
};

export default page;
