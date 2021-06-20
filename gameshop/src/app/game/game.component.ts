import { Component, OnInit } from '@angular/core';

import { APIDataService } from '../services/apidata.service';
import { ActivatedRoute, Router} from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public game: Array<any> = [];
  public info: any;
  public id:string;
  public id_user;
  public amount: any;
  token = '';


  constructor
  (
    private _route: ActivatedRoute, 
    private _apiDataService: APIDataService,
    private _authService: AuthService,
    private _router: Router
  ) { 
      this.token = localStorage.getItem('token');
      this.id = this._route.snapshot.paramMap.get('id_producto');
    }

  ngOnInit(): void {
    //Getting game
    this._apiDataService.getProduct(parseInt(this.id)).subscribe(data=>{
      this.game = data;
      console.log("GAME " + this.game);
    },
    error => {
      var errorMessage = error as any;
      console.log(errorMessage);
    })
  }

  sendToCart(id_producto, stock){
    if (this._authService.loggedIn()){
      this.id_user = localStorage.getItem('id');
      
      console.log("AMOUNT" + this.amount);
      this._apiDataService.productExist(this.id_user, id_producto).subscribe(data => {
        if(data[0] == undefined){
          this._apiDataService.setRequestGame(this.id_user, id_producto).subscribe(data=>{
            this.info = data;
          })
        } else {
          this._apiDataService.getAmount(this.id_user, id_producto).subscribe(data1 => {
            if(parseInt(data1) < parseInt(stock)){
              this._apiDataService.updateRequestGame2(this.id_user, id_producto).subscribe(data => {
                this.info = data;
              })
            }
          })
        }
      })
    } else {
      document.getElementById("signinButton").click();
    }
  }

  sendToWishlist(id_producto){
    console.log("WHISLISH")
    this.id_user = localStorage.getItem('id');
    this._apiDataService.setWishlist(this.id_user, id_producto).subscribe(data => {
      this.info = data;
    })



  }
}

