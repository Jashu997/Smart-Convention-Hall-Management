import { prisma } from "@/lib/prisma";
import { CalendarDays, BadgeCheck, BadgeX, CircleDollarSign } from "lucide-react";

import DashboardHeader from "@/components/admin/DashboardHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardCharts from "@/components/admin/DashboardCharts";
import BookingCalendar from "@/components/admin/BookingCalendar";
import RecentActivity from "@/components/admin/RecentActivity";
import QuickActions from "@/components/admin/QuickActions";
import ProfileCard from "@/components/admin/ProfileCard";
import ExportActions from "@/components/admin/ExportActions";
import BookingTable from "@/components/admin/BookingTable";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

export default async function AdminDashboard() {
  const totalBookings = await prisma.booking.count();
  const totalServices = await prisma.service.count();
  const totalPackages = await prisma.package.count();
  const pendingBookings = await prisma.booking.count({ where: { status: "Pending" } });
  const approvedBookings = await prisma.booking.count({ where: { status: "Approved" } });
  const confirmedBookings = await prisma.booking.count({ where: { status: "Confirmed" } });
  const cancelledBookings = await prisma.booking.count({ where: { status: "Cancelled" } });

  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  const normalizedBookings = bookings.map((booking) => ({
    ...booking,
    eventDate: booking.eventDate.toISOString(),
    createdAt: booking.createdAt.toISOString(),
  }));
  const revenue = await prisma.booking.aggregate({ _sum: { estimatedTotal: true } });
  const revenueValue = revenue._sum.estimatedTotal ?? 0;

  const statusData = [
    { name: "Pending", value: pendingBookings },
    { name: "Approved", value: approvedBookings },
    { name: "Confirmed", value: confirmedBookings },
    { name: "Cancelled", value: cancelledBookings },
  ];

  const weeklyRevenue = [
    { name: "Mon", revenue: 180000 },
    { name: "Tue", revenue: 220000 },
    { name: "Wed", revenue: 195000 },
    { name: "Thu", revenue: 268000 },
    { name: "Fri", revenue: 315000 },
    { name: "Sat", revenue: 340000 },
    { name: "Sun", revenue: 290000 },
  ];

  const monthlyRevenue = [
    { name: "Jan", revenue: 420000 },
    { name: "Feb", revenue: 470000 },
    { name: "Mar", revenue: 510000 },
    { name: "Apr", revenue: 560000 },
    { name: "May", revenue: 610000 },
    { name: "Jun", revenue: 670000 },
  ];

  const packagePopularity = [
    { name: "Royal", value: 24 },
    { name: "Elite", value: 18 },
    { name: "Classic", value: 14 },
    { name: "Signature", value: 10 },
  ];

  const stats = [
    { title: "Total Bookings", value: totalBookings, detail: "+12% from last month", icon: <CalendarDays className="h-5 w-5 text-cyan-500" />, accent: "text-cyan-500", glow: "bg-cyan-500/10" },
    { title: "Pending Bookings", value: pendingBookings, detail: "Needs attention", icon: <BadgeX className="h-5 w-5 text-amber-500" />, accent: "text-amber-500", glow: "bg-amber-500/10" },
    { title: "Approved Bookings", value: approvedBookings, detail: "Ready for confirmation", icon: <BadgeCheck className="h-5 w-5 text-emerald-500" />, accent: "text-emerald-500", glow: "bg-emerald-500/10" },
    { title: "Confirmed Bookings", value: confirmedBookings, detail: "Booked and locked", icon: <CalendarDays className="h-5 w-5 text-sky-500" />, accent: "text-sky-500", glow: "bg-sky-500/10" },
    { title: "Cancelled Bookings", value: cancelledBookings, detail: "Rework required", icon: <BadgeX className="h-5 w-5 text-rose-500" />, accent: "text-rose-500", glow: "bg-rose-500/10" },
    { title: "Total Revenue", value: `₹${revenueValue.toLocaleString()}`, detail: "+8.2% vs previous week", icon: <CircleDollarSign className="h-5 w-5 text-violet-500" />, accent: "text-violet-500", glow: "bg-violet-500/10" },
    { title: "Total Packages", value: totalPackages, detail: "Premium offers live", icon: <CalendarDays className="h-5 w-5 text-fuchsia-500" />, accent: "text-fuchsia-500", glow: "bg-fuchsia-500/10" },
    { title: "Total Services", value: totalServices, detail: "Operational add-ons", icon: <CalendarDays className="h-5 w-5 text-lime-500" />, accent: "text-lime-500", glow: "bg-lime-500/10" },
  ];

  const activities = [
    { id: "a1", title: "Booking created", customer: "Riya Sharma", status: "New", time: "2 min ago" },
    { id: "a2", title: "Invoice generated", customer: "Aman Kapoor", status: "Paid", time: "15 min ago" },
    { id: "a3", title: "Booking cancelled", customer: "Preeti Rao", status: "Cancelled", time: "41 min ago" },
    { id: "a4", title: "Status changed", customer: "Arjun Mehta", status: "Approved", time: "1 hr ago" },
  ];

  const currentDate = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const currentTime = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const greeting = getGreeting();

  return (
    <div className="space-y-6">
      <DashboardHeader
        greeting={greeting}
        currentDate={currentDate}
        currentTime={currentTime}
        bookings={normalizedBookings}
      />

      <DashboardStats stats={stats} theme="dark" />
      <QuickActions theme="dark" />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <BookingCalendar bookings={normalizedBookings} theme="dark" />
        <ProfileCard theme="dark" />
      </div>

      <DashboardCharts
        revenueData={weeklyRevenue}
        statusData={statusData}
        monthlyRevenue={monthlyRevenue}
        packagePopularity={packagePopularity}
        theme="dark"
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <RecentActivity activities={activities} theme="dark" bookings={normalizedBookings} />
        <ExportActions theme="dark" bookings={normalizedBookings} />
      </div>

      <BookingTable bookings={normalizedBookings} theme="dark" />
    </div>
  );
}