import { Component, OnInit } from '@angular/core';
import { Registerform } from 'src/app/types';
import { UserService } from '../service/user.service';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService, private Rt: Router) { };

  public loading: Boolean = false;
  public setAvatar: Boolean = true;
  public message: string = "";
  public avatarArray: any = []
  public src: any = "";
  public file: any;
  public Form: Registerform = {
    userName: "",
    email: "",
    password: '',
    confirmPassword: "",
    avatar: ""
  }

  ngOnInit(): void {


  }

  HandleSubmit = async () => {
    this.loading = true;
    let result = await this.userService.HandleRegister(this.Form)
    this.message = result.message;
    if (!!result.status) {
      this.message='',
      this.setAvatar = false;
    } else {

    }
    this.loading = false;
  }


  handle(e: any) {
    this.file = (e.target.files[0]);
    let reader = new FileReader()
    reader.readAsDataURL(this.file)
    reader.onload = () => {
      this.src = (reader.result)
    }
  }

  HandleClickAvatar = async () => {
    this.loading=true;
    let image = {
      image: this.file,
      user: this.Form.userName,
    }
    let result = await this.userService.uploadImage(image);
    this.message=result.message;
    if(result.status){
      this.setAvatar = true;
      this.Rt.navigate(['/']);
    }else{
      this.src="";
    }
    this.loading=false;
    
  }



}
