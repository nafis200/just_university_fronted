
import { fetchUsersExcludingStudents } from "@/services/AdminServices";
import HandleUserTable from "./HandleUserTable";

const HandleUsers = async () => {
  const res = await fetchUsersExcludingStudents();
  const users = res.data || [];



  return (
    <div>
      <HandleUserTable users={users} />
    </div>
  );
};

export default HandleUsers;
