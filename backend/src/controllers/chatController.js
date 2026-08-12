import ChatSession from '../models/ChatSession.js';
import ChatMessage from '../models/ChatMessage.js';
import Contact from '../models/Contact.js';
import { sendAutoReplyEmail, sendAdminNotification, sendChatbotBookingEmail } from '../services/emailService.js';

// ─── Personalized response templates ───────────────────────────────────────────

const WELCOME_MSG = `Welcome to AEXOZON! 👋

I'm your AI assistant. I can help you:
• Get a free project quote
• Learn about our services
• Book a consultation

How can I help you today?`;

const SERVICE_MSG = `Great! What type of project are you looking for?

Pick one below or type your own:`;

const BUDGET_MSG = (service) =>
  `Excellent choice! ${service} is one of our specialties. 💪

What's your estimated budget range?`;

const NAME_MSG = `Perfect! Let me get your details so our team can prepare a personalized proposal for you.

What's your full name?`;

const EMAIL_MSG = (name) =>
  `Nice to meet you, ${name}! 🤝

What's your email address? (We'll send your project details here)`;

const PHONE_MSG = `Almost done! What's your phone number?

(Include country code, e.g. +91 89994 27831)`;

const DETAILS_MSG = `Last step! Tell us briefly about your project idea.

What problem are you solving? Any specific features in mind?`;

const THANK_YOU_MSG = (name, bookingId) =>
  `🎉 Thank you, ${name}! Your booking is confirmed.

📋 Booking ID: #${bookingId}

Here's what happens next:
✅ You'll receive a confirmation email shortly
✅ Our team will review your requirements
✅ We'll schedule a free consultation within 24 hours

Feel free to ask any other questions, or reach us on WhatsApp at +91 89994 27831!`;

// ─── Quick reply options ───────────────────────────────────────────────────────

const SERVICE_OPTIONS = ['Website Development', 'Mobile App', 'SaaS Platform', 'College Project', 'Other'];
const BUDGET_OPTIONS = ['₹5K - ₹15K', '₹15K - ₹50K', '₹50K - ₹1L+', 'Not Sure Yet'];
const INITIAL_OPTIONS = ['Get a Free Quote', 'Our Services', 'Talk to Us'];

// ─── Intent detection for free chat ────────────────────────────────────────────

const detectIntent = (msg) => {
  const m = msg.toLowerCase().trim();

  if (m.match(/^(hi|hello|hey|greetings|good\s*(morning|evening|afternoon)|namaste)/))
    return 'greeting';

  if (m.match(/(quote|estimate|price|cost|budget|how much|fee|rate|pricing)/))
    return 'start_booking';

  if (m.match(/(get a free quote|book|booking|consultation|free quote)/))
    return 'start_booking';

  if (m.match(/(website|web app|web dev|site for my business|e-commerce|portfolio|landing page|frontend|backend)/))
    return 'web_dev';

  if (m.match(/(mobile app|android|ios|react native|flutter|app for my business)/))
    return 'mobile_app';

  if (m.match(/(saas|software as a service|cloud platform|subscription|dashboard)/))
    return 'saas';

  if (m.match(/(service|what do you do|what can you do|offer|capabilities|our services)/))
    return 'services';

  if (m.match(/(project|academic|student|college|final year|assignment|thesis)/))
    return 'college_project';

  if (m.match(/(contact|email|phone|reach|hire|talk|number|call|whatsapp|talk to us)/))
    return 'contact';

  if (m.match(/(tech|stack|language|framework|react|node|mongo|express|python|java)/))
    return 'tech_stack';

  if (m.match(/(about|who are you|company|aexozon|team)/))
    return 'about';

  if (m.match(/(thanks|thank you|ok|okay|bye|goodbye|great|awesome|perfect)/))
    return 'gratitude';

  return 'unknown';
};

