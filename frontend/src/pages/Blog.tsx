import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, TrendingUp, Cpu, Workflow, Lightbulb, Search, ChevronDown, HelpCircle } from 'lucide-react';
import { TiltCard } from '../components/ui/TiltCard';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

const blogs = [
  {
    id: 1,
    title: 'Leveraging AI Automation for Small Businesses',
    category: 'AI Algorithm for Business',
    icon: Cpu,
    readTime: '6 min read',
    description: 'I recently sat down with a local founder who was drowning in overhead. We pivoted their entire model to use AI automation for small businesses, completely changing their trajectory.',
    snippet: 'When we first mapped out their growth strategy using Scalenut and Surfer SEO, it clicked: small teams do not need more hours in the day, they need algorithms that do the heavy lifting for them.'
  },
  {
    id: 2,
    title: 'The Reality of True Business Automation',
    category: 'Business Automation',
    icon: Workflow,
    readTime: '8 min read',
    description: 'A lot of founders think automation just means connecting a few apps together. True business architecture requires integrating CRMs, ERPs, and cloud microservices into a living, breathing ecosystem.',
    snippet: 'We design these sprawling systems the same way we build semantic clusters with MarketMuse and Frase—every single piece has to talk to the rest organically, or the whole thing collapses under its own weight.'
  },
  {
    id: 3,
    title: 'Bootstrapping to Series A: Idea to Execution',
    category: 'Startup Strategies',
    icon: TrendingUp,
    readTime: '7 min read',
    description: 'Taking a startup from a napkin sketch to Series A is not about working 100-hour weeks anymore. In this modern AI era, the only thing that matters is closing the gap between your idea and flawless execution.',
    snippet: 'The founders winning today are the ones who aggressively leverage AI tools to outmaneuver legacy giants without burning through their cash runway. It is pure David vs. Goliath.'
  },
  {
    id: 4,
    title: 'Bio-Mimetic Self-Healing Cloud Topologies',
    category: 'Advanced Cloud Architecture',
    icon: Lightbulb,
    readTime: '10 min read',
    description: 'What if a server cluster could heal a broken node the same way the human body heals a cut? By modeling cloud infrastructures after human neural plasticity, we can virtually eliminate downtime.',
    snippet: 'I actually had this breakthrough while structuring some research docs in Clearscope and NeuronWriter. Just like semantic concepts self-organize to fill gaps, server traffic can autonomously re-route to survive catastrophic failures.'
  },
  {
    id: 5,
    title: 'Temporal Data Sharding for the Post-Quantum Era',
    category: 'Cybersecurity & Data',
    icon: Search,
    readTime: '12 min read',
    description: 'Everyone keeps asking what happens to enterprise databases when quantum decryption becomes mainstream. The answer is fourth-dimensional data fragmentation.',
    snippet: 'It sounds like pure sci-fi, but when you map out content chronologically using platforms like WriterZen and Outranking, the logic is identical. We have to fragment data clusters across time axes to outsmart future algorithms.'
  }
];

const faqs = [
  {
    question: "What is AI automation and how does it help small businesses?",
    answer: "AI automation uses artificial intelligence to perform repetitive tasks without human intervention. For small businesses, this means handling customer service routing, predictive inventory, and automated marketing workflows, saving thousands of hours and reducing operational overhead."
  },
  {
    question: "How much does it typically cost to build a custom SaaS platform?",
    answer: "SaaS platform costs vary wildly based on complexity. A basic MVP can range from $15,000 to $30,000, while enterprise-grade architectures with microservices and deep AI integrations can easily exceed $100,000. It's an investment into scalable IP."
  },
  {
    question: "What is the key difference between CRM and ERP systems?",
    answer: "A CRM (Customer Relationship Management) system focuses on the front-end of the business: sales, marketing, and customer interactions. An ERP (Enterprise Resource Planning) system manages the back-end operations: accounting, supply chain, HR, and manufacturing."
  },
  {
    question: "How do I start integrating AI into my existing business operations?",
    answer: "Start small. Identify the most time-consuming bottleneck in your workflow. Often, it's data entry, customer support, or lead qualification. Integrate a targeted AI API (like an LLM for support) into that specific flow before attempting a massive systemic overhaul."
  },
  {
    question: "Which cloud infrastructure is best for startups: AWS, Azure, or GCP?",
    answer: "AWS offers the most mature ecosystem and vast startup credits. Azure is excellent if you're deeply entrenched in the Microsoft ecosystem or building B2B enterprise tools. GCP is highly favored for heavy machine learning workloads and data analytics."
  },
  {
    question: "How long does it take to develop a cross-platform mobile app?",
    answer: "Using frameworks like React Native or Flutter, a robust cross-platform MVP typically takes 3 to 5 months from design to app store deployment, effectively cutting development time in half compared to building native iOS and Android separately."
  },
  {
    question: "What is the role of DevOps in modern software engineering?",
    answer: "DevOps merges development and operations to automate the delivery pipeline. It ensures that code is continuously tested, integrated, and deployed (CI/CD) with zero downtime, massively improving product stability and release speed."
  },
  {
    question: "How can machine learning improve predictive analytics for my company?",
    answer: "Machine learning models analyze historical data to identify hidden patterns humans miss. This allows companies to accurately forecast demand, optimize pricing dynamically, and predict customer churn before it happens."
  },
  {
    question: "Is it better to bootstrap a tech startup or seek Series A funding early?",
    answer: "Bootstrapping forces lean, profitable business models and lets you retain equity. However, if your market is a 'winner-takes-all' environment that requires massive initial capital for user acquisition or heavy R&D, seeking venture capital early is often necessary."
  },
  {
    question: "What are the security benefits of migrating to a cloud microservices architecture?",
    answer: "Microservices isolate applications into distinct, independent services. If one service is compromised or fails, the rest of the application remains secure and functional. It also allows for highly granular access controls and isolated database access."
  }
];

