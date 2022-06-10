import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId



export const PostVoteSchema = new Schema({
  creatorId: {type: ObjectId, ref: 'Account'},
  postId: {type: String, required: true},
  vote: {type: Boolean, required: true}
})