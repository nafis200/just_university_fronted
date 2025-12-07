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
  PlusCircle,
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
import { useUser } from "@/context/UserContext";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

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
      title: "Applicant Page",
      url: "#",
      icon: Users,
      items: [
        { title: "All Application", url: "/admin/dashboard/allApplicant" },
        { title: "Pending Application", url: "/admin/dashboard/pending" },
        { title: "Approved Application", url: "/admin/dashboard/success" },
      ],
      isActive: true,
    },
    {
      title: "Upload Documents",
      url: "#",
      icon: Upload,
      isActive: true,
      items: [
        {
          title: "Upload Students Information Excel File",
          url: "/admin/dashboard/Pdfupload",
        },
        {
          title: "Upload Required Documents",
          url: "/admin/dashboard/uploaddrive",
        },
        { title: "Delete Documents", url: "/admin/dashboard/readDrive" },
      ],
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
    {
      title: "Notice Information",
      url: "#",
      icon: PlusCircle,
      items: [
        { title: "Upload Notice", url: "/admin/dashboard/examnotice" },
        { title: "Delete Notice", url: "/admin/dashboard/examnoticeread" },
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
          url: "/admin/dashboard/departmentSeats",
        },
      ],
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
          title: "Complete Applications",
          url: "/faculty/dashboard/clearanceComplete",
        },
        {
          title: "Pending Applications",
          url: "/faculty/dashboard/pendingApplications",
        },
      ],
    },

     {
      title: "Upload Documents",
      url: "#",
      icon: Upload,
      isActive: true,
      items: [
        {
          title: "Upload Required Documents",
          url: "/faculty/dashboard/uploaddrive",
        },
        { title: "Delete Documents", url: "/faculty/dashboard/readDrive" },
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
  ],
  navMainDean: [
    {
      title: "Applicant List",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Applications",
          url: "/dean/dashboard/AllApplications",
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
          title: "Complete Applications",
          url: "/dean/dashboard/clearanceComplete",
        },
        {
          title: "Pending Applications",
          url: "/dean/dashboard/pendingApplications",
        },
      ],
    },

     {
      title: "Upload Documents",
      url: "#",
      icon: Upload,
      isActive: true,
      items: [
        {
          title: "Upload Required Documents",
          url: "/dean/dashboard/uploaddrive",
        },
        { title: "Delete Documents", url: "/dean/dashboard/readDrive" },
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
          url: "/dean/dashboard/departmentSeats",
        },
      ],
    },
  ],
   navMainRegister: [
    {
      title: "Applicant List",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "All Applications",
          url: "/register/dashboard/AllApplications",
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
          title: "Complete Applications",
          url: "/register/dashboard/clearanceComplete",
        },
        {
          title: "Pending Applications",
          url: "/register/dashboard/pendingApplications",
        },
      ],
    },

     {
      title: "Upload Documents",
      url: "#",
      icon: Upload,
      isActive: true,
      items: [
        {
          title: "Upload Required Documents",
          url: "/register/dashboard/uploaddrive",
        },
        { title: "Delete Documents", url: "/register/dashboard/readDrive" },
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
          url: "/register/dashboard/departmentSeats",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const navMap: Record<string, typeof data.navMain> = {
    admin: data.navMain,
    dean: data.navMainDean,
    faculty: data.navMainFaculty,
    register:data.navMainRegister,
    hall: data.navMain,
    student: data.navMainuser,
    hall_register:data.navMain,
  };

  

  if (!user) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarContent>
          <LoadingSpinner size="lg" />
        </SidebarContent>
      </Sidebar>
    );
  }

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
        <NavMain
          items={navMap[user?.role?.toLowerCase()] || data.navMainuser}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
