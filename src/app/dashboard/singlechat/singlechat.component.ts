import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Registrationsection/service/user.service';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { messageInterface, userInterface } from 'src/app/types';

@Component({
  selector: 'app-singlechat',
  templateUrl: './singlechat.component.html',
  styleUrls: ['./singlechat.component.css']
})
export class SinglechatComponent implements OnInit {
  
  public id:any;
  public file:any="";
  public activeChate:any
  public activeChatUser:any=undefined;
  public imageSend:any="";
  public imageUpload:any=undefined;
  public messageForm: messageInterface = {
    message: '',
    sender: '',
    user: [],
    to: ""
  }
  // public imageUpload:boolean=false;

  constructor(private actR:ActivatedRoute,private userServices:UserService,private  rt:Router) { }

  ngOnInit(): void {
    if(window.screen.availWidth>700){
      this.rt.navigate(["dashboard"])
    }

    this.id=this.actR.snapshot.params["id"]
    console.log(this.id);
    this.userServices.getAllMessage();
    this.userServices.getAllUser();
    this.checkIfExist();

  }


  checkIfExist(){
    let allUsers=this.userServices.allUsers;
    if(allUsers!=undefined){
      let found=allUsers.find((user:any)=> user.id==this.id)
      if(found){
        this.activeChatUser=found;
      }else{
        this.rt.navigate(["dashboard"])
      }
    }
  }


  allmessages():any{
    let allmessages = this.userServices.allMessages;
    if (allmessages != undefined && this.activeChatUser != undefined && this.handleCurrentUser() != undefined) {
      let result = allmessages.filter((mes: any) => (mes.users.user1 == this.activeChatUser.id && mes.users.user2 == this.handleCurrentUser().id) || (mes.users.user2 == this.activeChatUser.id && mes.users.user1 == this.handleCurrentUser().id));
      let res = result.sort((a: any, b: any) => {
        return a.time.localeCompare(b.time);
      })
      return res
    } else {
      return undefined;
    }
  }


  SendImage =async()=>{
    let data={
      image:this.file,
      to: this.activeChatUser.id,
      time: new Date().toISOString()
    }
    let response=await this.userServices.SendImage(data);
    if(response.status){
      this.imageSend='';
      this.imageUpload=false;
      return
    }
    this.imageUpload=false;
    alert("failed to send");

  }


  Send = async()=>{
    let result = await this.userServices.HandleAddMessage(
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

  handleCurrentUser(){
    let current = this.userServices.currentUser;
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
