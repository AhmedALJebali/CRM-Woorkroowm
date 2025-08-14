import CompanyJoinForm from "@/app/company/_components/CompanyJoinForm";
const page = () => {
  return (
    <>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Join Existing Company</h1>
        <p className="text-gray-600 mt-2">
          Search and select your existing company from the list.
        </p>
      </header>
      <CompanyJoinForm />
    </>
  );
};

export default page;
