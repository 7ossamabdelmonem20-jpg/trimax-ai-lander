import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      default: null, // Optional now
    },
    name: {
      type: String,
      default: null, // Optional now
    },
    status: {
      type: String,
      enum: ["PENDING_AI", "HANDED_OVER"],
      default: "PENDING_AI",
    },
    chatHistory: [
      {
        role: { type: String, enum: ["user", "assistant"] },
        content: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    metadata: {
      lastInteraction: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
