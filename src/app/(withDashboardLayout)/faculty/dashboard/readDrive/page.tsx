import GoogleDriveList from "@/app/(withDashboardLayout)/admin/dashboard/readDrive/_components/GoogleDriveList";
import { getAllFilesFromDrive } from "@/services/ExamNoticesServices";
export const dynamic = "force-dynamic";

export default async function FacultyDriveTestPage() {
   const data = await getAllFilesFromDrive();

 

  return (
    <div>
      <GoogleDriveList data={data} />;
    </div>
  );
}