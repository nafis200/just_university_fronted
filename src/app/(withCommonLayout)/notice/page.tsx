
import {
  getAllExamAnnouncements,
  getAllExamApplications,
  getAllFilesFromDrive,
  getAllOthersAnnouncements
} from "@/services/ExamNoticesServices";
import Notices from "./_components/Notices";


const NoticesPage = async () => {
  const files = await getAllFilesFromDrive();
  const applications = await getAllExamApplications();
  const announcements = await getAllExamAnnouncements();
   const otherAnnouncements = await getAllOthersAnnouncements()

  return (
    <Notices
      files={files}
      applications={applications}
      announcements={announcements}
      otherAnnouncements={otherAnnouncements}
    />
  );
};

export default NoticesPage;
