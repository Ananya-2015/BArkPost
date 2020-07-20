import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl="http://localhost:3000/barkposts/"

  constructor(private _http : HttpClient) { }
  newRegister(newuser){
    return this._http.post<{message:string,users:any}>(this._baseUrl+'register',newuser)

  }

  newLogin(loginuser){
    return this._http.post<{message:string,users:any,token:string}>(this._baseUrl+'login',loginuser)

  }


}
