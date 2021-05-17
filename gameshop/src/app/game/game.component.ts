import { Component, OnInit } from '@angular/core';

import { APIDataService } from '../services/apidata.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  public game: Array<any> = [];
  public id:string;

  constructor(private _route: ActivatedRoute, private _apiDataService: APIDataService) { 
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

}

