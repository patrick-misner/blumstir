import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



export const PostSchema = new Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  imageUrl: {type: String, required: false},
  creatorId: {type: ObjectId, ref: 'Account'},
  votes: {type: Number, default: 1}
}, {timestamps: true, toJSON: { virtuals: true } }
)