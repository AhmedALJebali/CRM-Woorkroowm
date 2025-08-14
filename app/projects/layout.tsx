import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen justify-between flex-row-reverse bg-accent p-5 ">
      <div className="flex-1 px-2">
        <Header />
        {children}
      </div>

      <Sidebar />
    </main>
  );
}
