/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import AdminApplication from "./_components/AdminApplication";
import { fetchApplicants } from "@/services/AdminServices";

const AdminApplicationpage = async ({ searchParams }: any) => {
  const unit = searchParams?.unit;
  const subject = searchParams?.department;
  const search = searchParams?.search;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;

  

  const applicantsDatas = await fetchApplicants({
    subject,
    unit,
    page,
    limit,
    search
  });

  return (
    <div className="p-4 max-w-6xl">
  <h1 className="text-2xl font-bold mb-4 text-center">All Applicants</h1>
  <div className="">
    <AdminApplication
      applications={applicantsDatas.data}
      meta={applicantsDatas.meta}
    />
  </div>
</div>

  );
};

export default AdminApplicationpage;
