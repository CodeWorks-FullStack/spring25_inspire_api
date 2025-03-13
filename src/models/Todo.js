import { Schema } from "mongoose";

export const TodoSchema = new Schema(
  {
    description: { type: String, minLength: 1, maxLength: 500, required: true },
    completed: { type: Boolean, required: true, default: false },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)