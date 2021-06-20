import { Component, OnInit } from '@angular/core';
import { APIDataService } from '../../services/apidata.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  public info: any;

  constructor(private _apiDataService: APIDataService, private _router: ActivatedRoute) { }

  ngOnInit(): void {
    let id_user = this._router.snapshot.paramMap.get('id');
    console.log("USUARIO ID :" + id_user  );
    this._apiDataService.updateVerification(parseInt(id_user)).subscribe(data => {
      this.info = data;
    })
  }

}
