import { Component, OnInit } from '@angular/core';
import { APIDataService } from "../services/apidata.service";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  public id: number;
  public wishlist: Array<any> = [];

  constructor(private _apiDataService: APIDataService) { }

  ngOnInit(): void {
    this.wishlist = [];
    this.id = parseInt(localStorage.getItem('id'));
    this._apiDataService.getWishlist(this.id).subscribe(data => {
      for(let i = 0; i < data.length; i++){

        let temp = {
          "nombre_producto": data[i].nombre_producto,
          "imagen": data[i].imagen
        }
        this.wishlist.push(temp); 
      }
      this.wishlist = data;
    })
  }

  onDropped(event: CdkDragDrop<any>){
    console.log(event);
    const anterior = event.previousIndex;
    const actual = event.currentIndex;

    moveItemInArray(this.wishlist, anterior, actual);
  }

}
