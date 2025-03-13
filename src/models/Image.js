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

ImageSchema.virtual('author', {
  ref: 'Account',
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
  // NOTE this virtual will default to only select the name and picture
  options: {
    select: 'name picture'
  }
})