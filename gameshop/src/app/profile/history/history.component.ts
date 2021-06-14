import { Component, OnInit } from '@angular/core';
import { APIDataService } from "../../services/apidata.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public history: Array<any> = [];

  constructor(private _apiDataService: APIDataService) { }

  ngOnInit(): void {
    this._apiDataService.getHistory(localStorage.getItem('id')).subscribe(data => {
      this.history = data;
    })
  }
}
