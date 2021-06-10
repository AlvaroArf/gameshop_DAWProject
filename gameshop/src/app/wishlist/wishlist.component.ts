import { Component, OnInit, OnDestroy } from '@angular/core';
import { APIDataService } from "../services/apidata.service";
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit, OnDestroy {

  public id_user: number;
  public wishlist: Array<any> = [];
  private info: any;

  constructor(private _apiDataService: APIDataService) { }

  ngOnInit(): void {
    this.wishlist = [];
    this.id_user = parseInt(localStorage.getItem('id'));
    this._apiDataService.getWishlist(this.id_user).subscribe(data => {
      this.wishlist = data;
    })
  }

  onDropped(event: CdkDragDrop<any>){
    console.log(event);
    const anterior = event.previousIndex;
    const actual = event.currentIndex;

    moveItemInArray(this.wishlist, anterior, actual);
  }

  delWishlist(id_producto) {
    this._apiDataService.deleteWishlist(this.id_user, id_producto).subscribe(data => {
      this.info = data;
    })
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this._apiDataService.orderWishlist(this.wishlist, this.id_user).subscribe(data => {
      this.info = data;
    })
  }
}
