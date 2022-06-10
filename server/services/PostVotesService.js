import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext";


class PostVotesService{
  async getAll(query = {}) {
    const postvotes = await dbContext.PostVotes.find(query)
    return postvotes
  }
  
  async getPostVote(id) {
    const postvote = await dbContext.PostVotes.findById(id)
    return postvote
  }
 async  create(body) {
    const postvote = await dbContext.PostVotes.create(body)
    return postvote
  }
 async update(updated) {
    const original = await this.getPostVote(updated.id)
    if (original.creatorId.toString() != updated.creatorId){
      throw new BadRequest('you cannot edit a postvote thats not yours')
    }
      original.vote = updated.vote || original.vote
      await original.save()
      return original
  }
  async remove(id, userId) {
    const original = await this.getPostVote(id)
    if (original.creatorId.toString() != userId){
      throw new Forbidden('thats not your postvote to delete')
    }
    await original.remove()
  }
  
}

export const postVotesService = new PostVotesService()