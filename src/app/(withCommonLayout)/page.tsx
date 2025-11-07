import { AdmissionFAQ } from "./_components/AdmissionFAQ";
import Swipper from "./_components/Swipper";

export default function Home() {
  return (
    <div>
      <Swipper/>
      <div className = "mt-10 px-10">
        <AdmissionFAQ/>
      </div>
    </div>
  );
}
