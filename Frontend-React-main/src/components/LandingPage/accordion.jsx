import React from "react";

const Accordion = ( {question, answer, index}) => {
    return (
        <div className="md:p-5">
        <button
            className="hs-accordion-toggle hs-accordion-active:text-white py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-start text-white hover:text-gray-300 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
            aria-controls={`faq-panel-${index}`}
            >
                <span>{question}</span>
                <svg
                className="hs-accordion-active:hidden block w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="m6 9 6 6 6-6" />
                </svg>
                <svg
                className="hs-accordion-active:block hidden w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                >
                <path d="m18 15-6-6-6 6" />
                </svg>
        </button>
            <div
                id={`faq-panel-${index}`}
                className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby={`faq-accordion-${index}`}
            >
                <p className="text-white">
                {answer}
                </p>
            </div>
    </div>
    );

};

export default Accordion;           