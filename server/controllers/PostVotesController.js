import { Auth0Provider } from "@bcwdev/auth0provider";
import { postVotesService } from "../services/PostVotesService";
import BaseController from "../utils/BaseController";





export class PostVotesController extends BaseController{
  constructor(){
    super('api/postVotes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getPostVote)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next){
    try {
      let postvotes = await postVotesService.getAll(req.query)
      return res.send(postvotes)
    } catch (error) {
      next(error)
    }
  }

  async getPostVote(req, res, next){
    try {
      let postvote = await postVotesService.getPostVote(req.params.id)
      return res.send(postvote)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next){
    try {
      req.body.creatorId = req.userInfo.id
      let postvote = await postVotesService.create(req.body)
      return res.send(postvote)
    } catch (error) {
      next(error)
    }
}
async update(req, res, next){
  try {
    req.body.creatorId = req.userInfo.id
    req.body.id = req.params.id
    let postvote = await postVotesService.update(req.body)
    return res.send(postvote)
  } catch (error) {
    next(error)
  }
}
async remove(req, res, next){
  try {
    await postVotesService.remove(req.params.id, req.userInfo.id)
    return res.send('deleted postvote')
  } catch (error) {
    next(error)
  }
}
}




