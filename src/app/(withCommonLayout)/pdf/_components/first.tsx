import React from "react";
import Image from "next/image";

const FirstPage = () => {
  return (
    <div className="w-full mx-auto p-6 border rounded bg-white text-[14px]">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        {/* Left Photo Box */}
        <div className="w-[120px] h-[150px] border flex items-center justify-center text-center text-[12px] p-2">
          পাসপোর্ট সাইজের<br />১ কপি ছবি আঠা দিয়ে সংযুক্ত করুন<br />
          (Paste a passport size photograph)
        </div>

        {/* Center Logo & Title */}
        <div className="text-center">
          <Image
            src="https://i.postimg.cc/Y9cT4b11/JUSTLogo.png"
            alt="Just Logo"
            width={70}
            height={70}
            className="object-contain mx-auto"
          />

          <p className="font-bold text-[16px] mt-2">
            যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়  
          </p>
          <p>যশোর 7408, বাংলাদেশ</p>
          <p className="font-semibold mt-1">
            Jashore University of Science and Technology  
          </p>
          <p>Jashore 7408, Bangladesh</p>

          <p className="font-bold text-[18px] mt-3 underline">
            স্নাতক শিক্ষার্থী ভর্তি ফরম
          </p>
          <p className="text-[15px] font-medium">
            Undergraduate Students Admission Form
          </p>

          {/* Session Box */}
          <p className="font-semibold mt-2">
            শিক্ষাবর্ষ (Session): 20 ___ - 20 ___
          </p>
        </div>

        {/* Right Info Box */}
        <div className="w-[180px] border p-2 text-[12px] leading-5">
          ইউনিট (Unit): <br />
          মেধাক্রম (Merit position): <br />
          ক্লাস রোল (Class roll): <br />
          শিক্ষাবর্ষ (Session): <br />
          রেজিস্ট্রেশন নং (Reg. number):
        </div>
      </div>

      {/* Recommendation Boxes */}
      <div className="grid grid-cols-4 mt-6 text-center text-[12px]">
        <div className="border p-2">
          সমন্বয়কারীর সুপারিশ<br />
          (Coordinator&rsquo;s recommendation)<br />
          <div className="mt-4">(স্বাক্ষর ও সিল)</div>
        </div>
        <div className="border p-2">
          প্রোভোস্টের সুপারিশ<br />
          (Provost&#39;s recommendation)<br />
          <div className="mt-4">(স্বাক্ষর ও সিল)</div>
        </div>
        <div className="border p-2">
          যাচাইকৃত<br />
          (Verified)<br />
          <div className="mt-4">(স্বাক্ষর ও সিল)</div>
        </div>
        <div className="border p-2">
          ভর্তি করুন<br />
          (Admit)<br />
          <div className="mt-4">(স্বাক্ষর ও সিল)</div>
        </div>
      </div>

      {/* Form fields */}
      <div className="mt-6 space-y-4 text-[14px]">
        <div>
          ১। শিক্ষার্থীর নাম (Student’s name):  
          <br /> (ক) বাংলায়: ..........................................................
          <br /> (খ) ইংরেজিতে: .......................................................
        </div>

        <div>
          ২। পিতার নাম (Father’s name):  
          ....................................................................................
        </div>

        <div>
          ৩। মাতার নাম (Mother’s name):  
          ....................................................................................
        </div>

        <div>
          ৪। ভর্তির বিভাগ (Admitting department):  
          ....................................................................................
        </div>

        <div>
          ৫। ভর্তির প্রোগ্রাম (Admitting program):  
          ....................................................................................
        </div>

        <div>
          ৬। সংযুক্ত হলের নাম (Hall attached):  
          ....................................................................................
        </div>
      </div>

      <p className="text-right mt-8 text-[12px]">Page 1 of 4</p>
    </div>
  );
};

export default FirstPage;
