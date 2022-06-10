import { dbContext } from "../db/DbContext"




class CommentsService{
  async getAll(query = {}) {
    const comments = await dbContext.Comments.find(query)
    return comments
  }
  async create(body) {
    const comment = await dbContext.Comments.create(body)
    return comment
  }
  async remove(id) {
    const original = await dbContext.Comments.findById(id)
    await original.remove()
    return 'deleted comment'
  }

}

export const commentsService = new CommentsService()