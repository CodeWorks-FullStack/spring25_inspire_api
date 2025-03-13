import { Schema } from "mongoose";

export const QuoteSchema = new Schema(
  {
    body: { type: String, minLength: 5, maxLength: 250, required: true },
    authorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)