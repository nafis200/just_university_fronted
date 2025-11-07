import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function AdmissionFAQ() {
  return (
    <div className="mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-2">
        University Admission FAQ / বিশ্ববিদ্যালয় ভর্তি FAQ
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Here are some common questions and answers regarding university admission. / এখানে বিশ্ববিদ্যালয় ভর্তির কিছু সাধারণ প্রশ্ন এবং উত্তর দেওয়া হলো।
      </p>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            1. Can I get a refund after admission? / ভর্তি হওয়ার পর কি টাকা ফেরত পাওয়া যাবে?
          </AccordionTrigger>
          <AccordionContent>
            No. / না, টাকা ফেরত পাওয়া যাবে না।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            2. If I cancel my admission, what should I do? / যদি আমি আমার ভর্তি বাতিল করি, আমি কী করব?
          </AccordionTrigger>
          <AccordionContent>
            Please come to the Dean&rsquo;s office and cancel your admission. / অনুগ্রহ করে ডিনের অফিসে যান এবং আপনার ভর্তি বাতিল করুন।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            3. If I face any problem, what should I do? / যদি আমি কোনো সমস্যা সম্মুখীন হই, আমি কী করব?
          </AccordionTrigger>
          <AccordionContent>
            Just go to the Contact page, all the contact information is there. / শুধু যোগাযোগ পৃষ্ঠায় যান, সব যোগাযোগের তথ্য সেখানে আছে।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            4. When does the admission process start? / ভর্তি প্রক্রিয়া কখন শুরু হয়?
          </AccordionTrigger>
          <AccordionContent>
            The admission process starts every year after the admission exam. / ভর্তি পরীক্ষা শেষ হওয়ার পরে ভর্তি প্রক্রিয়া শুরু হয়।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            5. What documents are required for admission? / ভর্তি হওয়ার জন্য কোন কোন কাগজপত্র দরকার?
          </AccordionTrigger>
          <AccordionContent>
            You need to submit your marksheet, passport photo, and ID proof. / আপনাকে আপনার মার্কশিট, পাসপোর্ট সাইজ ছবি এবং পরিচয়পত্র জমা দিতে হবে।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            6. Can I change my course after admission? / ভর্তি হওয়ার পর কি আমি কোর্স পরিবর্তন করতে পারব?
          </AccordionTrigger>
          <AccordionContent>
            Yes, you can request course change within the first month. / হ্যাঁ, আপনি প্রথম মাসের মধ্যে কোর্স পরিবর্তনের জন্য অনুরোধ করতে পারবেন।
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>
            7. How can I contact the university for more information? / আরও তথ্যের জন্য বিশ্ববিদ্যালয়ের সাথে কিভাবে যোগাযোগ করব?
          </AccordionTrigger>
          <AccordionContent>
            You can call the university helpline or use the contact form on the website. / আপনি বিশ্ববিদ্যালয়ের হেল্পলাইন কল করতে পারেন অথবা ওয়েবসাইটের যোগাযোগ ফর্ম ব্যবহার করতে পারেন।
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
