"use client";

import { Button } from "@/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountTypeStep() {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleContinue = () => {
    if (!selected) return;

    switch (selected) {
      case "individual":
        router.push("/dashboard"); 
        break;
      case "owner":
        router.push("/company/create"); 
        break;
      case "member":
        router.push("/company/join"); 
        break;
    }
  };

  const options = [
    {
      key: "individual",
      title: "Individual",
      description: "Use the platform personally without a company.",
    },
    {
      key: "owner",
      title: "Company Owner",
      description: "Create and manage your own company and invite members.",
    },
    {
      key: "member",
      title: "Team Member",
      description: "Join an existing company as a team member.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Account Type</h1>

      <div className="grid gap-6">
        {options.map((opt) => (
          <Card
            key={opt.key}
            className={`cursor-pointer border-2 transition ${
              selected === opt.key ? "border-primary shadow-lg" : "border-gray-200"
            }`}
            onClick={() => setSelected(opt.key)}
          >
            <CardHeader>
              <CardTitle>{opt.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{opt.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selected}
        className="w-full mt-8 py-3 text-lg"
      >
        Continue
      </Button>
    </div>
  );
}