const FAQItem = ({ question, answer, index }: { question: string, answer: string, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      className="mb-4"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white/5 backdrop-blur-md border border-premium-platinum/10 hover:border-premium-platinum/30 rounded-2xl transition-all duration-300 text-left"
      >
        <span className="text-white font-medium text-lg pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-premium-platinum transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-2 text-gray-300 text-sm leading-relaxed border-l-2 border-premium-platinum/30 ml-4 mt-2">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Blog = () => {
  return (
    <div className="min-h-screen bg-premium-black pt-28 pb-20 relative overflow-hidden font-sans">
      
      {/* Background Elements */}
      <div className="glow-orb glow-orb-purple w-[600px] h-[600px] -top-20 -right-20 opacity-30" />
      <div className="glow-orb glow-orb-blue w-[500px] h-[500px] bottom-10 -left-20 opacity-20" />

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          variants={fadeUp} 
          initial="hidden" 
          animate="visible" 
          custom={0} 
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6 backdrop-blur-md">
            <BookOpen className="w-4 h-4" /> Aexozon Insights
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Explore the <span className="gradient-text">Latest Thinking</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Dive into real human-created technology articles covering everything from AI algorithms and business automation to groundbreaking startup strategies and theoretical tech concepts.
          </p>

          {/* SEO Pipeline — hidden structured data for search engines only */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": "Aexozon Content Optimization Pipeline",
                "description": "Our end-to-end SEO content optimization workflow for ranking blog articles.",
                "step": [
                  { "@type": "HowToStep", "name": "Keyword Research", "text": "Identify high-value target keywords using competitive analysis tools." },
                  { "@type": "HowToStep", "name": "Search Intent Analysis", "text": "Map each keyword to the correct user search intent." },
                  { "@type": "HowToStep", "name": "Topic Clustering", "text": "Group related keywords into semantic topic clusters." },
                  { "@type": "HowToStep", "name": "Blog Creation", "text": "Write in-depth, human-created content optimized for the target cluster." },
                  { "@type": "HowToStep", "name": "On-Page SEO", "text": "Optimize meta tags, headings, images, and keyword density." },
                  { "@type": "HowToStep", "name": "Internal Linking", "text": "Build contextual internal links across related articles." },
                  { "@type": "HowToStep", "name": "Google Indexing", "text": "Submit to Google Search Console for fast indexing." },
                  { "@type": "HowToStep", "name": "Ranking & Monitoring", "text": "Track keyword rankings and SERP positions." },
                  { "@type": "HowToStep", "name": "Analytics & Iteration", "text": "Analyze traffic data and discover new keyword opportunities." }
                ]
              })
            }}
          />
        </motion.div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {blogs.map((blog, index) => {
            const Icon = blog.icon;
            // Make the first blog take up more space if we want a featured look, or keep it standard grid.
            const isFeatured = index === 0;

            return (
              <motion.div
                key={blog.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index + 1}
                className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <TiltCard className="h-full">
                  <div className="bento-card p-6 md:p-8 h-full flex flex-col justify-between bg-white/5 backdrop-blur-xl border border-premium-platinum/20 hover:border-premium-platinum/50 transition-all duration-300">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-premium-platinum text-xs font-bold uppercase tracking-wider bg-premium-platinum/10 px-3 py-1.5 rounded-full">
                          {blog.category}
                        </span>
                        <span className="text-gray-400 text-xs font-medium">{blog.readTime}</span>
                      </div>
                      
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-premium-silver/20 to-premium-platinum/20 border border-premium-platinum/10 flex items-center justify-center mb-5">
                        <Icon className="w-6 h-6 text-premium-platinum" />
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 hover:text-premium-platinum transition-colors cursor-pointer">
                        {blog.title}
                      </h2>
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {blog.description}
                      </p>
                    </div>

                    <div className="mt-auto p-4 rounded-xl bg-black/40 border border-white/5">
                      <p className="text-gray-400 text-xs italic leading-relaxed">
                        "{blog.snippet}"
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* FAQs Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-4 backdrop-blur-md">
              <HelpCircle className="w-4 h-4" /> Top Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Trending <span className="gradient-text">FAQs</span>
            </h2>
            <p className="text-gray-400 mt-4">
              The most commonly searched questions regarding enterprise technology, startups, and AI automation.
            </p>
          </motion.div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} index={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Blog;
