import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId.js";



export class Post {
  constructor(postData) {
    this.id = postData.id || generateId();
    this.title = postData.title;
    this.body = postData.body;
    this.imgUrl = postData.imgUrl;
    this.accountId = postData.accountId || generateId();
  }


  get Template() {
    return /*html*/ `
        <div class="col-2"></div>
        <div class="card col-8 justify-content-center"  style="">
          <img src="" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p>${this.body}</p>
            <img src="${this.imgUrl}" class="img-fluid"alt="">
            <h4><figure>
              <blockquote class="blockquote">
              </blockquote>
              <figcaption class="blockquote-footer">
                Jeff Goldblum in <cite title="Source Title">Jeff Goldblum</cite>
              </figcaption>
            </figure></h4>           
          </div>
        </div>
        <div class="col-2"></div>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  View comments
</button>

<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Post Title: ${this.title}</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form class="p-3" onsubmit="app.commentsController.createComment('${this.id}')">
      <div class="">
        <div class=" d-flex  card rounded-0">
            <input class="form-control" type="text" name="title" placeholder="Title..." aria-label="default input example">
            <textarea type="text" minlength="2" class="form-control border border-2 border-dark" id="body" placeholder="Comment..."
              name="body"></textarea>
            <div class="row vstack gap-2 ">
            </div>
            </div>
        </div>
        <div class="offcanvas-footer">
          <button type="submit" class="btn btn-dark text-white  my-2">Are you sure you want to post this? </button>
        </div>
    </form>
    <div>
      Comments:
    </div>
    <div id="offcanvas-comments">
      ${this.Comments}
    </div>
  </div>
</div>
        </div>
    `
  }

  get Comments() {
    let comments = ProxyState.comments.filter(c => c.postId == this.id)
    let template = ''
    comments.forEach(c => template += c.Template)
    return template
  }

}