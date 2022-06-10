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

            
            <p class="card-text">Some quick example text </p>
           
          </div>
        </div>
        <div class="col-2"></div>
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  View comments
</button>

<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </div>
    <div class="dropdown mt-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
        Dropdown button
      </button>
  
    </div>
  </div>
</div>
        </div>
    `
}

}