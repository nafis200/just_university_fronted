
import { getAllFilesFromDrive } from "@/services/ExamNoticesServices";
import GoogleDriveList from "./_components/GoogleDriveList";

export default async function DriveTestPage() {
   const data = await getAllFilesFromDrive();

 

  return (
    <div>
      <GoogleDriveList data={data} />;
    </div>
  );
}