const FREE_CHAT_RESPONSES = {
  greeting: {
    content: WELCOME_MSG,
    quickReplies: INITIAL_OPTIONS,
  },
  start_booking: {
    content: `Let's get started with your project! First, what type of service are you looking for?`,
    quickReplies: SERVICE_OPTIONS,
    nextState: 'service_selection',
  },
  web_dev: {
    content: `We build high-performance, scalable web applications — from sleek landing pages to complex enterprise portals. Our stack includes React, Node.js, Express, and MongoDB.\n\nWant us to prepare a free quote for your website project?`,
    quickReplies: ['Yes, Get a Quote', 'Tell Me More', 'Our Services'],
  },
  mobile_app: {
    content: `We develop cross-platform mobile apps for Android & iOS using React Native and Flutter. From UI/UX design to App Store deployment — we handle everything.\n\nReady to discuss your app idea?`,
    quickReplies: ['Yes, Get a Quote', 'Tell Me More', 'Our Services'],
  },
  saas: {
    content: `We architect scalable SaaS platforms with subscription billing, multi-tenant databases, and real-time dashboards. Perfect for startups and enterprises.\n\nWant to get a custom estimate?`,
    quickReplies: ['Yes, Get a Quote', 'Tell Me More', 'Our Services'],
  },
  services: {
    content: `At AEXOZON, we specialize in:\n\n🌐 Enterprise Web Solutions (React, Node.js)\n📱 Mobile App Development (React Native/Flutter)\n☁️ SaaS & Cloud Platforms\n🎓 Academic Project Guidance\n\nWhich one interests you? Or get a free quote right away!`,
    quickReplies: [...SERVICE_OPTIONS, 'Get a Free Quote'],
  },
  college_project: {
    content: `We offer comprehensive final-year project guidance! We help with robust implementation, detailed documentation, and technical walkthroughs to ensure top grades.\n\nWant to discuss your project topic?`,
    quickReplies: ['Yes, Get a Quote', 'Our Services'],
  },
  contact: {
    content: `You can reach us anytime:\n\n📞 Phone / WhatsApp: +91 89994 27831\n📧 Email: skhandagle1233@gmail.com\n\nOr I can collect your details and have our team reach out to you!`,
    quickReplies: ['Book a Consultation', 'Our Services'],
  },
  tech_stack: {
    content: `We use a modern, battle-tested stack:\n\n⚛️ Frontend: React.js, Next.js, Tailwind CSS\n🟢 Backend: Node.js, Express, Spring Boot\n🍃 Database: MongoDB, MySQL\n📱 Mobile: React Native, Flutter\n☁️ Cloud: AWS, Vercel, Railway\n\nWe pick the best tools for YOUR project needs.`,
    quickReplies: ['Get a Free Quote', 'Our Services'],
  },
  about: {
    content: `AEXOZON is a forward-thinking digital engineering firm that transforms innovative ideas into robust, scalable solutions.\n\nWe specialize in web development, mobile apps, SaaS platforms, and academic projects — at student-friendly and startup-friendly prices.\n\nReady to start your project?`,
    quickReplies: ['Get a Free Quote', 'Our Services', 'Contact Us'],
  },
  gratitude: {
    content: `You're welcome! 😊 Feel free to reach out anytime.\n\nWhatsApp: +91 89994 27831\nEmail: skhandagle1233@gmail.com\n\nHave a great day!`,
    quickReplies: ['Get a Free Quote', 'Our Services'],
  },
  unknown: {
    content: `That's an interesting question! For the best answer, I'd love to connect you with our team.\n\nWould you like to book a free consultation, or is there something specific I can help with?`,
    quickReplies: ['Book a Consultation', 'Our Services', 'Contact Us'],
  },
};

// ─── Validation helpers ────────────────────────────────────────────────────────

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^[+]?[\d\s\-()]{7,15}$/.test(phone.replace(/\s/g, ''));

// ─── State machine handler ─────────────────────────────────────────────────────

