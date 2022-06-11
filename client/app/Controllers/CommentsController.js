import { ProxyState } from '../AppState.js'
import { commentsService } from '../Services/CommentsService.js'
import { logger } from '../Utils/Logger.js'

function _drawComments(postId) {
  let comments = ProxyState.comments;
  let template = "";
  comments.forEach((comment) => (template += comment.Template));
  // @ts-ignore
  document.getElementById("offcanvas-comments"+postId).innerHTML = template;
}

export class CommentsController {
  constructor() {
    // ProxyState.on("comments", _drawComments);
    
    this.getComments()
   
  }
  async createComment(postId) {
    logger.log('createComment', postId);
    window.event.preventDefault()
    let form = window.event.target;
    let commentData = {
      postId: postId,
      body: form.body.value,
      // accountId: ProxyState.user.id
    }
    
    console.log('commentData', commentData);
    commentsService.createComment(commentData);
    bootstrap.Offcanvas.getOrCreateInstance(document.getElementById('offcanvasExample' + commentData)).hide()
  }

  async getComments() {
    await commentsService.getComments();
  } 

  async removeComment(id) {
    commentsService.removeComment(id)
  }

}

// function _drawActiveComment() {
//   let activeComment = ProxyState.activeComment;
//   if (ProxyState.activePost !== null) {
//     // @ts-ignore
//     document.getElementById("active-comment-body").innerHTML =
//       ProxyState.activeComment.Template;
//     document.getElementById("active-comment-title").innerText =
//       ProxyState.activeComment.Template;
//   }

  //   async edit(id) {
  //   try {
  //     await commentsService.edit(id)
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }

  // async remove(id) {
  //   try {
  //     await commentsService.remove(id)
  //   } catch (error) {
  //     logger.error(error)
  //   }
  // }
// }