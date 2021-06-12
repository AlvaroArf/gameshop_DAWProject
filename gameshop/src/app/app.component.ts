import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { APIDataService } from "./services/apidata.service";
import { AuthService } from "./services/auth.service";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gameshop';
  token = '';
  categories: any;
  id_user: string;
  user_img: any;
  user = {
    nombre: '',
    apellidos: '',
    email: '',
    direccion: '',
    password: ''
  }

  constructor(private _authService: AuthService, 
              private _router: Router,
              private _apiDataService: APIDataService) { }

  ngOnInit() {
    this.id_user = localStorage.getItem('id');
    this.token = localStorage.getItem('token');
    this._apiDataService.getUserById(this.id_user).subscribe(data => {
      this.user_img = data;
    })
    
    this._apiDataService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }

  logOut(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this._router.navigate(['/']);
    this.ngOnInit();
  }

  filterGamelist(id_categoria){
    this._router.navigate(['/category/' + id_categoria]);
  }

  signIn(){
    console.log("email: " + this.user.email + ", contraseña: " + this.user.password);
    this._authService.signIn(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this._apiDataService.findUser(this.user.email).subscribe(data => {
            localStorage.setItem('id', data[0]['id_usuario']);
            window.location.reload();
        });
        },
        err => console.log(err)
      )
  }

  signUp(){
    console.log(this.user.apellidos);
    this._authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res)
          if(res != undefined){
            localStorage.setItem('token', res.token);
            this._apiDataService.findUser(this.user.email).subscribe(data => {
              localStorage.setItem('id', data[0]['id_usuario']); 
              window.location.reload();
            });
          }
          
        },
        err => console.log(err)
      )
  }
}
