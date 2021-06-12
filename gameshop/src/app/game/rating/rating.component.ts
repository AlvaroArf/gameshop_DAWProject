import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';

import { APIDataService } from "../../services/apidata.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  form: FormGroup;
  id_producto: string;
  id_usuario: string;
  currentRate : number = 3;
  token = '';
  commented: any;
  comments: Array<any> = [];
  info: any;
  
  constructor(private _route: ActivatedRoute, private _apiDataService: APIDataService) { 
    this.controlForm();
  }

  ngOnInit(): void {
    this.id_producto = this._route.snapshot.paramMap.get('id_producto');
    this.id_usuario = localStorage.getItem('id');
    this.token = localStorage.getItem('token');

    //this.commented = this.userComment();
    console.log("commented: " +  this.commented);
    this._apiDataService.getRating(this.id_producto).subscribe(data => {
      console.log("DATA " + data);
      this.comments = data;
    })
  }


  controlForm() {
    this.form = new FormGroup({
      rating: new FormControl(null ,Validators.required),
      comentary: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)])
    });
  }

  sendRating() {
    console.log(this.form.value.rating + " - " + this.form.value.comentary + " - " + this.id_producto + " - " + this.id_usuario);
    this._apiDataService.setRating(this.id_producto, this.id_usuario, this.form.value.comentary, this.form.value.rating).subscribe(data => {
      this.info = data;
    })
    this.form.reset();
  }

  /*userComment() {
    this._apiDataService.userComment(this.id_usuario, this.id_producto).subscribe(data => {
      if(data[0]){
        return false;
      }
      return true;
    })    
  }*/
}
