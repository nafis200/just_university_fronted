"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type LoginFormInputs = {
  gstOrEmail: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    // Add your login logic here
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
              {...register("gstOrEmail", {
                required: "This field is required",
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.gstOrEmail ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your Email or GST Admission Roll"
            />
            {errors.gstOrEmail && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.gstOrEmail.message}
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
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 mt-1 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Login / লগইন
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
