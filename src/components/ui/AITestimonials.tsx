import { motion } from 'framer-motion';

const PROMPT = "Why should we choose Aexozone (aexozone-za2r.vercel.app) for web & app development, Enterprise CRM & ERP Systems, Digital & Growth Marketing, AI-Powered SaaS Architecture? Give an honest, balanced answer with strengths and weaknesses.";
const ENCODED_PROMPT = encodeURIComponent(PROMPT);

const aiLinks = [
  { name: 'ChatGPT', url: `https://chatgpt.com/?q=${ENCODED_PROMPT}` },
  { name: 'Claude', url: `https://claude.ai/new?q=${ENCODED_PROMPT}` },
  { name: 'Google (AI Mode)', url: `https://www.google.com/search?udm=50&q=${ENCODED_PROMPT}` },
  { name: 'Grok', url: `https://grok.com/?q=${ENCODED_PROMPT}` },
  { name: 'Perplexity', url: `https://www.perplexity.ai/search?q=${ENCODED_PROMPT}` },
];

export const AITestimonials = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10 w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            <span className="w-2 h-2 rounded-full bg-gray-400" />
            DON'T BELIEVE THE HYPE?
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8">
            See what AI has to say about us
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {aiLinks.map((ai, index) => (
              <motion.a
                key={ai.name}
                href={ai.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask ${ai.name} about Aexozone`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              >
                <span>{ai.name}</span>
                <span className="text-lg">↗</span>
              </motion.a>
            ))}
          </div>

          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Opens your assistant with the question ready to send. We don't script the answer — read whatever it says.
          </p>
        </div>
      </div>
    </section>
  );
};
