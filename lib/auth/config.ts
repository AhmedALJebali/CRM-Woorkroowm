// app/api/auth/[...nextauth]/route.ts
import { createServerClient } from "@supabase/ssr";
import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const cookieStore = await cookies();
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          {
            cookies: {
              getAll: () => cookieStore.getAll(),
              setAll: () => {},
            },
          }
        );

        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials?.email || "",
          password: credentials?.password || "",
        });
        console.log("Supabase login response:", data, error);

        if (error || !data.user) {
          console.error("❌ Login failed:", error?.message);
          return null;
        }
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || "User",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    newUser: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
