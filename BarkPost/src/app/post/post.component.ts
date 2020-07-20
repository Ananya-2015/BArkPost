import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../Post';
import{ PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  //  @Input() post:Post;
  
  userName:string

   post:Post
   id:string;
   title:string;
   body:string;
   deleteId:string;
   deleteObj:{
    id:string
  }
 
  constructor(private _postService: PostService,private _activatedRouter:ActivatedRoute,private _router:Router) { }
  postlist : Post[]

  ngOnInit(): void {
    // this._postService.getPosts().subscribe(data=>this.postlist=data) 
    // this._activatedRouter.paramMap.subscribe((param) => {
    //   this.id=(param.get('id'))  
    this.userName=localStorage.getItem('userName')
    console.log(this.userName)

      this._postService.getPosts().pipe(map(responseData =>{
        return responseData.Allposts.map(posts =>{
          return{
            id:posts._id,
            title:posts.title,
            body:posts.body

          }
          
        })

      })).subscribe((posts)=>{
        this.postlist=posts
      })

    this._activatedRouter.paramMap.subscribe((param) => this.id=(param.get('id')))
    

  }

  logout()
  {
    localStorage.removeItem('userName')
    this._router.navigate(['/'])

  }

  delete(deleteId)
  { 
    alert("Do you want to delete this post?")
    this._postService.deletePost(deleteId).subscribe()
      
  } 

}
