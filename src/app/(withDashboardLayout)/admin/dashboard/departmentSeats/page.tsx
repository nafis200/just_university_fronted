
import { fetchDepartmentStatus } from "@/services/StudentsServices";
import AdminUnitProgress from "./_components/AdminUnitProgess";


const AdminDepartmentStatus = async () => {

  const applications = await fetchDepartmentStatus(); 


  return (
    <div className="mt-5">
    
      <AdminUnitProgress applications={applications} selectedUnit={"B"}/>
    </div>
  );
};

export default AdminDepartmentStatus;
