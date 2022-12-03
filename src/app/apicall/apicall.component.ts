import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-apicall',
  templateUrl: './apicall.component.html',
  styleUrls: ['./apicall.component.css']
})
export class ApicallComponent implements OnInit {

  constructor(private apiservice:ApiService) { }

  public users:any=[];

  ngOnInit(): void {
  }
  
  // this.apiservice.getApiUsers().subscribe(data=>{
  //   console.log(data);
  //   this.users=data
  // },error=>console.log(error.message))
}
