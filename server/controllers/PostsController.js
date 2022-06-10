import { Auth0Provider } from "@bcwdev/auth0provider";
import { postsService } from "../services/PostsService";
import BaseController from "../utils/BaseController";




export class PostsController extends BaseController{
  constructor(){
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getPost)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
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

  async getPost(req, res, next){
    try {
      const foundPost = await postsService.getPost(req.params.id)
      return res.send(foundPost)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      const newPost = await postsService.create(req.body)
      return res.send(newPost)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const updatedPost = await postsService.update(req.body)
      return res.send(updatedPost)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next){
    try {
      await postsService.remove(req.params.id, req.userInfo.id)
      return res.send('deleted post')
    } catch (error) {
      next(error)
    }
  }
}