import type { Metadata } from "next";
import AuthContainer from "../_components/AuthContainer";
import AuthSidebar from "../_components/AuthSidebar";
export const metadata: Metadata = {
  title: "Sign Up | Woorkroom CRM",
  description:
    "Create a new Woorkroom account to manage your tasks, clients, and deals.",
  keywords: [
    "CRM",
    "sign up",
    "client management",
    "task management",
    "Woorkroom",
  ],
  openGraph: {
    title: "Sign Up | Woorkroom CRM",
    description:
      "Create a new Woorkroom account to manage your tasks, clients, and deals.",
    url: "https://yourdomain.com/signup",
    siteName: "Woorkroom",
    images: [
      {
        url: "https://yourdomain.com/og-signup.png",
        width: 1200,
        height: 630,
        alt: "Woorkroom CRM Sign Up",
      },
    ],
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <main className="min-h-[94vh] grid grid-cols-1 md:grid-cols-2 bg-white rounded-r-4xl">
      {/* Left Side - Image & Branding */}
      <AuthSidebar />
      {/* Right Side - Login Form */}
      <AuthContainer />
    </main>
  );
};

export default page;
