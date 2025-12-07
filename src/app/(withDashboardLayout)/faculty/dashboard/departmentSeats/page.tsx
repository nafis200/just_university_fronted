import Adminunit from "@/app/(withDashboardLayout)/admin/dashboard/departmentSeats/_components/Adminunit";
import { fetchDepartmentStatus } from "@/services/StudentsServices";

const FacultyDepartmentStatus = async () => {
  const applications = await fetchDepartmentStatus();

  return (
    <div className="mt-5">
      <Adminunit applications={applications} />
    </div>
  );
};

export default FacultyDepartmentStatus;
