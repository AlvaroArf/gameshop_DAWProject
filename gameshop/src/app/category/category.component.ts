import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { APIDataService } from '../services/apidata.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public gamelist: Array<any> = [];
  public id: string;

  constructor(
    private _apiDataService: APIDataService,
    private _router: ActivatedRoute) 
    {
      this.id = this._router.snapshot.paramMap.get('id_categoria');
    }

  ngOnInit(): void {
      //Getting games
      this._apiDataService.getProductsByCategory(this.id).subscribe(data=>{
        this.gamelist = data;
      },
      error => {
        var errorMessage = error as any;
        console.log(errorMessage);
      }) 
  }

}
