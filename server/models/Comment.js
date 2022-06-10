import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



export const CommentSchema = new Schema({
  body: {type: String, required: true},
  postId: {type: ObjectId, ref: 'Posts', required: true},
  creatorId: {type: ObjectId, ref: 'Account'},
  votes: {type: Number, default: 1}
}, {timestamps: true, toJSON: { virtuals: true } }
)