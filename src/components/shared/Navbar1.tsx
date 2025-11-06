"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { protectedRoutes } from "@/contants";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../modules/dashboard/sidebar/mode-toggle";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

const mealItems = [
  { _id: "67c228932e2b697ec2c81ea9", name: "Haddock" },
  { _id: "67c2289e2e2b697ec2c81eab", name: "drinks" },
  { _id: "67c228b22e2b697ec2c81ead", name: "Escalope de Veau" },
  { _id: "67c228cd2e2b697ec2c81eb1", name: "Roast Duck Breast" },
  { _id: "67c228ec2e2b697ec2c81eb7", name: "Breton Fish Stew" },
  { _id: "67cacd7aefb12935551789e5", name: "Chicken and Walnut Salad" },
  { _id: "67cac5f51d75d67dbc568e37", name: "singara-puri" },
  { _id: "67c96653e5a81bbf3245b61f", name: "fish and rice" },
];

export default function Navbar1() {
  const { user, setIsLoading } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const openMenu = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setMegaMenuOpen(true);
  };

  const closeMenuWithDelay = () => {
    closeTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const handleLogOut = () => {
    logout();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const filteredMeals = mealItems.filter((meal) =>
    meal.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSelectMeal = (mealId: string) => {
    setSearchTerm("");
    setShowDropdown(false);
    router.push(`/mealcard/${mealId}`);
  };

  return (
    <header className="bg-black text-white w-full sticky top-0 z-10 p-2">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
             <div className="block md:hidden">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SidebarTrigger>
            </div>
          <Link href="/" className="text-2xl font-black text-white whitespace-nowrap">
             <Image
                src="https://i.postimg.cc/0y77JqPJ/Pngtree-a-chef-holding-hamburger-and-20111871.png"
                alt="Food Logo"
                width={60}
                height={60}
                className="object-cover rounded-full"

              />
          </Link>
{/*  */}

          <div className="flex-1 max-w-lg mx-4 relative">
            <input
              type="text"
              placeholder="Search meals..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              onFocus={() => searchTerm && setShowDropdown(true)}
              className="w-full border border-gray-700 bg-gray-800 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showDropdown && searchTerm.trim() && (
              <div className="absolute top-full left-0 w-full bg-black border border-gray-700 rounded mt-1 shadow-lg z-30">
                {filteredMeals.length > 0 ? (
                  filteredMeals.map((meal) => (
                    <button
                      key={meal._id}
                      onClick={() => handleSelectMeal(meal._id)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                    >
                      {meal.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-400">No meals found</div>
                )}
              </div>
            )}
          </div>

          <button onClick={toggleMenu} className="shrink-0 rounded-full overflow-hidden">
            <Image
              src="https://i.postimg.cc/WpBbtZK4/03-2.png"
              alt="Menu"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </button>
        </div>
        {menuOpen && (
          <nav className="mt-4 flex flex-col gap-3 text-sm font-medium text-white">
            {[{ href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/mealcard", label: "All Products" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setMenuOpen(false)}
                className="hover:text-gray-400"
              >
                {link.label}
              </Link>
            ))}

            <div onMouseEnter={openMenu} onMouseLeave={closeMenuWithDelay} className="relative">
              <button
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                className="text-white"
              >
                Category
              </button>
              {megaMenuOpen && (
                <div
                  className="mt-2 w-full bg-black border border-gray-700 rounded shadow-lg p-4 grid grid-cols-1 gap-2 z-20"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenuWithDelay}
                >
                  {mealItems.map((meal) => (
                    <Link
                      key={meal._id}
                      href={`/mealcard/${meal._id}`}
                      className="block px-3 py-2 rounded hover:bg-gray-700"
                      onClick={() => {
                        setMegaMenuOpen(false);
                        setMenuOpen(false);
                      }}
                    >
                      {meal.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {user && (
              <>
                <Link href="/profile" className="text-white" onClick={() => setMenuOpen(false)}>
                  Update Profile
                </Link>
                <Link
                  href={`/${user?.jwtPayload?.role}/dashboard`}
                  className="text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}

            {user ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setMenuOpen(false);
                }}
                className="text-white text-left"
              >
                Log Out
              </button>
            ) : (
              <Link href="/login" className="text-white" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
            <ModeToggle />
          </nav>
        )}
      </div>
    </header>
  );
}
