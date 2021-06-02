import { Component, OnInit } from '@angular/core';

import { APIDataService } from '../services/apidata.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartlist: Array<any> = [];
  //public datos: Array<any> = [];
  public all_total: number;



  constructor(private _apiDataService: APIDataService) { }

  ngOnInit(): void {
    
    this._apiDataService.getRequestDetails(localStorage.getItem('id')).subscribe(data=>{
      //this.datos = data;
      this.cartlist = [];
      this.all_total = 0;
      for(let i = 0; i < data.length; i++){
        let total = data[i].precio * data[i].cantidad;
        let temp = {
          "id_pedido": data[i].id_pedido,
          "id_producto": data[i].id_producto,
          "cantidad": data[i].cantidad,
          "nombre_producto": data[i].nombre_producto,
          "precio": Math.round(total* 100) / 100,
          "imagen": data[i].imagen,
        }
        this.cartlist.push(temp); 
      }

      for(let i = 0; i < this.cartlist.length; i++){
        this.all_total = this.all_total + this.cartlist[i].precio;
      }
      this.all_total = Math.round(this.all_total * 100) / 100;
      //this.all_total = this.all_total.toFixed(2);
    },
    error => {
      var errorMessage = error as any;
      console.log(errorMessage);
    })
  }

  updateCantidad(cantidad, id_pedido, id_producto){
    if(cantidad[1] == 'restar'){
      cantidad[0] = parseInt(cantidad[0]) - 1;
    } else {
      cantidad[0] = parseInt(cantidad[0]) + 1;
    }

    console.log("cantidad: " + cantidad + ", id pedido: " + id_pedido + ", id producto: " + id_producto)
    this._apiDataService.updateRequestGame(cantidad[0],id_pedido,id_producto).subscribe(data=>{
      console.log(data);
      this.ngOnInit();
    },
    error => {
      var errorMessage = error as any;
      console.log(errorMessage);
    });
    this.ngOnInit();
  }
   
  buyRequest(id_pedido){
    let id_usuario = localStorage.getItem('id');
    console.log("ID PEDIDO:" + id_pedido + ", ID USUARIO: " + id_usuario);

    this._apiDataService.newRequest(id_pedido, id_usuario).subscribe(data=>{
      this.ngOnInit();
    });
  }
}
