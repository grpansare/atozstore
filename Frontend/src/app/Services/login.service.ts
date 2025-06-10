import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  loginuser(token:any){
    sessionStorage.setItem("token",token)
    return true;
  }
  isLoggedIn(){
   let token= sessionStorage.getItem("token")
   if(token==undefined || token==='' ||token==null){
    return false;
   }
   else{
    return true;
   }
  }
  //for logout user
  logout(){
    sessionStorage.removeItem('token');
    return true;
  }


  getToken(){
    return sessionStorage.getItem("token");
  }
}
