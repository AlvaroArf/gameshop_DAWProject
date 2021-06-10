import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { APIDataService } from '../services/apidata.service';


@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  public gamelist: Array<any> = [];

  constructor(private _apiDataService: APIDataService) {
   }

  ngOnInit(): void {
    //Getting games
      this._apiDataService.getProducts().subscribe(data=>{
        this.gamelist = data;
      },
      error => {
        var errorMessage = error as any;
        console.log(errorMessage);
      })    
  }

}
