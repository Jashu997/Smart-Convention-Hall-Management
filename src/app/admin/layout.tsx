import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/guard";
import { DashboardShell } from "../../components/dashboard/DashboardShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  if (!user) {
    redirect("/auth");
  }

  return <DashboardShell>{children}</DashboardShell>;
}
