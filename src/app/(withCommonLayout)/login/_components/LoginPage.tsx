/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/services/AuthServices";
import { showToast } from "@/components/resuble_toast/toast";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

type LoginFormInputs = {
  gstApplicationId: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const { setIsLoading, user, setUser } = useUser();
  console.log(user, "user");

  const onSubmit = async (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    setIsLoading(true);
    try {
      const res = await loginUser(data);

      if (res.success) {
        showToast("Login successful!", "success");
        setUser(res.user);
        setIsLoading(false);

      
        router.push("/"); 
      } else {
        showToast(res.message || "Login failed!", "error");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.log(err);
      showToast("Something went wrong!", "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Login / লগইন
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Email or GST Admission Roll / ইমেইল বা জিএসটি ভর্তি রোল
            </label>
            <input
              type="text"
              {...register("gstApplicationId", {
                required: "This field is required",
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.gstApplicationId ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your Email or GST Admission Roll"
            />
            {errors.gstApplicationId && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.gstApplicationId.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block mb-2 text-gray-700 font-medium">
              Password / পাসওয়ার্ড
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password HSC roll"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Loading..." : "Login / লগইন"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
