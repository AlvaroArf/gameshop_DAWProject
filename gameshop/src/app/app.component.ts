import { Component } from '@angular/core';

import { CategoryComponent } from "./category/category.component";

import { Router } from '@angular/router';
import { APIDataService } from "./services/apidata.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gameshop';
  token = '';
  categories: any;

  constructor(private _router: Router, private _apiDataService: APIDataService) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this._apiDataService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }

  logOut(){
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    this._router.navigate(['/']);
    this.ngOnInit();
  }

  filterGamelist(id_categoria){
    this._router.navigate(['/category/' + id_categoria]);
  }
}
