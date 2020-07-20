import { Component, OnInit } from '@angular/core';
import { user } from '../user';
import { UserService } from '../user.service';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private _userService:UserService) { }
  user:user
  name:string
  email:string
  password:string
  userName:string

  ngOnInit(): void {
  }

  register(){
    this.user={name:this.name , id:null , email:this.email,password:this.password}
    console.log(this.user)
    this._userService.newRegister(this.user).subscribe(responsedata =>{
      if(responsedata.users.ops[0]._id){
        this.userName=responsedata.users.ops[0].name
        localStorage.setItem('userName',this.userName)

        console.log(" saved !!!")
      }
    })
  }

}
