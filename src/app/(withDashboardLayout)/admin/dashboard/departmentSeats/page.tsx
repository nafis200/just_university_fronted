
import { fetchDepartmentStatus } from "@/services/StudentsServices";
import Adminunit from "./_components/Adminunit";
export const dynamic = "force-dynamic";




const AdminDepartmentStatus = async () => {

  const applications = await fetchDepartmentStatus(); 


  return (
    <div className="mt-5">
    
      {/* <AdminUnitProgress applications={applications} selectedUnit={"B"}/> */}
      <Adminunit applications={applications}/>
    </div>
  );
};

export default AdminDepartmentStatus;
