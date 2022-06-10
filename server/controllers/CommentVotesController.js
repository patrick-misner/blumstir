import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentVotesService } from "../services/CommentVotesService";
import { postVotesService } from "../services/PostVotesService";
import BaseController from "../utils/BaseController";





export class CommentVotesController extends BaseController{
  constructor(){
    super('api/commentvotes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getCommentVote)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next){
    try {
      let commentvotes = await commentVotesService.getAll(req.query)
      return res.send(commentvotes)
    } catch (error) {
      next(error)
    }
  }

  async getCommentVote(req, res, next){
    try {
      let commentvote = await commentVotesService.getCommentVote(req.params.id)
      return res.send(commentvote)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      let commentvote = await commentVotesService.create(req.body)
      return res.send(commentvote)
    } catch (error) {
      next(error)
    }
}
async update(req, res, next){
  try {
    req.body.creatorId = req.userInfo.id
    req.body.id = req.params.id
    let commentvote = await commentVotesService.update(req.body)
    return res.send(commentvote)
  } catch (error) {
    next(error)
  }
}
async remove(req, res, next){
  try {
    await commentVotesService.remove(req.params.id, req.userInfo.id)
    return res.send('deleted comment vote')
  } catch (error) {
    next(error)
  }
}
}




