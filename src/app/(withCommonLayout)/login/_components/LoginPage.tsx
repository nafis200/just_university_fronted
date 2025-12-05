"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { loginUser, getCurrentUser } from "@/services/AuthServices";
import { showToast } from "@/components/resuble_toast/toast";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type LoginFormInputs = {
  gstApplicationId: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { refetchUser } = useUser(); // এখানে আমরা শুধুমাত্র refetchUser ব্যবহার করব
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await loginUser(data);
      console.log(res)

      if (res.success) {
        
         refetchUser();

        queryClient.invalidateQueries();

        showToast("Login successful!", "success");
        router.push("/");
      } else {
        showToast(res.message || "Login failed!", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login / লগইন</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Email or GST Admission Roll / ইমেইল বা জিএসটি ভর্তি রোল</label>
            <input
              type="text"
              {...register("gstApplicationId", { required: "This field is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.gstApplicationId ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your Email or GST Admission Roll"
            />
            {errors.gstApplicationId && <p className="text-red-500 mt-1 text-sm">{errors.gstApplicationId.message}</p>}
          </div>

          <div className="relative">
            <label className="block mb-2 text-gray-700 font-medium">Password / পাসওয়ার্ড</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter your password HSC roll"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-2 transform -translate-y-1/2 text-gray-500">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
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
