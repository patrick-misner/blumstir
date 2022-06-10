import { ProxyState } from "../AppState.js";
// @ts-ignore
import { postsService } from "../Services/PostsService.js";
import { logger } from "../Utils/Logger.js";

function _drawPosts() {
  let posts = ProxyState.posts;
  let template = "";
  posts.forEach((post) => (template += post.Template));
  // @ts-ignore
  document.getElementById("post-card").innerHTML = template;
}

function _drawActivePost() {
  let activePost = ProxyState.activePost;
  if (ProxyState.activePost !== null) {
    // @ts-ignore
    document.getElementById("active-post-body").innerHTML =
      ProxyState.activePost.Template;
    document.getElementById("active-post-title").innerText =
      ProxyState.activePost.Template;
  }
}

export class PostsController {
  constructor() {
    ProxyState.on("posts", _drawPosts);
    ProxyState.on("activePost", _drawActivePost);
    _drawPosts()
  }




  async createPost(id){
    logger.log('createPost');
    window.event.preventDefault()
    let form = window.event.target;
    let postData = {
        title: form.title.value,
        body: form.body.value,
        imgUrl: form.imgUrl.value,
        accountId: ProxyState.user.id
    }
    console.log('postData', postData);
    postsService.createPost(postData);
  }
}
