"use client"
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-[94vh] w-[90%] mx-auto rounded-2xl bg-white shadow-md">
      <div className="relative w-full h-64 sm:h-96 ">
        <Image
          className="object-contain object-bottom"
          fill
          src="/login/login.svg"
          alt="CRM Illustration"
        />
      </div>
      <Label className="text-2xl font-semibold text-gray-800 mt-4">
        You are successfully registered!
      </Label>
      <Button
        className="mt-4"
        onClick={() => {
          router.push("/");
        }}
      >
       Let's Start <ArrowRight />
      </Button>
    </div>
  );
};

export default page;
