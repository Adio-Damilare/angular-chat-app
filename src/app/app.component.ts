import { Component, OnInit } from '@angular/core';
import { AppdirectryService } from './appdirectry.service';
import { UserService } from './Registrationsection/service/user.service';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'SecondApp';
  public num=5;
  public name:string ="hello";
  // public hideBar:boolean=true;
  

  public src:string="assets/logo.jpg"
  constructor(public appservices:AppdirectryService,private Router:Router){

  }




  ngOnInit():void{
   this.appservices.handleInitialiazeApp();
   if(localStorage["currentUserEmail"]){
    this.Router.navigate(['/dashboard'])
   }
  }


  changeNav(){
    return !! localStorage["currentUserEmail"];;
  }

  messages():number{
    let found:any
    this.appservices.messages.subscribe((item:any)=>{
      return  found=item
    })
   return  found.length;
  }

  HandleLogout(){
    localStorage.removeItem("currentUserEmail")
    window.location.reload();
    this.Router.navigate(["Login"])

  }

}

