import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIDataService {

  public data:string;

  constructor(private http: HttpClient) { }

  //PRODUCTS
  getProducts(): Observable<any>{
    this.data = "/api/products";
    console.log("EL DEBUG: " + this.http.get(this.data))
    return this.http.get(this.data);
  }
  
  getProduct(id:number): Observable<any>{
    this.data = "/api/product/" + id;

    return this.http.get(this.data);
  }
  /*
  //CATEGORIES
  getCategories(): Observable<any>{
    this.data = "/api/categories";

    return this.http.get(this.data);
  }
  */

  //CART
  getRequestGames(){}

  setRequestGame(id_usuario:number, id_producto:number): Observable<any>{
    //this.data = "/api/cart/" + id_usuario  + "/" + id_producto;
    console.log("apidata:" + id_usuario + id_producto)
    return this.http.post("/api/cart", {"user": id_usuario, "product": id_producto});
  }
}
