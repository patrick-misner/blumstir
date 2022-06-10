import { postsService } from "../services/PostsService";
import BaseController from "../utils/BaseController";




export class PostsController extends BaseController{
  constructor(){
    super('api/posts')
    this.router
      .get('', this.getAll)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next){
    try {
      const posts = await postsService.getAll(req.query)
      return res.send(posts)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next){
    try {
      const post = await postsService.create(req.body)
      return res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next){
    try {
      const message = await postsService.remove(req.params.id)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}