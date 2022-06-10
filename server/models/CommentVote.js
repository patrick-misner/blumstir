import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



export const CommentVoteSchema = new Schema({
  creatorId: {type: ObjectId, ref: 'Account'},
  commentId: {type: String, required: true},
  vote: {type: Boolean, required: true}
})