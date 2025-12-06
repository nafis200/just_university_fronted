"use client";

export default function Home() {
  // Dynamic academic year
  const currentYear = new Date().getFullYear();
  const academicYear = `${currentYear}-${currentYear + 1}`;

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="bg-linear-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white rounded-2xl shadow-2xl mb-8 overflow-hidden">
          <div className="relative py-12 px-6 text-center">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-wide">
                যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়
              </h1>
              <div className="h-1 w-32 bg-yellow-400 mx-auto mb-4 rounded"></div>
              <p className="text-2xl font-semibold text-blue-100">
                ভর্তি আবেদন {academicYear}
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left - Notices */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="h-1 flex-1 bg-gradient-to-r from-transparent to-blue-500 rounded"></div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 px-4">
                  সকল নোটিশ
                </h2>
                <div className="h-1 flex-1 bg-gradient-to-l from-transparent to-blue-500 rounded"></div>
              </div>

              <div className="space-y-3">
                {[
                  "শারীরিক শিক্ষা ও ক্রীড়া বিভাগ বিভাগে ২০২৪-২০২৫ শিক্ষাবর্ষে অপেক্ষমাণ তালিকা থেকে ভর্তি বিজ্ঞপ্তি",
                  "পিইএসএস ২০২৪-২৫ শিক্ষাবর্ষে অপেক্ষমাণ তালিকা হতে ভর্তি বিজ্ঞপ্তি",
                  "২০২৪-২৫ শিক্ষাবর্ষে শারীরিক শিক্ষা ও ক্রীড়া বিভাগ বিভাগে চূড়ান্ত ভর্তি বিজ্ঞপ্তি",
                  "২০২৪-২৫ শিক্ষাবর্ষে PESS বিভাগে স্বাতন্ত্র্য প্রথমবর্ষ ভর্তি পরীক্ষার ফলাফল",
                  "PESS ২০২৪-২৫ ব্যাবহারিক পরীক্ষার জন্য যোগ্য পরীক্ষার্থীদের তালিকা",
                  "২০২৪-২৫ শিক্ষাবর্ষে PESS বিভাগে ভর্তি পরীক্ষার আসন বিন্যাস",
                  "PESS ২০২৪-২০২৫ শিক্ষাবর্ষের স্বাতন্ত্র্য ১ম বর্ষের ভর্তি বিজ্ঞপ্তি",
                  "জবিপ্রবি ২০২৪-২০২৫ শিক্ষাবর্ষে স্বাতন্ত্র্য ১ম বর্ষে ভর্তি যোগ্যতা ও শর্তাবলী (সংশোধিত)"
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group relative p-4 pl-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent rounded-r-lg hover:from-blue-100 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full -ml-2 group-hover:scale-125 transition-transform"></div>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Dates and Exam Schedule */}
          <div className="space-y-6">

            {/* Important Dates */}
            <div className="bg-gradient from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6  transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">📅</span>
                </div>
                <h3 className="font-bold text-xl">গুরুত্বপূর্ণ তারিখ সমূহ</h3>
              </div>

              <div className="space-y-3 bg-blue-600 rounded-xl p-4 backdrop-blur-sm text-white">
                <div className="flex justify-between items-center py-2 border-b border-white border-opacity-30">
                  <span className="font-medium">আবেদন শুরু</span>
                  <span className="font-bold">০১/০৫/{currentYear}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white border-opacity-30">
                  <span className="font-medium">আবেদন শেষ</span>
                  <span className="font-bold">০৭/০৫/{currentYear}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white border-opacity-30">
                  <span className="font-medium text-sm">ফি জমাদানের শেষ তারিখ</span>
                  <span className="font-bold">০৮/০৫/{currentYear}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">প্রিলিমিনারি পরীক্ষা</span>
                  <span className="font-bold">১৫/০৫/{currentYear}</span>
                </div>
              </div>

            </div>

            {/* Exam Schedule */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-indigo-600">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-bold text-xl text-gray-800">পরীক্ষার সময়সূচিঃ</h3>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-l-4 border-green-500">
                  <p className="font-bold text-green-800 mb-1">ইউনিট C (বাণিজ্য)</p>
                  <p className="text-gray-700 text-sm">২৫/০৪/{currentYear} খ্রি. (শুক্রবার)</p>
                  <p className="text-gray-600 text-sm mt-1">⏰ বেলা ১১:০০ টা - দুপুর ১২:০০ টা</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border-l-4 border-orange-500">
                  <p className="font-bold text-orange-800 mb-1">ইউনিট B (মানবিক)</p>
                  <p className="text-gray-700 text-sm">০২/০৫/{currentYear} খ্রি. (শুক্রবার)</p>
                  <p className="text-gray-600 text-sm mt-1">⏰ বেলা ১১:০০ টা - দুপুর ১২:০০ টা</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-500">
                  <p className="font-bold text-blue-800 mb-1">ইউনিট A (বিজ্ঞান)</p>
                  <p className="text-gray-700 text-sm">০৯/০৫/{currentYear} খ্রি. (শুক্রবার)</p>
                  <p className="text-gray-600 text-sm mt-1">⏰ বেলা ১১:০০ টা - দুপুর ১২:০০ টা</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border-l-4 border-purple-500">
                  <p className="font-bold text-purple-800 mb-1">আর্কিটেকচার ব্যবহারিক (ড্রয়িং)</p>
                  <p className="text-gray-600 text-sm mt-1">⏰ বিকাল ০৩:০০ টা - বিকাল ০৪:০০ টা</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}