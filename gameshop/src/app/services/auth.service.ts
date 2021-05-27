import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) {}

  signUp(user) {
    return this.http.post<any>('/api/signup', user);
  }

  signIn(user) {
    return this.http.post<any>('/api/signin', user);
  }

  loggedIn(): boolean{
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  findUser(email, password) {
    //return this.http.post<any>('/api/findUser', {email, password})
    console.log("SERVICIO FRONT: " + this.http.post<any>('/api/findUser', {email, password}));
    return 'coco';
  }
}
