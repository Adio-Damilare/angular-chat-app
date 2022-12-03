import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/Registrationsection/service/user.service';
import { userInterface } from 'src/app/types';
import {AppdirectryService} from "src/app/appdirectry.service"

@Component({
  selector: 'app-singleuser',
  templateUrl: './singleuser.component.html',
  styleUrls: ['./singleuser.component.css']
})
export class SingleuserComponent implements OnInit {
  @Input() user: any;
  @Input() numb: any;
  @Input() index: any;
  @Output() sendMessage: any = new EventEmitter<any>();
  @Output() sendIndex: any = new EventEmitter<any>();
  public array:any=[3,3,3,4,5]
  constructor(private userService: UserService, private AppService:AppdirectryService) {
    

  };


  public profile: any = {};

  ngOnInit(): void {
    this.profile = this.userService.allUsers.find((user: any) => user.id == this.user)

  }

  send = async () => {
    this.sendMessage.emit(this.profile);
    this.sendIndex.emit(this.index)
    this.AppService.removeUnreadMessages(this.profile.id)
    for(let i=0;i<this.UnReadMessage().length;i++){
      let data:any={
        userId:this.handleCurrentUser(),
        messageId:this.UnReadMessage()[i].id,
      }
      let result= await this.userService.ViewMessage(data)
      if(!result.status){
        break;
      }
    }
  };


  handleCurrentUser() {
    let current = this.userService.currentUser.id;
    return current;

  }

  UnReadMessage() {
    let allmessages = this.userService.allMessages;
    if(allmessages !=undefined){
      let result = allmessages.filter((mes: any) => ((mes.users.user1 == this.profile.id && mes.users.user2 == this.handleCurrentUser()) || (mes.users.user2 == this.profile.id && mes.users.user1 == this.handleCurrentUser())) && mes.from != this.handleCurrentUser());
      let res = result.filter((mes: any) => mes?.[`viewBy${this.handleCurrentUser()}`] == false);
      if(res.length>0){
        this.AppService.unreadMessages({id:this.profile.id,})
      }
      return res;
    }
    return[]
  }

}
