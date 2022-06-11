import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";



export class CommentsController extends BaseController{
  constructor(){
    super('api/posts/:id/comments')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getComment)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next){
    try {
      const comments = await commentsService.getAll(req.query)
    return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async getComment(req, res, next){
    try {
      const foundComment = await commentsService.getComment(req.params.id)
      return res.send(foundComment)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      const newComment = await commentsService.create(req.body)
      return res.send(newComment)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updatedComment = await commentsService.update(req.body)
      return res.send(updatedComment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next){
    try {
      await commentsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted comment')
    } catch (error) {
      next(error)
    }
  }
}