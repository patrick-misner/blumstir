import mongoose from 'mongoose'
const Schema = mongoose.Schema



export const PostSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  imageUrl: {type: String, required: false},
}, {timestamps: true, toJSON: { virtuals: true } }
)