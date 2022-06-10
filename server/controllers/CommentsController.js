import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";



export class CommentsController extends BaseController{
  constructor(){
    super('api/comments')
    this.router
      .get('', this.getAll)
      .post('', this.create)
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

  async create(req, res, next){
    try {
      const comment = await commentsService.create(req.body)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next){
    try {
      const message = await commentsService.remove(req.params.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}