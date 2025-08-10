import { supabase } from "@/lib/supabase/client";
export async function handleSignup(
  values: { email: string; password: string },
  setError: (msg: string) => void,
  onSuccess?: () => void
) {
  setError("");

  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options: {
      data: {
        is_new: true,
      },
    },
  });

  if (error) {
    setError(error.message);
    return;
  }

  if (data.user) {
    // Optionally, you can handle additional user metadata or actions here
    onSuccess?.();
  } else {
    setError("Signup failed. Please try again.");
  }
}
