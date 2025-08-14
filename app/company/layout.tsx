export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="bg-accent p-5 min-h-screen">{children}</main>;
}
