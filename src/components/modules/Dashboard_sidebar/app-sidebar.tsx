"use client";

import * as React from "react";
import {
  Home,
  Coffee,
  ClipboardList,
  Upload,
  User,
  Users,
  CheckCircle,
  Database,
  FileWarning,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Dashboard Home",
      url: "#",
      icon: Home,
      items: [{ title: "Admin Dashboard", url: "/admin/dashboard" }],
      isActive: true,
    },
    {
      title: "Upload pdf",
      url: "#",
      icon: Upload,
      isActive: true,
      items: [{ title: "Upload file", url: "/admin/dashboard/Pdfupload" }],
    },
    {
      title: "Credentails",
      url: "#",
      icon: ClipboardList,
      items: [
        { title: "Create Credentials", url: "/admin/dashboard/credential" },
      ],
    },
    {
      title: "User managament",
      url: "#",
      icon: User,
      items: [{ title: "Manage All user", url: "/admin/dashboard/handleUser" }],
    },
  ],
  navMainuser: [
    {
      title: "Dashboard Home",
      url: "#",
      icon: Home,
      items: [
        { title: "Home page", url: "/user/dashboard" },
        { title: "ProfilePage", url: "/user/dashboard/home" },
      ],
      isActive: true,
    },
    {
      title: "Meal Options",
      url: "#",
      icon: Coffee,
      isActive: true,
      items: [
        { title: "Prefer Meal", url: "/user/dashboard/prefermeal" },
        { title: "View and Update", url: "/user/dashboard/preferviewmeal" },
      ],
    },
    {
      title: "Order Options",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "Payment Order Details",
          url: "/user/dashboard/preferpaymentorder",
        },
        { title: "View Order Details", url: "/user/dashboard/prefervieworder" },
      ],
    },
  ],
  navMainFaculty: [
    {
      title: "Applicant List",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Applications",
          url: "/faculty/dashboard/AllApplications",
        },
      ],
    },

    {
      title: "Approved Applicants",
      url: "#",
      icon: CheckCircle,
      isActive: true,
      items: [
        {
          title: "Clearance Complete",
          url: "/faculty/dashboard/clearanceComplete",
        },
        {
          title: "Pending Applications",
          url: "/faculty/dashboard/pendingApplications",
        },
      ],
    },

    {
      title: "Department Seats Status",
      url: "#",
      icon: Database,
      isActive: true,
      items: [
        {
          title: "Seats Status",
          url: "/faculty/dashboard/departmentSeats",
        },
      ],
    },

    {
      title: "Pending Documents Status",
      url: "#",
      icon: FileWarning,
      isActive: true,
      items: [
        {
          title: "Documents Status",
          url: "/faculty/dashboard/pending-documents",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = "faculty";

  const navMap: Record<string, typeof data.navMain> = {
    admin: data.navMain,
    dean: data.navMain,
    faculty: data.navMainFaculty,
    hall: data.navMain,
    student: data.navMainuser,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              {/*  */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMap[user] || data.navMainuser} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
