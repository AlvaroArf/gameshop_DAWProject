import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { APIDataService } from "./services/apidata.service";
import { AuthService } from "./services/auth.service";
//import { SearchComponent } from "./search/search.component";




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  form1: FormGroup;
  form2: FormGroup;
  title = 'gameshop';
  token = '';
  categories: any;
  id_user: string;
  user_img: any;
  search: string;


  constructor(private _authService: AuthService, 
              private _router: Router,
              private _apiDataService: APIDataService,
              //private _searchComponent: SearchComponent
              ) 
              { 
                  this.signUpForm();
                  this.signInForm();
              }

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

  signUpForm() {
    this.form1 = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  signInForm() {
    this.form2 = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  signIn(){
    const user = this.form2.value;
    this._authService.signIn(user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this._apiDataService.findUser(user.email).subscribe(data => {
            localStorage.setItem('id', data[0]['id_usuario']);
            window.location.reload();
        });
        },
        err => console.log(err)
      )
  }

  signUp(){
    const user = this.form1.value;
    this._authService.signUp(user)
      .subscribe(
        res => {
          console.log(res)
          if(res != undefined){
            localStorage.setItem('token', res.token);
            this._apiDataService.findUser(user.email).subscribe(data => {
              localStorage.setItem('id', data[0]['id_usuario']); 
              window.location.reload();
            });
          }
          
        },
        err => console.log(err)
      )
  }

  searchProduct() {
    console.log(this.search);
    console.log(this._router.url);
    
    if(this._router.url == '/search'){
      window.location.reload();
     // this._searchComponent.ngOnInit();
    }
    
    this._router.navigate(['/search']);
  }
}
