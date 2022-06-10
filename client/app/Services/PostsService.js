import { ProxyState } from "../AppState.js";
import { Post } from "../Models/Post.js";


class PostsService {
 createPost(postData) {
console.log('seervice createPost', postData);
ProxyState.posts = [...ProxyState.posts, new Post(postData)]
}

deletePost(postId) {
console.log('seervice deletePost', postId);
ProxyState.posts = ProxyState.posts.filter(post => post.id !== postId)


}
}
export const postsService = new PostsService();