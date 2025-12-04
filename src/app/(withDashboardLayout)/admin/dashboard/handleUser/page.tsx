"use client";
import React, { Suspense } from "react";
import HandleUsers from "./_components/HandleUsers";

const HandleUser = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HandleUsers />
    </Suspense>
  );
};

export default HandleUser;
