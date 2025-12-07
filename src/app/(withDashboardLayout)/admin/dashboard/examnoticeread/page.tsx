// app/exam-dashboard/page.tsx
import { getAllExamApplications, getAllExamAnnouncements, getAllOthersAnnouncements } from "@/services/ExamNoticesServices";
import ExamDashboardClient from "./_components/ExamDashboard";

export default async function ExamDashboardTestPage() {

  const applications = await getAllExamApplications();
  const announcements = await getAllExamAnnouncements();
  const otherAnnouncements = await getAllOthersAnnouncements()


 
  return (
    <ExamDashboardClient
      applications={applications}
      announcements={announcements}
      otherAnnouncements={otherAnnouncements}
    />
  );
}
