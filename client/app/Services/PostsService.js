// import jeffsum from 'jeffsum'
import { ProxyState } from "../AppState.js";
import { Post } from "../Models/Post.js";
import { logger } from "../Utils/Logger.js";
import { api } from "./AxiosService.js";


class PostsService {
  async createPost(postData) {
    logger.log('service createPost', postData);
    const res = await api.post("api/posts", postData)
    const post = new Post(res.data)
    ProxyState.posts = [...ProxyState.posts, post]
    ProxyState.activePost = post
  }

  deletePost(postId) {
    logger.log('service deletePost', postId);
    ProxyState.posts = ProxyState.posts.filter(post => post.id !== postId)


  }
}
export const postsService = new PostsService();