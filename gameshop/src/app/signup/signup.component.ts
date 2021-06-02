import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APIDataService } from "../services/apidata.service";
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _apiDataService: APIDataService,
    private _appComponent: AppComponent
    ) { }

  ngOnInit(): void {
  }

  signUp(){

    this._authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res)
          if(res != undefined){
            localStorage.setItem('token', res.token);
            this._apiDataService.findUser(this.user.email).subscribe(data => {localStorage.setItem('id', data[0]['id_usuario'])});
          }
          this._router.navigate(['/']);
          this._appComponent.ngOnInit();
          
        },
        err => console.log(err)
      )

    

  }

}
