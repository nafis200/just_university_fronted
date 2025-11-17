import React from "react";

const Second = () => {
  return (
    <div className="w-full mx-auto p-6 border rounded bg-white text-[14px] leading-6">
      {/* ----- শি্ক্ষাগত যোগ্যতাসমূহ Section ----- */}
      <p className="font-semibold mb-2">
        ৭। শিক্ষাগত যোগ্যতাসমূহ (Educational qualifications):
      </p>

      {/* Table */}
      <table className="w-full border text-[13px]">
        <thead>
          <tr className="border text-center">
            <th className="border p-2">পরীক্ষার নাম<br />(Name of exam)</th>
            <th className="border p-2">বোর্ড/বিশ্ববিদ্যালয়<br />(Board/University)</th>
            <th className="border p-2">শিক্ষা প্রতিষ্ঠানের নাম<br />(Institution)</th>
            <th className="border p-2">পরীক্ষা পাসের সন<br />(Passing year)</th>
            <th className="border p-2">পরীক্ষার রোল<br />(Roll)</th>
            <th className="border p-2">প্রাপ্ত শ্রেণি/জিপিএ<br />(Class/(C)GPA)</th>
            <th className="border p-2">অধ্যয়িত বিষয়সমূহ<br />(Subjects studied)</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border text-center h-[60px]">
            <td className="border p-2">এসএসসি/সমমান<br />(SSC/Equivalent)</td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
          </tr>

          <tr className="border text-center h-[60px]">
            <td className="border p-2">এইচএসসি/সমমান<br />(HSC/Equivalent)</td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
            <td className="border"></td>
          </tr>
        </tbody>
      </table>

      {/* 8 */}
      <div className="mt-5">
        ৮। ছাত্রাবস্থায় কখনও পড়াশোনা বন্ধ থাকলে তার কারণ (উচ্চ কারণ, পরিবর্তন বা ব্যাঘাতমূলক
        শিক্ষা প্রতিষ্ঠানে পরিবর্তন অথবা পরীক্ষায় অংশগ্রহণে হলে সনদসহ) উল্লেখ করতে হবে।
        (Mention causes for break of study, if any (Attach the due documents)):
        <div className="mt-2 h-[70px] border"></div>
      </div>

      {/* 9 */}
      <div className="mt-4">
        ৯। অন্য কোন অনুষদ, বিভাগ বা শিক্ষা প্রতিষ্ঠানে ভর্তি হয়ে থাকলে তার নাম  
        (Name of the faculty/department/institution already admitted):
        <div className="mt-2 h-[40px] border"></div>
      </div>

      {/* 10 */}
      <div className="mt-4">
        ১০। আবেদনকারীর বর্তমানে কোন চাকরিতে নিযুক্ত রয়েছেন কি না (নিযুক্ত থাকলে অফিস প্রধানের নিকট থেকে বিশ্ববিদ্যালয়ে ভর্তি জন্য অনুমতিপত্র (Applicants in employment shall submit an NOC issued by the employer)):
        <div className="mt-2 h-[40px] border"></div>
      </div>

      {/* 11 */}
      <div className="mt-4">
        ১১। জন্ম তারিখ (এসএসসি/সমমান সনদ অনুযায়ী) (Date of birth as per SSC/Equivalent certificate):  
        (দিন/মাস/বছর) (dd/mm/yyyy) ....................................................................................................................
      </div>

      {/* 12 */}
      <div className="mt-4">
        ১২। লিঙ্গ (পুরুষ/মহিলা/হিজড়া) {`{`}Gender (Male/Female/Transgender){`}`}:  
        ....................................................................................................................
      </div>

      {/* 13 */}
      <div className="mt-4">
        ১৩। বিবাহিত/অবিবাহিত (Married/Unmarried):  
        ....................................................................................................................
      </div>

      {/* 14 */}
      <div className="mt-4">
        ১৪। ধর্ম (Religion): ..............................................................  
        ১৫। সম্প্রদায় (Caste): ..............................................................
      </div>

      {/* 16 */}
      <div className="mt-4">
        ১৬। জাতীয়তা (Nationality):  
        ....................................................................................................................
      </div>

      {/* 17 */}
      <div className="mt-4">
        ১৭। শিক্ষার্থীর মোবাইল নম্বর (Students mobile number):  
        ....................................................................................................................
      </div>

      {/* 18 */}
      <div className="mt-4">
        ১৮। শিক্ষার্থীর ই-মেইল (Students Email):  
        ....................................................................................................................
      </div>

      {/* 19 */}
      <div className="mt-4">
        ১৯। স্বীকৃত প্রতিষ্ঠান থেকে প্রাপ্ত বৃত্তি, পদক অথবা পুরস্কার (Scholarships, medals, or prizes obtained from any recognized organization):  
        <div className="mt-2 h-[60px] border"></div>
      </div>

      <p className="text-right mt-8 text-[12px]">Page 2 of 4</p>
    </div>
  );
};

export default Second;
