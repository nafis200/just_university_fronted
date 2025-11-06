"use client";

import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Cinput } from "@/components/reusable_form/form/Cinput";

const personalSchema = z.object({
  full_name: z.string().min(1, "Full Name is required"),
});

type FormValues = z.infer<typeof personalSchema>;

const SimpleForm = () => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(personalSchema),
    mode: "all",
    defaultValues: {
      full_name: "nafis ahamed",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("SimpleForm submitted:", data);
  };

  return (
    <div className="w-full lg:w-2/3 p-6 rounded-xl">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Cinput
              control={control}
              name="full_name"
              label="Full Name*"
              placeholder="Enter full name"
            />
          </div>

          {errors.full_name && (
            <p className="text-red-600 text-sm mt-1">
              {errors.full_name.message}
            </p>
          )}
          <div></div>

          <Button type="submit" className="px-4 py-2">
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default SimpleForm;
