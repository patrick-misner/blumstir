import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { CommentSchema } from "../models/Comment";
import { CommentVoteSchema } from "../models/CommentVote";
import { PostSchema } from "../models/Post";
import { PostVoteSchema } from "../models/postVote";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema);
  Comments = mongoose.model('Comment', CommentSchema);
  PostVotes = mongoose.model('PostVote', PostVoteSchema)
  CommentVotes = mongoose.model('CommentVote', CommentVoteSchema)
}

export const dbContext = new DbContext()
