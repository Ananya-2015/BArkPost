import { Component, OnInit } from '@angular/core';
import { user } from '../user';
import { UserService } from '../user.service';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _userService:UserService, private _router:Router) { }

  user:user
  name:string
  email:string
  password:string
  showalert:boolean=false
  alertmsg:string

  ngOnInit(): void {
  }
  login(){
    this.user={ name:null, id:null , email:this.email,password:this.password}
    this._userService.newLogin(this.user).subscribe(responsedata =>{

    if(responsedata.token !="")    
      {
        console.log(responsedata.token)
        const userName=responsedata.users.userName
        localStorage.setItem("userName",userName)
        this._router.navigate(['/addPost'])
      }
      else {
        this.alertmsg=responsedata.message
        this.showalert=true
      
      }
    
    })
  }

}