const processStateMachine = async (session, userMessage) => {
  const state = session.conversationState;
  const msg = userMessage.trim();

  switch (state) {
    case 'greeting': {
      // Check for quick reply matches
      const lowerMsg = msg.toLowerCase();
      if (lowerMsg.includes('quote') || lowerMsg.includes('book') || lowerMsg.includes('consultation')) {
        session.conversationState = 'service_selection';
        return { content: SERVICE_MSG, quickReplies: SERVICE_OPTIONS, nextState: 'service_selection' };
      }
      if (lowerMsg.includes('services') || lowerMsg.includes('our services')) {
        return FREE_CHAT_RESPONSES.services;
      }
      if (lowerMsg.includes('talk') || lowerMsg.includes('contact')) {
        return FREE_CHAT_RESPONSES.contact;
      }
      // Free chat: detect intent
      const intent = detectIntent(msg);
      const response = FREE_CHAT_RESPONSES[intent] || FREE_CHAT_RESPONSES.unknown;
      if (response.nextState) {
        session.conversationState = response.nextState;
      }
      return response;
    }

    case 'service_selection': {
      // Map user input to a service
      const lowerMsg = msg.toLowerCase();
      let service = msg;
      if (lowerMsg.includes('website') || lowerMsg.includes('web')) service = 'Website Development';
      else if (lowerMsg.includes('mobile') || lowerMsg.includes('app')) service = 'Mobile App Development';
      else if (lowerMsg.includes('saas') || lowerMsg.includes('cloud') || lowerMsg.includes('platform')) service = 'SaaS Platform';
      else if (lowerMsg.includes('college') || lowerMsg.includes('academic') || lowerMsg.includes('project')) service = 'College Project';
      else if (lowerMsg.includes('other')) service = 'Other';

      session.bookingData.service = service;
      session.conversationState = 'budget_range';
      return { content: BUDGET_MSG(service), quickReplies: BUDGET_OPTIONS, nextState: 'budget_range' };
    }

    case 'budget_range': {
      session.bookingData.budget = msg;
      session.conversationState = 'collect_name';
      return { content: NAME_MSG, quickReplies: [], nextState: 'collect_name' };
    }

    case 'collect_name': {
      if (msg.length < 2) {
        return { content: 'Please enter a valid name (at least 2 characters).', quickReplies: [], nextState: 'collect_name' };
      }
      session.bookingData.name = msg;
      session.conversationState = 'collect_email';
      return { content: EMAIL_MSG(msg), quickReplies: [], nextState: 'collect_email' };
    }

    case 'collect_email': {
      if (!isValidEmail(msg)) {
        return { content: 'That doesn\'t look like a valid email. Please try again (e.g. john@example.com)', quickReplies: [], nextState: 'collect_email' };
      }
      session.bookingData.email = msg.toLowerCase();
      session.conversationState = 'collect_phone';
      return { content: PHONE_MSG, quickReplies: [], nextState: 'collect_phone' };
    }

    case 'collect_phone': {
      if (!isValidPhone(msg)) {
        return { content: 'Please enter a valid phone number (e.g. +91 89994 27831)', quickReplies: [], nextState: 'collect_phone' };
      }
      session.bookingData.phone = msg;
      session.conversationState = 'collect_details';
      return { content: DETAILS_MSG, quickReplies: [], nextState: 'collect_details' };
    }

    case 'collect_details': {
      if (msg.length < 5) {
        return { content: 'Please provide a bit more detail about your project (at least a sentence).', quickReplies: [], nextState: 'collect_details' };
      }
      session.bookingData.details = msg;
      session.conversationState = 'thank_you';
      session.isBookingComplete = true;

      // Create Contact (Lead) in the CRM
      try {
        const contact = new Contact({
          name: session.bookingData.name,
          email: session.bookingData.email,
          phone: session.bookingData.phone,
          service: session.bookingData.service,
          message: `[Budget: ${session.bookingData.budget}] ${session.bookingData.details}`,
          source: 'Chatbot',
          status: 'New',
        });
        await contact.save();
        session.contactId = contact._id;

        // Send emails asynchronously (don't block response)
        const { name, email, phone, service, budget, details } = session.bookingData;
        sendChatbotBookingEmail(email, name, service, budget, details, contact._id.toString().slice(-6).toUpperCase());
        sendAdminNotification(name, email, phone, service, `[Chatbot Booking]\n[Budget: ${budget}]\n\n${details}`);

        const bookingId = contact._id.toString().slice(-6).toUpperCase();
        return {
          content: THANK_YOU_MSG(session.bookingData.name, bookingId),
          quickReplies: ['Ask Another Question'],
          nextState: 'thank_you',
          bookingId,
        };
      } catch (err) {
        console.error('Failed to create chatbot lead:', err);
        return {
          content: `Thank you, ${session.bookingData.name}! We've received your details. Our team will reach out within 24 hours.\n\nYou can also reach us at +91 89994 27831.`,
          quickReplies: ['Ask Another Question'],
          nextState: 'thank_you',
        };
      }
    }

    case 'thank_you':
    case 'free_chat': {
      // After booking or in free chat, handle general queries
      const lowerMsg = msg.toLowerCase();
      if (lowerMsg.includes('quote') || lowerMsg.includes('book') || lowerMsg.includes('another project')) {
        // Reset for a new booking
        session.conversationState = 'service_selection';
        session.bookingData = { name: '', email: '', phone: '', service: '', budget: '', details: '' };
        session.isBookingComplete = false;
        return { content: `Let's start a new project! What type of service do you need?`, quickReplies: SERVICE_OPTIONS, nextState: 'service_selection' };
      }
      const intent = detectIntent(msg);
      if (intent === 'start_booking') {
        session.conversationState = 'service_selection';
        session.bookingData = { name: '', email: '', phone: '', service: '', budget: '', details: '' };
        session.isBookingComplete = false;
        return { content: SERVICE_MSG, quickReplies: SERVICE_OPTIONS, nextState: 'service_selection' };
      }
      const response = FREE_CHAT_RESPONSES[intent] || FREE_CHAT_RESPONSES.unknown;
      session.conversationState = 'free_chat';
      return { ...response, nextState: 'free_chat' };
    }

    default: {
      session.conversationState = 'greeting';
      return { content: WELCOME_MSG, quickReplies: INITIAL_OPTIONS, nextState: 'greeting' };
    }
  }
};

