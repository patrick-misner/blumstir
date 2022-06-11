// import jeffsum from 'jeffsum'
import { ProxyState } from "../AppState.js";
import { Post } from "../Models/Post.js";
import { logger } from "../Utils/Logger.js";
import { api } from "./AxiosService.js";


class PostsService {
  

  async getAllPosts() {
    const res = await api.get('api/posts')
    logger.log(res.posts)
    const posts = res.data.map(p => new Post(p))
    ProxyState.posts = posts
  }
  async createPost(postData) {
    logger.log('service createPost', postData);
    const res = await api.post("api/posts", postData)
    const post = new Post(res.data)
    logger.log('CP', post)
    ProxyState.posts = [...ProxyState.posts, post]
    //ProxyState.activePost = post
  }

  // setActive(id) {
  //   const found = ProxyState.posts.find(p => p.id === id)
  //   if (!found) {
  //     throw new Error('Invalid Ship Id')
  //   }
  //   ProxyState.activePost = found
  // }

  deletePost(postId) {
    logger.log('service deletePost', postId);
    ProxyState.posts = ProxyState.posts.filter(post => post.id !== postId)


  }

  async upVotePost(postId) {
    const res = await api.put(`api/posts/${postId}`)
  }
}
export const postsService = new PostsService();