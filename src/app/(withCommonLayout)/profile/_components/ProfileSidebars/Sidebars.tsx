/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, Sparkles, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import "./Sidebars.css";

export const Sidebars = ({ currentStep, completedSteps }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const steps = [
    "Personal Information",
    "Applicant Address",
    "Educational Information",
    "Guardian Information",
    "Others InfoForm",
    "Pdf Download",
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const stepElements = container.children;
      const currentElement = stepElements[currentStep] as HTMLElement;
      if (currentElement) {
        currentElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentStep]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed top-4 left-4 z-50 p-3 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-slate-800 transition-all duration-300 hover:scale-105"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      <div
        className={`xl:hidden fixed inset-0 bg-black/50 z-30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          w-80 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 
          p-8 flex flex-col mt-16
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"}
          shadow-2xl xl:shadow-none
        `}
      >
        <div className="flex flex-col h-full">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">FormFlow</h1>
            </div>
            <p className="text-slate-400 text-sm">
              Complete your registration journey
            </p>
          </div>
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto pr-2 space-y-8 hide-scrollbar"
          >
            {steps.map((label, index) => {
              const isCompleted = completedSteps.includes(index);
              const isActive = currentStep === index;

              return (
                <div key={index} className="relative">
                  <div className="flex items-center gap-4">
                    <div
                      className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-500 ${
                        isCompleted
                          ? "bg-linear-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-500/50"
                          : isActive
                          ? "bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/50 scale-110"
                          : "bg-slate-700/50 border-2 border-slate-600"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="text-white w-6 h-6" />
                      ) : (
                        <span
                          className={`font-bold ${
                            isActive ? "text-white" : "text-slate-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`font-semibold transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : isCompleted
                            ? "text-green-400"
                            : "text-slate-500"
                        }`}
                      >
                        {label}
                      </h3>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`absolute left-6 top-14 w-0.5 h-8 transition-all duration-500 ${
                        isCompleted
                          ? "bg-linear-to-b from-green-400 to-emerald-500"
                          : "bg-slate-700"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
            <p className="text-xs text-slate-400 leading-relaxed">
              Your information is secure and encrypted. We respect your privacy.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
