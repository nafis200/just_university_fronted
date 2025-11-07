import React from "react";
import { Phone, Mail } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          Contact Us / আমাদের সাথে যোগাযোগ করুন
        </h1>

        <p className="text-center text-gray-600 mb-10 text-base">
          If you are facing any problem, please contact us using the number or email below. <br />
          যদি আপনি কোনো সমস্যা সম্মুখীন হন, দয়া করে নিচের নম্বর বা ইমেইল ব্যবহার করে যোগাযোগ করুন।
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-8">
          <div className="flex flex-col items-center bg-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <Phone className="text-blue-500 mb-3" size={36} />
            <h2 className="text-2xl font-semibold mb-2">Phone / ফোন</h2>
            <p className="text-gray-800 text-lg">+880 1999 647103</p>
          </div>

          <div className="flex flex-col items-center bg-green-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition duration-300">
            <Mail className="text-green-500 mb-3" size={36} />
            <h2 className="text-2xl font-semibold mb-2">Email / ইমেইল</h2>
            <p className="text-gray-800 text-lg">info@university.com</p>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-10 text-sm">
          We are always here to help you. / আমরা সবসময় আপনাকে সাহায্য করার জন্য আছি।
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
