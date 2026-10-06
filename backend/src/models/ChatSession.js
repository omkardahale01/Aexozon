import mongoose from 'mongoose';

const chatSessionSchema = new mongoose.Schema({
  visitorId: {
    type: String,
    required: true,
  },
  conversationState: {
    type: String,
    enum: ['greeting', 'service_selection', 'budget_range', 'collect_name', 'collect_email', 'collect_phone', 'collect_details', 'thank_you', 'free_chat'],
    default: 'greeting',
  },
  bookingData: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    service: { type: String, default: '' },
    budget: { type: String, default: '' },
    details: { type: String, default: '' },
  },
  isBookingComplete: {
    type: Boolean,
    default: false,
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    default: null,
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const ChatSession = mongoose.model('ChatSession', chatSessionSchema);
export default ChatSession;
