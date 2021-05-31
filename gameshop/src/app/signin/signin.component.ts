import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { APIDataService } from "../services/apidata.service";
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  
  user = {
    email: '',
    password: ''
  }

  constructor(
    private _authServic: AuthService, 
    private _router: Router,
    private _apiDataService: APIDataService,
    private _appComponent: AppComponent
    ) { }

  ngOnInit(): void {
  }

  signIn(){
    this._authServic.signIn(this.user)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this._apiDataService.findUser(this.user.email).subscribe(data => {localStorage.setItem('id', data[0]['id_usuario'])});
          this._router.navigate(['/']);
          this._appComponent.ngOnInit();
        },
        err => console.log(err)
      )
  }


}