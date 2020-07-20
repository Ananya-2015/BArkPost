import { Injectable } from '@angular/core';
import { Post } from './Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostsComponent } from './posts/posts.component';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postlist:Post[]= []
 
  private _baseUrl="http://localhost:3000/barkposts/"
   editpost:Post

  constructor (private _http : HttpClient ){ }



  getEditPost(id){
    this.postlist.forEach(post => {
      if(post.id==id){
        this.editpost=post
      }
    })
    
    return this.editpost
  }

  editPost(post:Post)
  {
    console.log(post)
    return this._http.put<{message:string,Allposts:any}>(this._baseUrl+'updatepost',post)
  }
    deletePost(deleteId){
      const options = {
        headers : new HttpHeaders({
          'Content-type' : "application/json"
        }),
        body:JSON.stringify(deleteId)
      }
   
    return this._http.delete<{message:string,Allposts:any}>(this._baseUrl+'deletepost',options)

  }

  addNewPost(post:Post)
  {
    return this._http.post<{message:string,Allposts:any}>(this._baseUrl+'addposts',post)
  }

  getPosts(){
    return this._http.get<{message:string,Allposts:any}>(this._baseUrl+'getposts')
    
  }
}
