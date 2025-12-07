/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/resuble_toast/toast";
import { registerUser } from "@/services/AuthServices";

type CredentialsFormInputs = {
  gstApplicationId: string;
  password: string;
  role: string;
  unit?: string;
};

const CreateCredentialsPage = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CredentialsFormInputs>({
    defaultValues: { gstApplicationId: "", password: "", role: "", unit: "" },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: CredentialsFormInputs) => {
    try {
      const result = await registerUser(data as FieldValues);

      if (result && result?.message) {
        showToast("User created successfully!", "success");
        reset();
      } else {
        showToast(result.message || "Failed to create user", "error");
      }
    } catch (err: any) {
      showToast(err.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 ">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-indigo-600">
          Create Credentials / ক্রেডেনশিয়াল তৈরি করুন
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Fill in the form to create a special user account. / বিশেষ
          ব্যবহারকারীর অ্যাকাউন্ট তৈরি করতে নিচের ফর্মটি পূরণ করুন।
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="gstApplicationId"
            control={control}
            rules={{
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            }}
            render={({ field }) => (
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Email / ইমেইল
                </label>
                <Input
                  {...field}
                  placeholder="Enter email / ইমেইল লিখুন"
                  className={errors.gstApplicationId ? "border-red-500" : ""}
                />
                {errors.gstApplicationId && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.gstApplicationId.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            }}
            render={({ field }) => (
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Password / পাসওয়ার্ড
                </label>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter password / পাসওয়ার্ড লিখুন"
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <div>
                <label className="block mb-2 text-gray-700 font-medium">
                  Role / ভূমিকা
                </label>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role / ভূমিকা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ADMIN">Admin / প্রশাসক</SelectItem>
                    <SelectItem value="DEAN">Dean / ডীন</SelectItem>
                    <SelectItem value="FACULTY">Faculty / শিক্ষক</SelectItem>
                    <SelectItem value="REGISTER">
                      Register / রেজিস্টার
                    </SelectItem>
                    <SelectItem value="HALL_REGISTER">
                      Hall Register / হল রেজিস্টার
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500 mt-1 text-sm">
                    {errors.role.message}
                  </p>
                )}
              </div>
            )}
          />

          {(selectedRole === "FACULTY" || selectedRole === "DEAN") && (
            <Controller
              name="unit"
              control={control}
              rules={{ required: "Unit is required for Faculty/Dean" }}
              render={({ field }) => (
                <div>
                  <label className="block mb-2 text-gray-700 font-medium">
                    Unit / ইউনিট
                  </label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Unit / ইউনিট নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">
                        Faculty of Engineering and Technology
                      </SelectItem>
                      <SelectItem value="B">
                        Faculty of Biological Science and Technology
                      </SelectItem>
                      <SelectItem value="C">
                        Faculty of Applied Science and Technology
                      </SelectItem>
                      <SelectItem value="D">
                        Faculty of Health Science
                      </SelectItem>
                      <SelectItem value="E">
                        Faculty of Arts and Social Science
                      </SelectItem>
                      <SelectItem value="F">Faculty of Science</SelectItem>
                      <SelectItem value="G">
                        Faculty of Business Studies
                      </SelectItem>
                      <SelectItem value="H">
                        Faculty of Veterinary Medicine
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.unit && (
                    <p className="text-red-500 mt-1 text-sm">
                      {errors.unit.message}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
          >
            Create Credentials / ক্রেডেনশিয়াল তৈরি করুন
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCredentialsPage;
