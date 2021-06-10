import { Component, OnInit } from '@angular/core';
import { APIDataService } from "../services/apidata.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user_id: string;
  public user_info: any;
  public image: string;
  private info: any;

  constructor(private _apiDataService: APIDataService) { }

  ngOnInit(): void {
    this.user_id = localStorage.getItem('id');
    this._apiDataService.getUserById(this.user_id).subscribe(data => {
      this.user_info = data;
    })
  }

  changeImage(){
    console.log("IMAGEN" +this.image)
    this._apiDataService.changeImage(this.user_id, this.image).subscribe(data => {
      this.info = data;
    })

    window.location.reload();

  }
}
