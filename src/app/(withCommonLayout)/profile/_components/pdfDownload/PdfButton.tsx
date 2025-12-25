/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, User, Mail, GraduationCap, FileText, Award, Users, Home, Building2, Briefcase } from "lucide-react";

type Props = {
  onPrev: () => void;
  submitData: () => void;
  FormData: any;
};

export const PdfButton = ({
  onPrev,
  submitData,
  FormData,
}: Props) => {
  if (!FormData) return null;

  return (
    <div className="min-h-screepy-12 px-4 ml-5">
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Application Preview
          </h1>
          <p className="text-slate-600">Review your information before downloading</p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto ml-5 rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
        <div className="p-8 space-y-8">
          {/* Personal Information */}
          <Section 
            title="Personal Information" 
            icon={<User className="w-5 h-5" />}
            gradient="from-blue-500 to-indigo-600"
          >
            <Item label="Name (English)" value={FormData.Name} />
            <Item label="Name (বাংলা)" value={FormData.NAME_BN} />
            <Item label="Father's Name" value={FormData.Father} />
            <Item label="Mother's Name" value={FormData.Mother} />
            <Item label="Gender" value={FormData.Gender} />
            <Item label="Date of Birth" value={FormData.Dob} />
            <Item label="Blood Group" value={FormData.BloodGroup} />
            <Item label="Religion" value={FormData.Religion} />
            <Item label="Marital Status" value={FormData.MaritalStatus} />
            <Item label="Nationality" value={FormData.Nationality} />
            <Item label="NID" value={FormData.NID} />
            <Item label="Caste" value={FormData.Caste} />
          </Section>

          {/* Contact & Address */}
          <Section 
            title="Contact & Address" 
            icon={<Home className="w-5 h-5" />}
            gradient="from-emerald-500 to-teal-600"
          >
            <Item label="Phone Number" value={FormData.PhoneNumber} />
            <Item label="Email" value={FormData.Email} />
            <Item label="Present Address" value={FormData.PresentAddress} />
            <Item label="Village" value={FormData.Village} />
            <Item label="District" value={FormData.District} />
            <Item label="Thana" value={FormData.Thana} />
            <Item label="Post Office" value={FormData.PostOffice} />
            <Item label="Post Code" value={FormData.PostCode} />
            <Item label="Country" value={FormData.Country} />
          </Section>

          {/* Academic Information */}
          <Section 
            title="Academic Information" 
            icon={<GraduationCap className="w-5 h-5" />}
            gradient="from-purple-500 to-pink-600"
          >
            <Item label="Program" value={FormData.Program} />
            <Item label="Department" value={FormData.Department} />
            <Item label="Hall Name" value={FormData.HallName} />
            <Item label="Already Admitted Institution" value={FormData.AlreadyAdmittedInstitution} />
            <Item label="Applicant Employment" value={FormData.ApplicantEmployment} />
            <Item label="Scholarships" value={FormData.Scholarships} />
            <Item label="Study Break Cause" value={FormData.StudyBreakCause} />
          </Section>

          {/* SSC Information */}
          <Section 
            title="SSC Information" 
            icon={<FileText className="w-5 h-5" />}
            gradient="from-orange-500 to-red-600"
          >
            <Item label="Board" value={FormData.SSCBoard} />
            <Item label="Roll" value={FormData.SSCRoll} />
            <Item label="Year" value={FormData.SSCYear} />
            <Item label="GPA" value={FormData.SSCGpa} />
            <Item label="Subject" value={FormData.SSCSubject} />
            <Item label="Institution" value={FormData.SSCInstitution} />
          </Section>

          {/* HSC Information */}
          <Section 
            title="HSC Information" 
            icon={<Award className="w-5 h-5" />}
            gradient="from-cyan-500 to-blue-600"
          >
            <Item label="Board" value={FormData.HSCBoard} />
            <Item label="Roll" value={FormData.HSCRoll} />
            <Item label="Year" value={FormData.HSCYear} />
            <Item label="GPA" value={FormData.HSCGpa} />
            <Item label="Subject" value={FormData.HSCSubject} />
            <Item label="Institution" value={FormData.HSCInstitution} />
          </Section>

          {/* Guardian Information */}
          <Section 
            title="Guardian Information" 
            icon={<Users className="w-5 h-5" />}
            gradient="from-violet-500 to-purple-600"
          >
            <Item label="Name" value={FormData.GuardianName} />
            <Item label="Relation" value={FormData.GuardianRelation} />
            <Item label="Phone" value={FormData.GuardianPhone} />
            <Item label="Occupation" value={FormData.GuardianOccupation} />
            <Item label="Monthly Income" value={FormData.GuardianMonthlyIncome} />
            <Item label="NID" value={FormData.GuardianNID} />
            <Item label="Village" value={FormData.GuardianVillage} />
            <Item label="District" value={FormData.GuardianDistrict} />
            <Item label="Thana" value={FormData.GuardianThana} />
            <Item label="Post Office" value={FormData.GuardianPostOffice} />
            <Item label="Post Code" value={FormData.GuardianPostCode} />
            <Item label="Country" value={FormData.GuardianCountry} />
          </Section>

          {/* Legal Guardian Information */}
          <Section 
            title="Legal Guardian Information" 
            icon={<Building2 className="w-5 h-5" />}
            gradient="from-rose-500 to-pink-600"
          >
            <Item label="Name" value={FormData.LegalGuardianName} />
            <Item label="Relation" value={FormData.LegalGuardianRelation} />
            <Item label="Phone" value={FormData.LegalGuardianPhone} />
            <Item label="Occupation" value={FormData.LegalGuardianOccupation} />
            <Item label="Income" value={FormData.LegalGuardianIncome} />
            <Item label="NID" value={FormData.LegalGuardianNID} />
            <Item label="Village" value={FormData.LegalGuardianVillage} />
            <Item label="District" value={FormData.LegalGuardianDistrict} />
            <Item label="Thana" value={FormData.LegalGuardianThana} />
            <Item label="Post Office" value={FormData.LegalGuardianPostOffice} />
            <Item label="Post Code" value={FormData.LegalGuardianPostCode} />
            <Item label="Country" value={FormData.LegalGuardianCountry} />
          </Section>

          {/* Local Guardian Information */}
          <Section 
            title="Local Guardian Information" 
            icon={<Briefcase className="w-5 h-5" />}
            gradient="from-amber-500 to-orange-600"
          >
            <Item label="Name" value={FormData.LocalGuardianName} />
            <Item label="Relation" value={FormData.LocalGuardianRelation} />
            <Item label="Phone" value={FormData.LocalGuardianPhone} />
            <Item label="NID" value={FormData.LocalGuardianNID} />
            <Item label="Village" value={FormData.LocalGuardianVillage} />
            <Item label="District" value={FormData.LocalGuardianDistrict} />
            <Item label="Thana" value={FormData.LocalGuardianThana} />
            <Item label="Post Office" value={FormData.LocalGuardianPostOffice} />
            <Item label="Post Code" value={FormData.LocalGuardianPostCode} />
            <Item label="Country" value={FormData.LocalGuardianCountry} />
          </Section>
        </div>

        {/* Buttons */}
        <div className="bg-linear-to-r from-slate-50 to-slate-100 px-8 py-6 flex justify-center gap-4 border-t border-slate-200">
          <Button
            type="button"
            onClick={onPrev}
            className="group relative px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2.5 border border-slate-200 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-slate-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <ChevronLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-0.5 transition-transform duration-300" />
            <span className="relative z-10">Previous</span>
          </Button>

          <Button
            onClick={submitData}
            className="group relative px-8 py-3.5 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 font-medium flex items-center gap-2.5 overflow-hidden hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Download className="w-4 h-4 relative z-10 group-hover:translate-y-0.5 transition-transform duration-300" />
            <span className="relative z-10">Download PDF</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- Helper Components ---------------- */

const Section = ({
  title,
  icon,
  gradient,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className={`p-2.5 rounded-xl bg-linear-to-br ${gradient} text-white shadow-md`}>
        {icon}
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pl-1">
      {children}
    </div>
  </div>
);

const Item = ({ label, value }: { label: string; value: any }) => (
  <div className="group relative bg-linear-to-br from-slate-50 to-slate-100/50 hover:from-white hover:to-slate-50 rounded-xl p-4 border border-slate-200/60 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
    <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:to-indigo-500/5 rounded-xl transition-all duration-300"></div>
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 relative z-10">{label}</p>
    <p className="text-sm font-medium text-slate-800 relative z-10 wrap-break-word">
      {value || <span className="text-slate-400">-</span>}
    </p>
  </div>
);