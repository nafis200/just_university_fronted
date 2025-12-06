
import {
  getAllExamAnnouncements,
  getAllExamApplications,
  getAllFilesFromDrive,
} from "@/services/ExamNoticesServices";
import Notices from "./_components/Notices";


const NoticesPage = async () => {
  const files = await getAllFilesFromDrive();
  const applications = await getAllExamApplications();
  const announcements = await getAllExamAnnouncements();

  return (
    <Notices
      files={files}
      applications={applications}
      announcements={announcements}
    />
  );
};

export default NoticesPage;
