import Logo from "@/ui/logo";
import Image from "next/image";
const AuthSidebar = () => {
  return (
    <aside className="relative flex flex-col justify-between pt-12 pb-3 px-8 sm:px-16 bg-primary text-white rounded-l-4xl">
      {/* Top: Logo & Branding */}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <Logo />
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Woorkroom
          </h1>
        </div>

        <p className="text-2xl sm:text-5xl font-semibold max-w-lg leading-tight text-muted-foreground">
          Your place to work. Plan. Create. Control.
        </p>
      </div>

      {/* Bottom: Illustration */}
      <div className="relative w-full h-64 sm:h-96 ">
        <Image
          className="object-contain object-bottom"
          fill
          src="/login/login.svg"
          alt="CRM Illustration"
        />
      </div>
    </aside>
  );
};

export default AuthSidebar;
