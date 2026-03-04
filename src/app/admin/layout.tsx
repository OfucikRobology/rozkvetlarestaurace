import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin | Rozkvetlá restaurace",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster richColors position="top-center" />
    </>
  );
}
