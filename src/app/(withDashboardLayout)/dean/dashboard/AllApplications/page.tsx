/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { AllfetchApplicants } from "@/services/FacultServices";
import FacultyApplication from "./_components/AllApplication";
export const dynamic = "force-dynamic";
export default async function AllApplicationPage({ searchParams }: any) {
  const subject = searchParams?.department;
  const search = searchParams?.search;
  const page = parseInt(searchParams?.page) || 1;
  const limit = parseInt(searchParams?.limit) || 10;

  const applicantsDatas = await AllfetchApplicants({
    subject,
    page,
    limit,
    search,
  });

  return (
    <div className="p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-4 text-center">All Applicants</h1>
      <div className="">
        <FacultyApplication
          applications={applicantsDatas.data}
          meta={applicantsDatas.meta}
        />
      </div>
    </div>
  );
}
