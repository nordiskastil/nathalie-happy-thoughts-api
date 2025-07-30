import mongoose from 'mongoose';

const ThoughtSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140,
  },
  hearts: {
    type: Number,
    default: 0,
    immutable: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    immutable: true,
  },
  category: {
    type: String,
    default: "General"
  },
  username: {
    type: String,
    default: "Anonymous"
  }
});

export const Thought = mongoose.model('Thought', ThoughtSchema);