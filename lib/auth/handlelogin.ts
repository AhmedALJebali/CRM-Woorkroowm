// lib/auth/handlers.ts
"use client";

import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
export async function handleLogin(
  email: string,
  password: string,
  setError: (msg: string) => void,
  router?: ReturnType<typeof useRouter>,
  onSuccess?: () => void
) {
  setError("");

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log("Supabase login response:", data, error);
  if (error) {
    setError("Invalid email or password.");
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.user_metadata?.is_new) {
      router?.push("/signup/completeprofile");
    } else {
      router?.push("/");
      // onSuccess?.();
    }
  }
}
