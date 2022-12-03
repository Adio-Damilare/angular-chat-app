import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.json';
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import { BehaviorSubject } from 'rxjs';


interface Unreadmesssage{
 id:string,
}

@Injectable({
  providedIn: 'root'
})
export class AppdirectryService {
  public dataBase:any;
  public storage:any;
  public messages:BehaviorSubject<any>= new  BehaviorSubject<any>([])
  constructor() { }
  handleInitialiazeApp(){
    let app=initializeApp(firebaseConfig);
    this.handleDatabase(app);
    this.handleStorage(app);
  }



  handleDatabase(app:any){
    this.dataBase=getFirestore(app)
  }
  handleStorage=(app:any)=>{
    this.storage=getStorage(app)
  }   

  unreadMessages=(value:Unreadmesssage)=>{
    let found:any;
    this.messages.subscribe((value:any)=>{
      found=value;
    })
    let find = found.find((item:any)=>item.id==value.id);
    if(!find) found.push(value);
    this.messages.next(found)
    return
  }

  removeUnreadMessages(value:string){
    let found:any;
    this.messages.subscribe((value:any)=>{
      found=value;
    })
    found= found.filter((item:any)=>item.id!=value);
    this.messages.next(found)
  }

}
