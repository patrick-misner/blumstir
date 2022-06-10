import { ProxyState } from "../AppState.js";
import { Post } from "../Models/Post.js";
import {logger} from "../Utils/Logger.js";


class PostsService {
 createPost(postData) {
logger.log('service createPost', postData);
ProxyState.posts = [...ProxyState.posts, new Post(postData)]
}

deletePost(postId) {
logger.log('service deletePost', postId);
ProxyState.posts = ProxyState.posts.filter(post => post.id !== postId)


}
}
export const postsService = new PostsService();