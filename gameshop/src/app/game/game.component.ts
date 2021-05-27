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
  public currentUser:number = 3;

  constructor
  (
    private _route: ActivatedRoute, 
    private _apiDataService: APIDataService,
    private _authService: AuthService,
    private _router: Router
  ) { 
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

  sendToCart(id_producto:number){
    if (this._authService.loggedIn()){
      this._apiDataService.setRequestGame(this.currentUser, id_producto).subscribe(data=>{
        this.info = data;
        console.log("TEEEST nº 1: " + this.info);
        console.log("TEEEST nº 2: " + id_producto);
      },
      error => {
        var errorMessage = error as any;
        console.log(errorMessage);
      }) 
      console.log("TEEEST nº 1: " + this.info);
      console.log("TEEEST nº 2: " + id_producto);
    } else {
      this._router.navigate(['/signin']);
    }
  }
}

