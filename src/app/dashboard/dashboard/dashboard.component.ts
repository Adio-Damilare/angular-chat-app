import { ViewportScroller } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Registrationsection/service/user.service';
import { messageInterface, userInterface } from 'src/app/types';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { NgxSpinnerService } from 'ngx-spinner';
// import Typewriter from "t-writer.js"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService,private Rt:Router,private spinner:NgxSpinnerService) { }

  public messageForm: messageInterface = {
    message: '',
    sender: '',
    user: [],
    to: ""
  }
  public imageUpload:boolean=false;
  public imageSend:any='';


  public activeChatUser: any = undefined;
  public mounseoverIt: boolean = true;
  public numb: any = undefined;
  public file:any="";

  public friends: any = undefined;
  ngOnInit(): void {
    this.userService.getAllUser()
    this.userService.HandleGetCurrentUser();
    this.userService.getAllMessage();
    this.spinner.show()
   
  }



  Send = async () => {
    let result = await this.userService.HandleAddMessage(
      {
        message: this.messageForm.message,
        to: this.activeChatUser.id,
        time: new Date().toISOString()
      }
    )
    if(result.status){
      this.messageForm['message']=''
      return
    }
    alert("failed to send message")
  }

  SendImage =async()=>{
    let data={
      image:this.file,
      to: this.activeChatUser.id,
      time: new Date().toISOString()
    }
    let response=await this.userService.SendImage(data);
    if(response.status){
      this.imageSend='';
      this.imageUpload=false;
      return
    }
    this.imageUpload=false;
    alert("failed to send");

  }

  recievemessage = (e: userInterface) => {
    this.activeChatUser = e;
    this.imageUpload=false
  }

  allmessages() {
    let allmessages = this.userService.allMessages;
    if (allmessages != undefined && this.activeChatUser != undefined && this.handleCurrentUser() != undefined) {
      let result = allmessages.filter((mes: any) => (mes.users.user1 == this.activeChatUser.id && mes.users.user2 == this.handleCurrentUser().id) || (mes.users.user2 == this.activeChatUser.id && mes.users.user1 == this.handleCurrentUser().id));
      let res = result.sort((a: any, b: any) => {
        return a.time.localeCompare(b.time);
      })
      this.spinner.hide();
      return res
    } else {
      return undefined;
    }
  }



  HandleFriends() {
    return this.userService.allUsers
  }



  handleCurrentUser() {
    let current = this.userService.currentUser;
    if (current) {
      let { friends } = current;
      if(friends.length==0){
        this.Rt.navigate(["/"])
      }
      this.friends = friends;
    }
    return current;

  }

  


  InputImage(event:any){
    const file=event.target.files[0];
    const fileReader=new FileReader();
    this.file=file;
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
     this.imageSend=fileReader.result;
     this.imageUpload=true;
    }

  }

  setindex(e: any) {
    this.numb = e;
  }



  TimeAgo=(e:any)=>{
    const date:any=parseISO(e)
    let timeStamp:any=formatDistanceToNow(date);
    // less than a minute === just now
    if(timeStamp=="less than a minute")return "just now";

      //  1minute ==1m ago
    if(timeStamp.substring(timeStamp.length-2)=="te") return `${timeStamp.substring(0,timeStamp.length-7)}min ago`;

    //   2 minutes and above == 2 or any number ms ago
    if(timeStamp.substring(timeStamp.length-2)=="es") return `${timeStamp.substring(0,timeStamp.length-8)}mins ago`;

    // If the time is up hour it we add about at front of the time. remove `About` from the time it will just return the time 
    if(timeStamp.substring(0,5)=="about")  timeStamp=timeStamp.substring(5);
     
    //  changing the time from  Hour to hr ago;
    if(timeStamp.substring(timeStamp.length-2)=="ur") return timeStamp=`${timeStamp.substring(0,timeStamp.length-5)}hr`;

    //  changing the time from hours to hrs ago;
    if(timeStamp.substring(timeStamp.length-2)=="rs")  return timeStamp=`${timeStamp.substring(0,timeStamp.length-6)}hrs ago`;

    return `${timeStamp} ago `
}

}

// 15.0.1, 
// ng install @angular/material@15.0.1
