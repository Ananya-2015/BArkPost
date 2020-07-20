import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { PostsComponent } from './posts/posts.component';
import { PostformComponent } from './postform/postform.component';
import { PostComponent } from "./post/post.component";
import{ LoginComponent } from "./login/login.component";
import{  RegisterComponent } from "./register/register.component";
import { Error404Component } from "./error404/error404.component";

const routes : Routes=[
  {
    path:'',
    component :PostsComponent
  },
  { path:'addPost',
    component: PostformComponent
  },
  { path:'recentPost',
    component: PostComponent
  },
  { path:'editPost/:id',
    component: PostformComponent
  },
  { path:'deletePost/:id',
    component: PostComponent
  },
  { path:'login',
  component: LoginComponent
},
{ path:'register',
component:  RegisterComponent 
},
  { path:'**',
    component: Error404Component
  }


]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports:[
    RouterModule

  ]
})
export class AppRoutingModule { }
