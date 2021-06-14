import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIDataService {

  public url:string = "http://localhost:3000";
  public data:string;

  constructor(private http: HttpClient) { }

  //PRODUCTS
  getProducts(): Observable<any>{
    this.data ="/api/products";
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
  
  productExist(id_usuario, id_producto): Observable<any>
  {
    return this.http.post("/api/cartExist", {"id_usuario": id_usuario, "id_producto": id_producto});
  }

  updateRequestGame(cantidad, id_pedido, id_producto):Observable<any>{
    return this.http.post("/api/cartUpdate", {"cantidad": cantidad, "id_pedido": id_pedido, "id_producto": id_producto});
  }

  updateRequestGame2(id_usuario, id_producto){
    return this.http.post("/api/cartUpdate", {"id_usuario": id_usuario, "id_producto": id_producto});
  }

  newRequest(id_pedido, id_usuario):Observable<any>{
    return this.http.post("/api/newRequest", {"id_pedido": id_pedido, "id_usuario": id_usuario});
  }

  //USER
  getUsers() {
    return this.http.get('/api/users');
  }

  findUser(email) {
    return this.http.post<any>('/api/findUser', {"email": email});
  }

  getUserById(id_usuario) {
    return this.http.get('/api/user/' + id_usuario);
  }

  changeImage(id_usuario, imagen):Observable<any> {
    return this.http.post('/api/user/changeImage', {"id_usuario": id_usuario, "imagen": imagen});
  }

  getHistory(id_usuario):Observable<any> {
    return this.http.get('/api/history/' + id_usuario);
  }

  //WISHLIST
  getWishlist(id_usuario): Observable<any> {
    return this.http.get('/api/wishlist/' + id_usuario);
  }

  setWishlist(id_usuario, id_producto): Observable<any> {
    return this.http.post('/api/wishlist', {"id_usuario": id_usuario, "id_producto": id_producto});
  }

  deleteWishlist(id_usuario, id_producto): Observable<any> {
    return this.http.post('/api/wishlistDel', {"id_usuario": id_usuario, "id_producto": id_producto});
  }

  orderWishlist(wishlist, id_usuario): Observable<any> {
    return this.http.post('/api/wishlistOrder', {"wishlist": wishlist, "id_usuario": id_usuario});
  }

  //RATING 
  getRating(id_producto): Observable<any>{
    return this.http.get('/api/rating/' + id_producto);
  }

  setRating(id_producto, id_usuario, comentario, puntuacion){
    return this.http.post('/api/rating', {id_producto, id_usuario, comentario, puntuacion})
  }

  userComment(id_usuario, id_producto): Observable<any> {
    return this.http.post('/api/rating/check', {"id_usuario": id_usuario, "id_producto": id_producto});
  }
  

}
