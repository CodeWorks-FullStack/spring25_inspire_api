import { Schema } from "mongoose";

export const ImageSchema = new Schema(
  {
    image: { type: String, required: true, maxLength: 2000 },
    authorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)