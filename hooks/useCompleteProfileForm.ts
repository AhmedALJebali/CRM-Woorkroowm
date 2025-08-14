import { supabase } from "@/lib/supabase/client";
import {
  profileSchema,
  type ProfileFormData,
} from "@/lib/validators/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function useCompleteProfileForm() {
  const [userId, setUserId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 18, 
      gender: "other",
      country: "",
      phoneNumber: "",
      avatarUrl: "",
      countryCode: 20,
    },
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user?.id) setUserId(data.user.id);
    });
  }, []);

  const onFinalSubmit = async (values: ProfileFormData) => {
    console.log("Final submit values:", values);
    setError("");
    const { error } = await supabase.from("profiles").upsert({
      id: userId,
      first_name: values.firstName,
      last_name: values.lastName,
      full_name: `${values.firstName} ${values.lastName}`,
      age: values.age,
      gender: values.gender,
      avatar_url: values.avatarUrl || null,
      phone_number: values.phoneNumber,
      country: values.country,
      country_code: values.countryCode,
    });
    console.log(error);
    if (error) {
      setError("❌ Failed to save profile.");
    } else {
      setSubmitted(true);
    }
  };

  return {
    form,
    submitted,
    error,
    onFinalSubmit,
    setError,
    userId,
  };
}
