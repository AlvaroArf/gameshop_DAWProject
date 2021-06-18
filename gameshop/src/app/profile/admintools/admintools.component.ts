import { Component, OnInit } from '@angular/core';
import { APIDataService } from "../../services/apidata.service";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';


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

  constructor(private _apiDataService: APIDataService, private _appComponent: AppComponent) { 
    this.addUserForm();
    this.addProductForm();
    this.addCategoryForm();
  }
  form1: FormGroup;
  form2: FormGroup;
  form3: FormGroup;

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

  setProduct(){
    console.log(this.form2.value)
    this._apiDataService.setProduct(this.form2.value).subscribe(data => {
      this.info = data;
    })
    this.getProducts();
    this.form2.reset();
  }

  updateProduct() {
    console.log(this.form2.value);
    this._apiDataService.updateProduct(this.form2.value).subscribe(data => {
      this.info = data;
    })
    this.getProducts();
    this.form2.reset();
  }

  deleteProduct(id_producto) {
    this._apiDataService.deleteProduct(id_producto).subscribe(data => {
      this.info = data;
    })
    this.getProducts();
  }

  addProductForm() {
    this.form2 = new FormGroup({
      id: new FormControl('', []),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      precio: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      categoria: new FormControl('', [Validators.required])
    });
  }

  //CATEGORIES
  getCategories() {
    this._apiDataService.getCategories().subscribe(data => {
      this.users = '';
      this.games = '';
      this.categories = data;
    })
  }

  setCategory() {
    this._apiDataService.setCategory(this.form3.value).subscribe(data => {
      this.info = data;
    })
    this.form3.reset();
    this.getCategories();
    this._appComponent.ngOnInit();
  }

  updateCategory() {
    console.log(this.form3.value);
    this._apiDataService.updateCategory(this.form3.value).subscribe(data => {
      this.info = data;
    })
    this.form3.reset();
    this.getCategories();
    this._appComponent.ngOnInit();
  }

  deleteCategory(id_producto) {
    this._apiDataService.deleteCategory(id_producto).subscribe(data => {
      this.info = data;
    })
    this.getCategories();
    this._appComponent.ngOnInit();
  }

  addCategoryForm() {
    this.form3 = new FormGroup({
      id: new FormControl('', []),
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(250)])
    });
  }
 

}
