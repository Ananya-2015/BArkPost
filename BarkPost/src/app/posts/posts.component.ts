import { Component, OnInit } from '@angular/core';
import { Post } from '../Post';
import{ PostService } from '../post.service';



@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postlist:Post[]=[]


  constructor(private _postService: PostService) { }

  ngOnInit(): void {
    // this._postService.getPosts().subscribe(data=>this.postlist=data)   
  }
}