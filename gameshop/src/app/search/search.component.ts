import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { APIDataService } from '../services/apidata.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  gamelist: Array<any> = [];
  search: string;

  constructor(private _appComponent: AppComponent, private _apiDataService: APIDataService) {
   }

  ngOnInit(): void {
    this.search = this._appComponent.search;
    this._apiDataService.searchProduct(this.search).subscribe(data => {
      this.gamelist = data;
    })
  }

}
