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
    this.data =this.url + "/api/products";
    return this.http.get(this.data);
  }
  
  getProduct(id:number): Observable<any>{
    this.data = this.url + "/api/product/" + id;

    return this.http.get(this.data);
  }
  
  getProductsByCategory(id): Observable<any>{
    this.data = this.url + "/api/products/" + id;
    return this.http.get(this.data);
  }

  setProduct(product) {
    return this.http.post(this.url + '/api/product', {"name": product.nombre, "desc": product.descripcion, 
                                          "price": product.precio, "stock": product.stock,
                                          "image": product.imagen, "id_category": product.categoria})
  }

  updateProduct(product) {
    return this.http.put(this.url + '/api/product', {"id_producto": product.id, "stock": product.stock, "precio": product.precio})
  }

  deleteProduct(id_producto) {
    return this.http.delete(this.url + '/api/product/' + id_producto);
  }

  searchProduct(busqueda): Observable<any> {
    return this.http.post(this.url + '/api/product/search', {"busqueda": busqueda});
  }

  updateStock(id_producto, stock) {
    return this.http.post(this.url + '/api/product/stock', {"id_producto": id_producto, "stock": stock});
  }

  //CATEGORIES
  getCategories(): Observable<any>{
    this.data = this.url + "/api/categories";

    return this.http.get(this.data);
  }

  setCategory(category): Observable<any> {
    return this.http.post(this.url + '/api/category', {"nombre_categoria": category.nombre, 
                                            "descripcion_categoria": category.descripcion});
  }

  updateCategory(category): Observable<any> {
    return this.http.put(this.url + '/api/category', {"id_categoria": category.id,
                                          "nombre_categoria": category.nombre, 
                                          "descripcion_categoria": category.descripcion})
  }

  deleteCategory(id_categoria): Observable<any> {
    return this.http.delete(this.url + '/api/category/' + id_categoria);
  }
  

  //CART
  getRequestDetails(id_usuario):Observable<any>{
    return this.http.get(this.url + "/api/cart/" + id_usuario);
  }

  setRequestGame(id_usuario, id_producto): Observable<any>
  {
    return this.http.post(this.url + "/api/cart", {"id_usuario": id_usuario, "id_producto": id_producto});
  };
  
  productExist(id_usuario, id_producto): Observable<any>
  {
    return this.http.post(this.url + "/api/cartExist", {"id_usuario": id_usuario, "id_producto": id_producto});
  }

  updateRequestGame(cantidad, id_pedido, id_producto):Observable<any>{
    return this.http.post(this.url + "/api/cartUpdate", {"cantidad": cantidad, "id_pedido": id_pedido, "id_producto": id_producto});
  }

  updateRequestGame2(id_usuario, id_producto){
    return this.http.post(this.url + "/api/cartUpdate", {"id_usuario": id_usuario, "id_producto": id_producto});
  }

  newRequest(id_pedido, id_usuario):Observable<any>{
    return this.http.post(this.url + "/api/newRequest", {"id_pedido": id_pedido, "id_usuario": id_usuario});
  }
    
  getAmount(id_usuario, id_producto): Observable<any> {
    return this.http.post(this.url + '/api/request/amount', {"id_usuario": id_usuario, "id_producto": id_producto})
  }

  //USER
  getUsers() {
    return this.http.get(this.url + '/api/users');
  }

  setUser(user) {
    return this.http.post(this.url + '/api/user', {"email": user.email, "password": user.password, 
                                        "nombre": user.nombre, "apellidos": user.apellidos, 
                                        "direccion": user.direccion, "admin": user.admin})
  }

  updateUser(user) {
    console.log("API"  +user.id_usuario);
    return this.http.put(this.url + '/api/user', {"id_usuario": user.id, "nombre": user.nombre, 
                                      "apellidos": user.apellidos,"email": user.email,
                                      "admin": user.admin});
  }

  deleteUser(id_user) {
    return this.http.delete(this.url + '/api/user/' + id_user);
  }

  findUser(email) {
    return this.http.post<any>(this.url + '/api/findUser', {"email": email});
  }

  getUserById(id_usuario) {
    return this.http.get(this.url + '/api/user/' + id_usuario);
  }

  changeImage(id_usuario, imagen):Observable<any> {
    return this.http.post(this.url + '/api/user/changeImage', {"id_usuario": id_usuario, "imagen": imagen});
  }

  updateVerification(id_usuario): Observable<any> {
    return this.http.get(this.url + '/api/user/verify/' + id_usuario);
  }

  checkConfirm(id_usuario): Observable<any> {
    return this.http.get(this.url + '/api/userCheck/' + id_usuario);
  }


  //WISHLIST
  getWishlist(id_usuario): Observable<any> {
    return this.http.get(this.url + '/api/wishlist/' + id_usuario);
  }

  setWishlist(id_usuario, id_producto): Observable<any> {
    return this.http.post(this.url + '/api/wishlist', {"id_usuario": id_usuario, "id_producto": id_producto});
  }

  deleteWishlist(id_usuario, id_producto): Observable<any> {
    return this.http.post(this.url + '/api/wishlistDel', {"id_usuario": id_usuario, "id_producto": id_producto});
  }

  orderWishlist(wishlist, id_usuario): Observable<any> {
    return this.http.post(this.url + '/api/wishlistOrder', {"wishlist": wishlist, "id_usuario": id_usuario});
  }

  //RATING 
  getRating(id_producto): Observable<any>{
    return this.http.get(this.url + '/api/rating/' + id_producto);
  }

  setRating(id_producto, id_usuario, comentario, puntuacion){
    return this.http.post(this.url + '/api/rating', {id_producto, id_usuario, comentario, puntuacion})
  }

  userComment(id_usuario, id_producto): Observable<any> {
    return this.http.post(this.url + '/api/rating/check', {"id_usuario": id_usuario, "id_producto": id_producto});
  }
  
  //HISTORY
  getRequest(id_usuario): Observable<any> {
    return this.http.get(this.url + '/api/request/' + id_usuario);
  }

  getHistory(id_pedido):Observable<any> {
    return this.http.get(this.url + '/api/history/' + id_pedido);
  }

  changeStatus(status, id_pedido, id_producto):Observable<any> {
    return this.http.post(this.url + '/api/request/change', {"status": status, 
                                                  "id_pedido": id_pedido, 
                                                  "id_producto": id_producto})
  }
}
