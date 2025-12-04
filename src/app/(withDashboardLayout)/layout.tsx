import React from "react";

import type { Metadata } from "next";

import Navbar1 from "@/components/shared/Navbar1";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/modules/Dashboard_sidebar/app-sidebar";
export const metadata: Metadata = {
  title: "Just Dashboard",
  description: "Meal Shop restaurant",
  icons: {
    icon: "/faviconz.ico",
  },
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Navbar1 />
        <main className="p-4 pt-0 min-h-screen dark:bg-gray-900">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
