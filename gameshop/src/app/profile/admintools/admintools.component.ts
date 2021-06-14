import { Component, OnInit } from '@angular/core';
import { APIDataService } from "../../services/apidata.service";

@Component({
  selector: 'app-admintools',
  templateUrl: './admintools.component.html',
  styleUrls: ['./admintools.component.css']
})
export class AdmintoolsComponent implements OnInit {

  public content: any;

  constructor(private _apiDataService: APIDataService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._apiDataService.getUsers().subscribe(data => {
      this.content = data;
    })
  }

}
