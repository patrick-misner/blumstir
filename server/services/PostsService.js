import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"
import { logger } from "../utils/Logger"




class PostsService{
  
  
  async getAll(query = {}) {
    const posts = await dbContext.Posts.find(query)
    return posts
  }

  async getPost(id) {
    const foundPost = await dbContext.Posts.findById(id)
    if(!foundPost){
      throw new BadRequest('id not found')
    }
    return foundPost
  }
  async create(body) {
    const newPost = await dbContext.Posts.create(body)
    return newPost
  }

  async update(updated) {
    const original= await this.getPost(updated.id)
    if(original.creatorId.toString() != updated.creatorId){
      throw new BadRequest("You cannot update a post you didn't create")
    }
    
    original.title = updated.title || original.title
    original.body = updated.body || original.body
    original.imageUrl = updated.imageUrl || original.imageUrl
    original.votes = updated.votes || original.votes

    await original.save()

    return original
  }
  async remove(id, userId) {
    const original = await this.getPost(id)
    if (original.creatorId.toString() != userId){
      throw new Forbidden('thats not your post to delete')
    }
    await original.remove()
  }

}

export const postsService = new PostsService()