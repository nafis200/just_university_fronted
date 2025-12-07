/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useUser } from "@/context/UserContext";
import AdminUnitProgress from "./AdminUnitProgess";


const Adminunit = ({applications}:any) => {
    const {user} = useUser();
    let selectedUnit = "all";
    if(user?.role === "FACULTY" || user?.role === "DEAN"){
         selectedUnit = user?.unit
    }
    return (
        <div>
            <AdminUnitProgress applications={applications} selectedUnit={selectedUnit}/> 
        </div>
    );
};

export default Adminunit;