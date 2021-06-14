import { Component, OnInit } from '@angular/core';
import { APIDataService } from "../../services/apidata.service";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-admintools',
  templateUrl: './admintools.component.html',
  styleUrls: ['./admintools.component.css']
})
export class AdmintoolsComponent implements OnInit {

  public users: any;
  public games: any;
  public categories: any;
  info: any;

  constructor(private _apiDataService: APIDataService) { 
    this.addUserForm();
  }
  form1: FormGroup;

  ngOnInit(): void {
  }
  //USERS
  getUsers(){
    this._apiDataService.getUsers().subscribe(data => {
      this.games = '';
      this.categories = '';
      this.users = data;
    })
  }

  setUser() {
    console.log(this.form1.value);
    this._apiDataService.setUser(this.form1.value).subscribe(data => {
      this.info = data;
    })
    this.form1.reset();
    this.getUsers();
  }

  updateUser() {
    console.log(this.form1.value);
    this._apiDataService.updateUser(this.form1.value).subscribe(data => {
      this.info = data;
    })
    this.form1.reset();
    this.getUsers();
  }

  deleteUser(id_user) {
    this._apiDataService.deleteUser(id_user).subscribe(data => {
      this.info = data;
    })
    this.getUsers();
  }

  addUserForm() {
    this.form1 = new FormGroup({
      id: new FormControl('', []),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', []),
      email: new FormControl('', [Validators.required, Validators.email]),
      direccion: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      admin: new FormControl('', [Validators.pattern('^(true|false)$'), Validators.required])
    });
  }

  //PRODUCTS
  getProducts() {
    this._apiDataService.getProducts().subscribe(data => {
      this.categories = '';
      this.users = '';
      this.games = data;
    })
  }

  //CATEGORIES
  getCategories() {
    this._apiDataService.getCategories().subscribe(data => {
      this.users = '';
      this.games = '';
      this.categories = data;
    })
  }

 

}
