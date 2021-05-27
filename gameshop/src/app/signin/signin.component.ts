import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

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

  constructor(private _authServic: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  signIn(){
    this._authServic.signIn(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          //localStorage.setItem('id',res.id);
          this._router.navigate(['/']);

        },
        err => console.log(err)
      )
  }

}
