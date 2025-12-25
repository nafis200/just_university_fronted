import { fetchComplains } from "@/services/ComplainServices";
import ComplainTableClient from "./_components/PendingComplain/PendingComplain";


interface PageProps {
  searchParams?: {
    searchTerm?: string;
  };
}

export default async function ComplainsPage({ searchParams }: PageProps) {
  const searchTerm = searchParams?.searchTerm || "";


  const complains = await fetchComplains(searchTerm, false);


  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Pending Complains</h1>
      <ComplainTableClient
        initialData={complains}
      />
    </div>
  );
}
