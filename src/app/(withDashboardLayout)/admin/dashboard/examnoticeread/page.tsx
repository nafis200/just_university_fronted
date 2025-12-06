// app/exam-dashboard/page.tsx
import { getAllExamApplications, getAllExamAnnouncements } from "@/services/ExamNoticesServices";
import ExamDashboardClient from "./_components/ExamDashboard";

export default async function ExamDashboardTestPage() {

  const applications = await getAllExamApplications();
  const announcements = await getAllExamAnnouncements();



 
  return (
    <ExamDashboardClient
      applications={applications}
      announcements={announcements}
    />
  );
}
