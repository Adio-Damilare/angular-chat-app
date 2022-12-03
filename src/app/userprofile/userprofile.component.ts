import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  public name:string="";
  public user:any=undefined;

  constructor( private act:ActivatedRoute,private userService:ApiService) { }

  ngOnInit(): void {
  }
  // this.name=this.act.snapshot.params["user"]
  // this.userService.getSingleUser(this.name).subscribe(data=>{
  //   this.user=data;
  //   console.log(data)
  // },error=>console.log(error.message))

}
