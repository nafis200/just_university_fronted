/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import SidebarForm from "./_components/ProfileSidebars/SidebarForm";
import { getCurrentUser } from "@/services/AuthServices";
import { fetchPersonalInfo, getDateApplicationByGstApplicationId } from "@/services/StudentsServices";
import SubmitForm from "./_components/SubmitForm/SubmitForm";

const Profile = async () => {
  const res: any = await getCurrentUser();
  const res1 = await getDateApplicationByGstApplicationId(res.gstApplicationId);

  const res2 = await fetchPersonalInfo(res.gstApplicationId)


  const status = res1.status;

  const endDate = new Date(res1.applyEndDate); 
  const now = new Date(); 

  const showSubmitForm = status === true || now > endDate;

  return (
    <div>
      {showSubmitForm ? (
        <SubmitForm result={res1} res2={res2}/>
      ) : (
        <SidebarForm />
      )}
    </div>
  );
};

export default Profile;
