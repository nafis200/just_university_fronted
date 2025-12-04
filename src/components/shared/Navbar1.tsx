"use client";

import { useState } from "react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { logout } from "@/services/AuthServices";
import { showToast } from "../resuble_toast/toast";
import { useRouter } from "next/navigation"; // <-- changed
import { useUser } from "@/context/UserContext";

export default function Navbar1() {
  const router = useRouter(); // App Router compatible
  const { user, setUser, setIsLoading } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogOut = async () => {
    setIsLoading(true);
    const res = await logout();
    if (res) {
      setUser(null);
      showToast("Logout successful!", "success");
      router.push("/login"); // works in App Router
    } else {
      showToast("Logout failed!", "error");
    }
    setIsLoading(false);
  };

  return (
    <header className="bg-black text-white w-full sticky top-0 z-10 p-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
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
        </div>

        <div className="flex mt-2 gap-6 justify-end flex-1 text-sm sm:text-base">
          <Link href="/" className="hover:text-gray-400 mt-1">
            Home
          </Link>
          <Link href="/contract" className="hover:text-gray-400 mt-1">
            Contact
          </Link>
          <Button
            onClick={handleLogOut}
            className="bg-black text-white border border-white hover:bg-gray-200 flex items-center gap-1 font-semibold"
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>
      </div>

      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-black border-t border-gray-700 p-4 flex flex-col gap-2 text-white md:hidden">
          <Link href="/" className="hover:text-gray-400" onClick={toggleMenu}>
            Home
          </Link>
          <Link
            href="/contract"
            className="hover:text-gray-400"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Button
            onClick={() => {
              handleLogOut();
              toggleMenu();
            }}
            className="bg-black text-white border border-white hover:bg-gray-200 flex items-center gap-1 font-semibold"
          >
            <LogOut size={16} /> Logout
          </Button>
        </nav>
      )}
    </header>
  );
}
