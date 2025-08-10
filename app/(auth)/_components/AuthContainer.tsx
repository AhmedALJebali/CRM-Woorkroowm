import Link from "next/link";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

type AuthContainerProps = {
  login?: boolean;
};

const AuthContainer = ({ login = false }: AuthContainerProps) => {
  const title = login ? "Sign In to Woorkroom" : "Sign Up to Woorkroom";
  const subtitle = login
    ? "Please sign in to your account"
    : "Welcome to a new world";

  const FormComponent = login ? <LoginForm /> : <SignupForm />;

  const footerText = login ? (
    <p>
      Don&apos;t have an account?{" "}
      <Link href="/signup" className="text-primary underline">
        Sign up
      </Link>
    </p>
  ) : (
    <p>
      Do you have an account?{" "}
      <Link href="/login" className="text-primary underline">
        Sign in
      </Link>
    </p>
  );

  return (
    <section className="flex items-center justify-center py-12 px-6 sm:px-12">
      <div className="w-full max-w-md">
        <header className="mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </header>

        {FormComponent}

        <footer className="mt-4 text-center text-sm">{footerText}</footer>
      </div>
    </section>
  );
};

export default AuthContainer;
