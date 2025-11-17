
export default function Fourth() {
  return (
    <div className="w-full min-h-screen flex justify-center bg-white p-8">
      <div className="w-full max-w-3xl text-black leading-relaxed text-justify">

        {/* Commitment Statement */}
        <h2 className="text-center font-bold text-xl mb-2">অঙ্গীকারনামা</h2>
        <h3 className="text-center font-semibold text-lg mb-4">(Commitment Statement)</h3>

        <p className="mb-4">
          আমি এই মর্মে অঙ্গীকার করছি যে, যশোর বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়ের শিক্ষার্থী থাকাকালীন আমি বিশ্ববিদ্যালয় ও সংযুক্ত হলের আইন মেনে 
          চলব এবং শৃঙ্খলা পরিপন্থী কোনো কর্মকাণ্ডে লিপ্ত হব না । আমি সত্যিই এই ফরম পূরণ করেছি এবং এতে লিখিত তথ্যাবলী সত্য । আমি 
          আরো অঙ্গীকার করছি যে, বিশ্ববিদ্যালয়ের শিক্ষার্থী থাকাকালীন আমার শিক্ষা ও আচরণগত ব্যাপারে যথাযথ কর্তৃপক্ষের সিদ্ধান্তকে সর্বদা সম্মান জানাব 
          এবং সকল ফিস নির্ধারিত সময়ে পরিশোধ করব । কোনোরূপ কারণে এই অঙ্গীকার ভঙ্গ করলে বা কোনো তথ্য প্রদান করতে গিয়ে 
          আমার কোনো ভুলের জন্য বিশ্ববিদ্যালয় কর্তৃপক্ষ কর্তৃক গৃহীত যে কোনো শাস্তিমূলক ব্যবস্থা আমি মেনে নিতে বাধ্য থাকব।
        </p>

        <p className="mb-6 italic">
          (I do hereby pledge that during my stay as a student of Jashore University of Science and Technology I will abide by the rules of
          this university and the hall attached, and that I shall not get involved in any act subversive of discipline. I testify that all the
          information written by me in this form is true. I also pledge that during this period I will show due respect to the decisions of
          the appropriate authority regarding my education and behavior; and pay all the fees in due time. In case of violating this commitment
          or providing any misinformation, I oblige to accept any punitive measures taken by the authority of Jashore University of Science and Technology.)
        </p>

        <div className="text-right mb-10">
          <p>----------------------------------------------</p>
          <p>শিক্ষার্থীর স্বাক্ষর (Signature of the student)</p>
        </div>

        {/* Guardian Statement */}
        <h2 className="text-center font-bold text-xl mb-2">অভিভাবকের অঙ্গীকারনামা</h2>
        <h3 className="text-center font-semibold text-lg mb-4">(Guardian’s Commitment Statement)</h3>

        <p className="mb-4">
          আমি, ............................................................. , এই মর্মে স্বীকার করিতেছি যে, আমার পুত্র/কন্যা/ওয়ার্ড .............................................. 
          এই বিশ্ববিদ্যালয়ের শিক্ষার্থী থাকাকালীন যথা সময়মতো পরিশোধ করব এবং উচ্চ সময়ে বিশ্ববিদ্যালয় কর্তৃক গৃহীত ব্যবস্থাগুলির প্রতি সর্বাত্মক সহায়তা প্রদান করব ।
        </p>

        <p className="mb-6 italic">
          (I, ………………… , do hereby pledge that, during the stay of my son/daughter/ward …………………… as a student of this university,
          I shall pay all the fees in due time and extend all kinds of cooperation to support the measures taken by the university to maintain a congenial academic environment.)
        </p>

        <div className="flex justify-between mb-10">
          <div>
            <p>তারিখ (date): ....................................</p>
          </div>
          <div className="text-right">
            <p>----------------------------------------------</p>
            <p>অভিভাবকের স্বাক্ষর (Guardian’s signature)</p>
          </div>
        </div>

        {/* Note */}
        <h3 className="font-bold text-center mb-2">জ্ঞাতব্য বিষয়</h3>
        <p className="text-center">
          ভর্তিকৃত শিক্ষার্থীদের আচরণ বিশ্ববিদ্যালয়ের রিজেন্ট বোর্ড কর্তৃক প্রণীত “Student’s Code of Conducts” এর বিধি-বিধান দ্বারা নিয়ন্ত্রিত হবে ।
        </p>
        <p className="text-center italic">
          Nota bene: The conducts of the admitted students shall be regulated by the ‘Student’s Code of Conducts’ formulated and approved by the Regent Board of the University.
        </p>

        <p className="text-center mt-6">Page 4 of 4</p>
      </div>
    </div>
  );
}
