import {ProxyState} from "../AppState.js"



export class Post{
    constructor(postData){
        this.id = postData.id;
        this.title = postData.title;
        this.body = postData.body;
        this.imgUrl = postData.imgUrl;
        this.accountId = postData.accountId;
    }


    get Template(){
        return /*html*/ `
        <div class="col-2"></div>
        <div class="card col-8 justify-content-center" id="post-card" style="">
          <img src="" class="card-img-top" alt="">
          <div class="card-body">
            <h5 class="card-title"><figure>
              <blockquote class="blockquote">
                <p>A well-known quote, contained in a blockquote element.</p>
              </blockquote>
              <figcaption class="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>
              </figcaption>
            </figure></h5>
            <p class="card-text">Some quick example text </p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
        <div class="col-2"></div>
        </div>
    `
}

}