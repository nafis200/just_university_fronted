"use client";

import { useState } from "react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { logout } from "@/services/AuthServices";
import { showToast } from "../resuble_toast/toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar1() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, refetchUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogOut = async () => {
    try {
      const res = await logout();
      if (res) {
        refetchUser();
        queryClient.clear();

        showToast("Logout successful!", "success");
        router.push("/login");
      } else {
        showToast("Logout failed!", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <header className="bg-black text-white w-full sticky top-0 z-10 p-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="h-12 w-12"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SidebarTrigger>
          <Link href="/" className="text-xl font-bold tracking-wide hover:text-gray-300">
            JUST ADMISSION {new Date().getFullYear() - 1}-{new Date().getFullYear()}
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm sm:text-base">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/contract" className="hover:text-gray-400">Contact</Link>
          {user && (
            <Button
              onClick={handleLogOut}
              className="bg-black text-white border border-white hover:bg-gray-200 flex items-center gap-1 font-semibold"
            >
              <LogOut size={16} /> Logout
            </Button>
          )}
        </nav>

        {menuOpen && (
          <nav className="absolute top-full left-0 w-full bg-black border-t border-gray-700 p-4 flex flex-col gap-2 text-white md:hidden z-20">
            <Link href="/" className="hover:text-gray-400" onClick={toggleMenu}>Home</Link>
            <Link href="/contract" className="hover:text-gray-400" onClick={toggleMenu}>Contact</Link>
            {user && (
              <Button
                onClick={() => {
                  handleLogOut();
                  toggleMenu();
                }}
                className="bg-black text-white border border-white hover:bg-gray-200 flex items-center gap-1 font-semibold"
              >
                <LogOut size={16} /> Logout
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
