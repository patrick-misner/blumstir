import { ProxyState } from "../AppState.js";
// @ts-ignore
import { postsService } from "../Services/PostsService.js";


function _drawPosts(){
    let posts = ProxyState.posts;
    let template = ''
    posts.forEach(post => template += post.Template)
    // @ts-ignore
    document.getElementById('posts-card').innerHTML = template;
}

function _drawActivePost(){
  if (ProxyState.activePost !==null) {
    // @ts-ignore
    document.getElementById('active-post-body').innerHTML = ProxyState.activePost.Template
document.getElementById('active-post-title').innerText = ProxyState.activePost.title
  }
}

export class PostsController{
    constructor(){
        ProxyState.on('posts', _drawPosts)
        ProxyState.on('activePosts', _drawActivePost)
    }






    
}

