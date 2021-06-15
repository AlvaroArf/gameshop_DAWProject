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

  constructor(private _apiDataService: APIDataService) { }

  ngOnInit(): void {
    this.id_user = localStorage.getItem('id');
    this._apiDataService.getRequest(this.id_user).subscribe(data => {
      this.pedidos = data;
      for(let p = 0; p < this.pedidos.length; p++){
        this._apiDataService.getHistory(this.pedidos[p]['id_pedido']).subscribe(data => {
          this.products.push(data);
        })
      }
    })
  }
}
