import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";


class CommentVotesService{
  async getAll(query = {}) {
    const commentvote = await dbContext.CommentVotes.find(query)
    return commentvote
  }
  
  async getCommentVote(id) {
    const commentvote = await dbContext.CommentVotes.findById(id)
    return commentvote
  }
 async  create(body) {
    const commentvote = await dbContext.CommentVotes.create(body)
    return commentvote
  }
 async update(updated) {
    const original = await this.getCommentVote(updated.id)
    if (original.creatorId.toString() != updated.creatorId){
      throw new BadRequest('you cannot edit a comment vote thats not yours')
    }
      original.vote = updated.vote || original.vote
      await original.save()
      return original
  }
  async remove(id, userId) {
    const original = await this.getCommentVote(id)
    if (original.creatorId.toString() != userId){
      throw new Forbidden('thats not your comment to delete')
    }
    await original.remove()
  }
  
}

export const commentVotesService = new CommentVotesService()