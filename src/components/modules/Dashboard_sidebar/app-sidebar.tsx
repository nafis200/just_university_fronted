"use client";

import * as React from "react";
import { Home, Coffee, ClipboardList, Tag } from "lucide-react";

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
      items: [
        { title: "Home page", url: "/admin/dashboard" },
        { title: "ProfilePage", url: "/admin/dashboard/home" },
      ],
      isActive: true,
    },
    {
      title: "Meal Options",
      url: "#",
      icon: Coffee,
      isActive: true,
      items: [
        { title: "Make Meal", url: "/admin/dashboard/createmeal" },
        { title: "Update Meal", url: "/admin/dashboard/updatemeal" },
      ],
    },
    {
      title: "Order Options",
      url: "#",
      icon: ClipboardList,
      items: [
        { title: "View Order", url: "/admin/dashboard/vieworder" },
        { title: "Payment Order", url: "/admin/dashboard/paymentorder" },
      ],
    },
    {
      title: "Cupon Options",
      url: "#",
      icon: Tag,
      items: [
        { title: "Create Cupon", url: "/admin/dashboard/cupon/create" },
        { title: "Delete Cupon", url: "/admin/dashboard/cupon/viewcoupon" },
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
        { title: "Payment Order Details", url: "/user/dashboard/preferpaymentorder" },
        { title: "View Order Details", url: "/user/dashboard/prefervieworder" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = "student"; 

  const navMap: Record<string, typeof data.navMain> = {
    admin: data.navMain,
    dean: data.navMain,
    faculty: data.navMain,
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
