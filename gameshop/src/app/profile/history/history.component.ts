import { Component, OnInit } from '@angular/core';
import { APIDataService } from "../../services/apidata.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  public id_user: string;
  public products: Array<any> = [];
  public pedidos:  Array<any> = [];
  private info: any;


  constructor(private _apiDataService: APIDataService) { }
  
  ngOnInit(): void {
    this.id_user = localStorage.getItem('id');
    this.getContent();
  }

  getContent() {
    this._apiDataService.getRequest(this.id_user).subscribe(data => {
      this.pedidos = data;
      for(let p = 0; p < this.pedidos.length; p++){
        this._apiDataService.getHistory(this.pedidos[p]['id_pedido']).subscribe(data => {
          this.products.push(data);
        })
      }
    })
  }

  changeStatus(stock, cantidad, id_pedido, id_producto) {
    this._apiDataService.changeStatus(true, id_pedido, id_producto).subscribe(data => {
      this.info = data;
    })
    let new_stock = parseInt(stock) + parseInt(cantidad);
    this._apiDataService.updateStock(id_producto, new_stock).subscribe(data => {
      this.info = data;
    })
    this.getContent();
  }

  isSended(fecha) {
    var fecha_pedido = new Date(fecha).getTime();
    let fecha_hoy = new Date();
    let fecha_hoy_up = fecha_hoy.setHours(0,0,0,0);
    let diff = fecha_hoy_up - fecha_pedido;
    let dias_diff = diff/(1000*60*60*24);
    if( dias_diff >= 2 ) {
      return true
    } 
    return false
  }

  canReturnOrder(fecha) {
    var fecha_pedido = new Date(fecha).getTime();
    let fecha_hoy = new Date();
    let fecha_hoy_up = fecha_hoy.setHours(0,0,0,0);
    let diff = fecha_hoy_up - fecha_pedido;
    let dias_diff = diff/(1000*60*60*24);
    if( dias_diff < 15 ) {
      return true
    } 
    return false
  }
}