"use client";

import React from "react";
import { useUser } from "@/context/UserContext";
import { FaLinkedinIn, FaGithub, FaFacebookF } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const DashboardApplication = () => {
  const { user } = useUser();

  return (
    <section className="relative min-h-screen mt-1 dark:bg-gray-900 dark:text-gray-200">
      <div className="h-64 w-full relative">
        <Image
          src="https://i.postimg.cc/ZnYt4BMN/pexels-photo-326055.jpg"
          alt="Background"
          fill
          className="object-cover dark:brightness-75"
          priority
        />
      </div>

      <div className="max-w-3xl mx-auto -mt-28 bg-white shadow-xl rounded-xl p-6 relative z-10 dark:bg-gray-800 dark:shadow-gray-700">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-white shadow-md dark:border-gray-700">
            <Image
              src="https://i.postimg.cc/286RtWvR/glasses-lie-laptop-reflecting-light-from-screen-dark-169016-52267.jpg"
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="text-2xl font-bold mt-4 dark:text-gray-100">Welcome</h1>

          <div className="mt-4 text-center space-y-1">
            <p>
              <strong>Email:</strong> {user?.gstApplicationId || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {user?.role || "N/A"}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-5 mt-6">
            <Link
              href="https://www.linkedin.com"
              target="_blank"
              className="text-gray-500 hover:text-blue-600 transition dark:text-gray-400 dark:hover:text-blue-400"
            >
              <FaLinkedinIn size={24} />
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="text-gray-500 hover:text-black transition dark:text-gray-400 dark:hover:text-white"
            >
              <FaGithub size={24} />
            </Link>

            <Link
              href="https://facebook.com"
              target="_blank"
              className="text-gray-500 hover:text-blue-500 transition dark:text-gray-400 dark:hover:text-blue-400"
            >
              <FaFacebookF size={24} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DashboardApplication;
