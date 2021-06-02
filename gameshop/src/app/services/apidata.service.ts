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
  
  getProductsByCategory(id): Observable<any>{
    this.data = "/api/products/" + id;
    return this.http.get(this.data);
  }

  //CATEGORIES
  getCategories(): Observable<any>{
    this.data = "/api/categories";

    return this.http.get(this.data);
  }
  

  //CART
  getRequestDetails(id_usuario):Observable<any>{
    return this.http.get("/api/cart/" + id_usuario);
  }

  setRequestGame(id_usuario, id_producto): Observable<any>
  {
    //this.data = "/api/cart/" + id_usuario  + "/" + id_producto;
    return this.http.post("/api/cart", {"id_usuario": id_usuario, "id_producto": id_producto});
  };
  
  updateRequestGame(cantidad, id_pedido, id_producto):Observable<any>{
    return this.http.post("/api/cartUpdate", {"cantidad": cantidad, "id_pedido": id_pedido, "id_producto": id_producto});
  }

  newRequest(id_pedido, id_usuario):Observable<any>{
    return this.http.post("/api/newRequest", {"id_pedido": id_pedido, "id_usuario": id_usuario});
  }

  //USER
  findUser(email) {
    return this.http.post<any>('/api/findUser', {"email": email});
  }
}
