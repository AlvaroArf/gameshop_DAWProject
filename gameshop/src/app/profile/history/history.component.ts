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

    //TEST DE FECHA
    var fechaInicio = new Date('2021-06-15T22:00:00.000Z').getTime();
    var fechaFin    = new Date('2021-06-14T22:00:00.000Z').getTime();
    var diff = fechaFin - fechaInicio;
    console.log("TEST DE FECHA: " + diff/(1000*60*60*24) );
    //FIN DE TEST
  }

  getContent() {
    this._apiDataService.getRequest(this.id_user).subscribe(data => {
      //console.log(data[0])
      //let fecha = new Date(data[0]['fecha']);
      //console.log(fecha);
      this.pedidos = data;
      for(let p = 0; p < this.pedidos.length; p++){
        let total =  0;
        this._apiDataService.getHistory(this.pedidos[p]['id_pedido']).subscribe(data => {
          console.log(data[1]);
          this.products.push(data);
        })
      }
    })
  }

  changeStatus(fecha, id_pedido, id_producto) {
    var fecha_pedido = new Date(fecha).getTime();
    console.log("FECHA DEL PEDIDO: " + fecha_pedido);
    let fecha_hoy = new Date();
    let fecha_hoy_up = fecha_hoy.setHours(0,0,0,0);
    console.log("FECHA DE HOY: " + fecha_hoy)
    let diff = fecha_hoy_up - fecha_pedido;
    console.log("DIFERENCIA DE DIAS: " + diff)
    this._apiDataService.changeStatus(true, id_pedido, id_producto).subscribe(data => {
      this.info = data;
    })
    this.getContent();
  }
}
