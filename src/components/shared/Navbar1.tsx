"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export default function Navbar1() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

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

          <div className="h-[10]"></div>
        </div>

        <div className="flex gap-6 justify-center flex-1 text-sm sm:text-base">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
          <Link href="/mealcard" className="hover:text-gray-400">
            All Products
          </Link>
          <Link href="/contact" className="hover:text-gray-400">
            Contact
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-black border-t border-gray-700 p-4 flex flex-col gap-2 text-white md:hidden">
          <Link href="/" className="hover:text-gray-400" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-400" onClick={toggleMenu}>
            About
          </Link>
          <Link href="/mealcard" className="hover:text-gray-400" onClick={toggleMenu}>
            All Products
          </Link>
          <Link href="/contact" className="hover:text-gray-400" onClick={toggleMenu}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
