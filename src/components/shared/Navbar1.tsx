"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { logout } from "@/services/AuthServices";
import { showToast } from "../resuble_toast/toast";
import { useRouter } from "next/navigation"; 
import { useUser } from "@/context/UserContext";

export default function Navbar1() {
  const router = useRouter(); 
  const { user, setUser, setIsLoading } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogOut = async () => {
    setIsLoading(true);
    const res = await logout();
    if (res) {
      setUser(null);
      showToast("Logout successful!", "success");
      router.push("/login");
    } else {
      showToast("Logout failed!", "error");
    }
    setIsLoading(false);
  };

  // Map unit to faculty title
  const unitToFaculty: Record<string, string> = {
    A: "Faculty of Engineering and Technology",
    B: "Faculty of Biological Science and Technology",
    C: "Faculty of Applied Science and Technology",
    D: "Faculty of Health Science",
    E: "Faculty of Arts and Social Science",
    F: "Faculty of Science",
    G: "Faculty of Business Studies",
    H: "Faculty of Veterinary Medicine",
  };

  const displayTitle = useMemo(() => {
    if (!user) return "";
    if (user.role === "FACULTY" || user.role === "DEAN") {
      return unitToFaculty[user.unit] || user.unit;
    }
    return user.role;
  }, [user]);

  return (
    <header className="bg-black text-white w-full sticky top-0 z-10 p-3">
      <div className="container mx-auto px-4 flex items-center justify-between">
   
         <SidebarTrigger>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="h-12 w-12 md:hidden absolute right-4"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </SidebarTrigger>
        <div className="flex-1 flex items-center">
          <span className="font-medium text-lg">{displayTitle}</span>
        </div>

      
        <nav className="flex-1 flex justify-center gap-6 text-sm sm:text-base">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/contract" className="hover:text-gray-400">
            Contact
          </Link>
        </nav>

  
        <div className="flex-1 flex justify-end items-center">
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