// ─── API Handlers ──────────────────────────────────────────────────────────────

export const sendMessage = async (req, res) => {
  try {
    const { visitorId, message } = req.body;

    if (!visitorId || !message) {
      return res.status(400).json({ success: false, message: 'visitorId and message are required' });
    }

    // Find or create session
    let session = await ChatSession.findOne({ visitorId });
    if (!session) {
      session = new ChatSession({ visitorId });
    }
    session.lastMessageAt = Date.now();

    // Save user message
    const userMsg = new ChatMessage({
      sessionId: session._id,
      role: 'user',
      content: message,
    });

    // Process through state machine
    const response = await processStateMachine(session, message);
    await session.save();
    await userMsg.save();

    // Save bot response
    const botMsg = new ChatMessage({
      sessionId: session._id,
      role: 'bot',
      content: response.content,
    });
    await botMsg.save();

    res.status(200).json({
      success: true,
      data: {
        userMessage: userMsg,
        botResponse: {
          content: response.content,
          quickReplies: response.quickReplies || [],
        },
        nextState: response.nextState || session.conversationState,
        bookingId: response.bookingId || null,
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, message: 'Server error while processing chat' });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const session = await ChatSession.findOne({ visitorId });

    if (!session) {
      return res.status(200).json({
        success: true,
        data: [],
        conversationState: 'greeting',
        bookingData: {},
      });
    }

    const messages = await ChatMessage.find({ sessionId: session._id }).sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      data: messages,
      conversationState: session.conversationState,
      bookingData: session.bookingData,
      isBookingComplete: session.isBookingComplete,
    });
  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const resetSession = async (req, res) => {
  try {
    const { visitorId } = req.body;
    if (!visitorId) {
      return res.status(400).json({ success: false, message: 'visitorId is required' });
    }

    const session = await ChatSession.findOne({ visitorId });
    if (session) {
      session.conversationState = 'greeting';
      session.bookingData = { name: '', email: '', phone: '', service: '', budget: '', details: '' };
      session.isBookingComplete = false;
      await session.save();

      // Delete old messages
      await ChatMessage.deleteMany({ sessionId: session._id });
    }

    res.status(200).json({ success: true, message: 'Session reset' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admin routes
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await ChatSession.find().sort({ lastMessageAt: -1 });
    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getSessionMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find({ sessionId: req.params.sessionId }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
