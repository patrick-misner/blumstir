import { ProxyState } from "../AppState.js";
// @ts-ignore
import { postsService } from "../Services/PostsService.js";
import { commentsService } from "../Services/CommentsService.js"
import { logger } from "../Utils/Logger.js";

function _drawPosts() {
  let posts = ProxyState.posts;
  let template = "";
  posts.forEach((post) => (template += post.Template));
  // logger.log(template)
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
  if (activePost !== null) {
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
    this.getPosts()
  }


  async getPosts() {
    try {
      await postsService.getAllPosts()
    } catch (error) {
      logger.error('[getPosts]', error.message)
    }
  }

  async upVotePost(postId){
    try {
      await postsService.upVotePost(postId)
    } catch (error) {
      logger.error(error.message)
    }
  }
  async createPost() {
    logger.log('createPost');
    window.event.preventDefault()
    let form = window.event.target;
    let postData = {
      title: form.title.value,
      body: form.body.value,
      imageUrl: form.imageUrl.value,
    }
    console.log('postData', postData);
    postsService.createPost(postData);
    form.reset()
    bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal')).hide()
  }
}
