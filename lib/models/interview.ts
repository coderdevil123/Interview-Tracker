import mongoose from "mongoose"

const interviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  position: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  type: {
    type: String,
    required: true,
    enum: ["phone", "video", "onsite"],
  },
  status: {
    type: String,
    required: true,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  contactPerson: {
    type: String,
    trim: true,
    maxlength: 100,
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true,
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Create indexes for better query performance
interviewSchema.index({ company: 1 })
interviewSchema.index({ date: 1 })
interviewSchema.index({ status: 1 })
interviewSchema.index({ type: 1 })
interviewSchema.index({ createdAt: -1 })

export const Interview = mongoose.models.Interview || mongoose.model("Interview", interviewSchema)
