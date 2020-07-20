import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Post } from '../Post';
import{ PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';



@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {
 
//  @Output() postCreate: EventEmitter<Post>=new EventEmitter<Post>();

  constructor( private _postService: PostService , private _activatedRouter:ActivatedRoute,private _router:Router) { }
  postlist : Post[]


  post:Post
  form_heading: string="Create your Bark post"
   editId:string

  id:string;
  title:string;
  body:string;
  editpost : Post 
  isdisplayAdd:boolean=true
  isdisplayEdit:boolean=true
  readonly:boolean=false
  userName:string

  ngOnInit(): void {
    this.userName=localStorage.getItem('userName')
    console.log(this.userName)

    this._postService.getPosts().pipe(map(responseData =>{
      return responseData.Allposts.map(post =>{
        return{
          id:post.id,
          title:post.title,
          body:post.body

        }
        
      })

    })).subscribe()
   
    this._activatedRouter.paramMap.subscribe((param) => this.id=(param.get('id')))
      console.log(this.id)
      this.editId=this.id
      if(this.editId!="" && this.editId!=undefined){
        // this.editpost=this._postService.getEditPost(this.id)
        // console.log(this.editpost)
        // this.title=this.editpost.title
        // this.body=this.editpost.body
        this.isdisplayAdd=false
       
        this.form_heading="Edit your Bark post"
      }
      else{
        this.isdisplayEdit=false
        this.readonly=false
      }
    }

    logout()
    {
      localStorage.removeItem('userName')
      this._router.navigate(['/'])

    }
  
  addPost(){
     
        this.post={title:this.title , id:null , body:this.body}
        console.log(this.post)
        this._postService.addNewPost(this.post).subscribe(responsedata =>{
          if(responsedata.Allposts.ops[0]._id){
            console.log(" saved !!!")
          }
        })
    }
    
  edit()
  {
    this.post={title:this.title ,id:this.id,  body:this.body}
    this._postService.editPost(this.post).subscribe(responsedata =>{
      if(responsedata.Allposts.modifiedCount){
        console.log("Updated")
      }
    })
  }
}
    
 


