import { ProxyState } from "../AppState.js";
// @ts-ignore
import { postsService } from "../Services/PostsService.js";
import { commentsService } from "../Services/CommentsService.js"
import { logger } from "../Utils/Logger.js";

function _drawPosts() {
  let posts = ProxyState.posts;
  let template = "";
  posts.forEach((post) => (template += post.Template));
  // @ts-ignore
  document.getElementById("post-card").innerHTML = template;
}
function _drawComments() {
  let comments = ProxyState.comments;
  let template = "";
  comments.forEach((comment) => (template += comment.Template));
  // @ts-ignore
  document.getElementById("offcanvas-comments").innerHTML = template;
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
    ProxyState.on("comments", _drawPosts)
    _drawPosts()
  }

  async createPost() {
    logger.log('createPost');
    window.event.preventDefault()
    let form = window.event.target;
    let postData = {
      title: form.title.value,
      body: form.body.value,
      imgUrl: form.imgUrl.value,
    }
    console.log('postData', postData);
    postsService.createPost(postData);
    bootstrap.Modal.getOrCreateInstance(document.getElementById("modal")).hide()
  }
}
