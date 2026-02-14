import { Header } from "@/components/layout/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full">
        <Header />
        <div className="flex">
            <DashboardSidebar />
            <main className="flex-1 p-6 md:p-8">
                {children}
            </main>
        </div>
    </div>
  );
}
