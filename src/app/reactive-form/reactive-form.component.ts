import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../Registrationsection/service/user.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  constructor(public fb: FormBuilder, private userService: UserService) { };

  public friends: any = undefined;
  public message: string = '';
  ngOnInit(): void {
    this.userService.getAllUser();
    this.userService.HandleGetCurrentUser();
  }

  getCurrentUser = () => {
    let current = this.userService.currentUser
    if (current) {
      let { friends } = current;
      this.friends = friends;
    }
    return current
  }



  save = () => {
    let result: any = undefined;
    if (this.friends != undefined) {
      if (this.friends.length > 0) {
        result=this.userService.allUsers
        for (let i = 0; i < this.friends.length; i++) {
          result = result.filter((user: any) => user.id != this.friends[i])
        }
        return result
      } else {
        result = this.userService.allUsers
        return result
      }
      console.log(result)
    }
  }

  HandleAdd = async (item: any) => {
    let respomse = await this.userService.HandleAddFriend(item);
    this.message = respomse.message;
    console.log(respomse)
    if (!!respomse.status) {

    }

  }

}
