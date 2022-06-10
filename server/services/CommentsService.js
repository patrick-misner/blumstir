import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"




class CommentsService{
  
  
  async getAll(query = {}) {
    const comments = await dbContext.Comments.find(query)
    return comments
  }

  async getComment(id) {
    const foundComment = await dbContext.Comments.findById(id)
    if(!foundComment){
      throw new BadRequest('id not found')
    }
    return foundComment
  }
  async create(body) {
    const newComment = await dbContext.Comments.create(body)
    return newComment
  }

  async update(updated) {
    const original = await this.getComment(updated.id)
    if(original.creatorId.toString() != updated.creatorId){
      throw new BadRequest("You cannot update a comment you didn't create")
    }

    original.body = updated.body || original.body

    await original.save()

    return original
  }
  async remove(id, userId) {
    const original = await this.getComment(id)
    if (original.creatorId.toString() != userId){
      throw new Forbidden('thats not your comment to delete')
    }
    await original.remove()
  }

}

export const commentsService = new CommentsService()