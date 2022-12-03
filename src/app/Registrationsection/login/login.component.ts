import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loginform } from 'src/app/types';
import { UserService } from '../service/user.service';
import { parseISO,formatDistanceToNow } from 'date-fns';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loading: boolean = false;
  public message:string="";
  public Form: Loginform = {
    email: "",
    password: "",
  }
  constructor(private userservice: UserService, private Route: Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show()
  }

  HandleLogin=async()=> {
    this.loading=true
    let result=await this.userservice.HandleLogin(this.Form);
    this.message=result.message;
    console.log(this.message);
    if(result.status){
      this.Route.navigate(['/dashboard'])
    }else{

    }
    this.loading=false;
    this.ClearAlertMessage();

  }
  
  ClearAlertMessage=()=>{
    let index=0;
    let timeOut=setInterval(()=>{
      if(index==20){
        clearInterval(timeOut)
        this.message='';
      }else{
        index++
      }
    },1000)

  }


//   TimeAgo=(e:any)=>{
//     const date:any=parseISO(e)
//     let timeStamp:any=formatDistanceToNow(date);
//     // less than a minute === just now
//     if(timeStamp=="less than a minute")return "just now";

//       //  1minute ==1m ago
//     if(timeStamp.substring(timeStamp.length-2)=="te") return `${timeStamp.substring(0,timeStamp.length-7)}min ago`;

//     //   2 minutes and above == 2 or any number ms ago
//     if(timeStamp.substring(timeStamp.length-2)=="es") return `${timeStamp.substring(0,timeStamp.length-8)}mins ago`;

//     // If the time is up hour it we add about at front of the time. remove `About` from the time it will just return the time 
//     if(timeStamp.substring(0,5)=="about")  timeStamp=timeStamp.substring(5);
     
//     //  changing the time from  Hour to hr ago;
//     if(timeStamp.substring(timeStamp.length-2)=="ur") return timeStamp=`${timeStamp.substring(0,timeStamp.length-5)}hr`;

//     //  changing the time from hours to hrs ago;
//     if(timeStamp.substring(timeStamp.length-2)=="rs")  return timeStamp=`${timeStamp.substring(0,timeStamp.length-6)}hrs ago`;

//     return `${timeStamp} ago `
// }

}
