import { Component, OnInit } from '@angular/core';

import { APIDataService } from '../services/apidata.service';


@Component({
  selector: 'app-gamelist',
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.css']
})
export class GamelistComponent implements OnInit {

  public gamelist: Array<any> = [];
  public categories: Array<any> = [];

  constructor(private _apiDataService: APIDataService) { }

  ngOnInit(): void {
    //Getting categories
    /*
    this._apiDataService.getCategories().subscribe(data=>{
      this.categories = data;
      console.log(this.categories);
    },
    error => {
      var errorMessage = error as any;
      console.log(errorMessage);
    })
    */
    //Getting games
    this._apiDataService.getProducts().subscribe(data=>{
      this.gamelist = data;
      console.log("GAMELIST: " + this.gamelist);
    },
    error => {
      var errorMessage = error as any;
      console.log(errorMessage);
    })
    
  }

}
