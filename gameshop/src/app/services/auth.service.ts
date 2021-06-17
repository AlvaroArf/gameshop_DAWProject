import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string = "http://localhost:3000";
  
  constructor(private http: HttpClient) {}

  signUp(user) {
    return this.http.post<any>(this.url + '/api/signup', {"name": user.nombre, "surname": user.apellidos, "email": user.email, "address": user.direccion, "password": user.password});
  }

  signIn(user) {
    return this.http.post<any>(this.url + '/api/signin', user);
  }

  loggedIn(): boolean{
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
