"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type DashboardShellProps = {
  children: React.ReactNode;
};

const menuItems = [
  { name: "Dashboard", href: "/admin" },
  { name: "Bookings", href: "/admin/bookings" },
  { name: "Packages", href: "/admin/packages" },
  { name: "Services", href: "/admin/services" },
  { name: "Gallery", href: "/admin/gallery" },
  { name: "Hall Details", href: "/admin/hall" },
  { name: "Contacts", href: "/admin/contacts" },
  { name: "Settings", href: "/admin/settings" },
];

export function DashboardShell({
  children,
}: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-slate-900 p-6">

        <h2 className="mb-8 text-2xl font-bold text-cyan-300">
          Admin Panel
        </h2>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-xl px-4 py-3 transition ${
                pathname === item.href
                  ? "bg-cyan-500 text-white"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>

    </div>
  );
}