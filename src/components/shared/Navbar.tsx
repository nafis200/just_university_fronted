"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Home, Phone, Grid, User, LogIn, LogOut } from "lucide-react";
import { logout } from "@/services/AuthServices";
import { useUser } from "@/context/UserContext";
import { showToast } from "../resuble_toast/toast";

export default function Navbar() {
  const router = useRouter();
  const { user, isLoading, setUser, setIsLoading } = useUser();

  const handleLogOut = async () => {
    const res = await logout();
    setIsLoading(true);
    if (res) {
      showToast("Logout successful!", "success");
      setUser(null);
      router.push("/login");
    } else {
      showToast("Logout failed!", "error");
    }
  };

  // if (isLoading) return <p>loading..........</p>

  return (
    <header className="bg-black text-white w-full sticky top-0 z-10 p-3 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://i.postimg.cc/Y9cT4b11/JUSTLogo.png"
            alt="Just Logo"
            width={45}
            height={45}
            className="object-contain"
          />
          <span className="font-bold text-xl tracking-wide">
            JUST ADMISSION {new Date().getFullYear() - 1}-
            {new Date().getFullYear()}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="/">
            <Button
              variant="ghost"
              className="text-white flex items-center gap-1 hover:text-yellow-400"
            >
              <Home size={16} /> Home
            </Button>
          </Link>

          <Link href="/contract">
            <Button
              variant="ghost"
              className="text-white flex items-center gap-1 hover:text-yellow-400"
            >
              <Phone size={16} /> Contract
            </Button>
          </Link>

          {user && user.role !== "STUDENTS" && (
            <Link href={`/${user.role.toLowerCase()}/dashboard`}>
              <Button
                variant="ghost"
                className="text-white flex items-center gap-1 hover:text-yellow-400"
              >
                <Grid size={16} /> Dashboard
              </Button>
            </Link>
          )}

          {user && user.role == "STUDENTS" && (
            <Link href="/profile">
              <Button
                variant="ghost"
                className="text-white flex items-center gap-1 hover:text-yellow-400"
              >
                <User size={16} /> Profile
              </Button>
            </Link>
          )}
        </nav>

        <div className="flex items-center">
          {user ? (
            <Button
              onClick={handleLogOut}
              className="bg-black text-white border border-white hover:bg-gray-200 flex items-center gap-1 font-semibold"
            >
              <LogOut size={16} /> Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button className="bg-white text-black hover:bg-gray-200 flex items-center gap-1 font-semibold">
                <LogIn size={16} /> Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
