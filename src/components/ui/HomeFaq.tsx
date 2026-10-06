import { motion } from 'framer-motion';
import { useState } from 'react';

const faqs = [
  { question: "What services does Aexozone provide?", answer: "Aexozone specializes in web & app development, Enterprise CRM & ERP Systems, Digital & Growth Marketing, and AI-Powered SaaS Architecture." },
  { question: "Where is Aexozone located?", answer: "We are based in Pune, India, but we serve clients globally including small businesses and SaaS companies." },
  { question: "What is your pricing approach?", answer: "We offer fixed-price packages with no hidden charges. You'll know exactly what you're paying for from day one." },
  { question: "How fast do you deliver the first draft?", answer: "We deliver the first draft of your project within 5 days, ensuring a fast turnaround time without compromising quality." },
  { question: "Do you offer revisions?", answer: "Yes, we provide 2 free revision rounds on every project to ensure you are completely satisfied with the final result." },
  { question: "Is SEO included in your web development?", answer: "Absolutely. All our websites are built to be SEO and AI-search-ready from day one to maximize your online visibility." },
  { question: "Do you build custom software or use templates?", answer: "We build custom software, including Enterprise CRM, ERP systems, and AI-Powered SaaS Architecture tailored specifically to your business needs." },
  { question: "How do I get started with Aexozone?", answer: "You can contact us at omkardahaleofficial@gmail.com or call us at 7030727201 to discuss your project requirements." },
];

export const HomeFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden" itemScope itemType="https://schema.org/FAQPage">
      <div className="max-w-3xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-white/10 rounded-lg overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button
                className="w-full text-left px-6 py-4 bg-white/5 hover:bg-white/10 transition-colors flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-white" itemProp="name">{faq.question}</span>
                <span className="text-white ml-4">{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-black/20" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p className="text-gray-300 text-sm" itemProp="text">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
