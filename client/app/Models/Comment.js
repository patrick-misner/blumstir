import { generateId } from "../Utils/GenerateId.js";



export class Comment {
  constructor(commentData) {
    this.id = commentData.id || generateId();
    this.body = commentData.body;
    this.accountId = commentData.accountId;
    this.postId = commentData.postId || generateId();
    this.votes = commentData.votes
  }

  get Template() {
    return `
   <div class="card-body" id="${this.postId}">                 
      <p class="card-text">${this.body} </p>
    </div>`
  }

}