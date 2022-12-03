import { Injectable } from '@angular/core';
import { Loginform, Registerform } from 'src/app/types';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { AppdirectryService } from 'src/app/appdirectry.service';
import { collection, addDoc, query, onSnapshot, doc, QuerySnapshot, getDocs, updateDoc, where } from 'firebase/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private database: AppdirectryService, private http: HttpClient, private Route: Router) { };

  // variables
  public auth: any = getAuth();
  public currentUser: any = undefined;
  public UserDatabaseRef: any = collection(this.database.dataBase, "users");
  public allUsers: any = undefined;
  public allMessages: any = undefined;



  // Functions
  HandleRegister = async (form: Registerform) => {
    let response = await createUserWithEmailAndPassword(this.auth, form.email, form.password).then(async (credential: any) => {
      let result = await addDoc(this.UserDatabaseRef, {
        username: form.userName,
        email: form.email,
        friends: [],
        profilePicture: "https://firebasestorage.googleapis.com/v0/b/angular-first-project-39448.appspot.com/o/istockphoto-1300845620-612x612.jpg?alt=media&token=2920db0e-1fc2-480b-9746-7e06d7c15721",
      }).then(async (res: any) => {
        localStorage["currentUserEmail"] = JSON.stringify(res.id);
        return { message: "register successfully", status: true };
      }).catch((error) => {
        return { message: error.message, status: false };
      })
      return result;
    }).catch((error) => {
      // console.log(error.message)
      return { message: error.message, status: false }
    })
    return response;
  }




  HandleLogin = async (form: Loginform) => {
    let response = await signInWithEmailAndPassword(this.auth, form.email, form.password).then(async (userCredential: any) => {
      let email = (userCredential.user.email)
      let q = query(this.UserDatabaseRef, where('email', '==', email))
      let respon = await getDocs(q).then((res) => {
        res.forEach((doc) => {
          localStorage["currentUserEmail"] = JSON.stringify(doc.id);
        })
        return { message: "successfully Login", status: true }
      }).catch((error) => {
        return { message: "Login Failed", status: false };
      });
      return respon;
    }).catch((error) => {
      return { message: error.message, status: false }
    })
    return response
  }







  uploadImage = async (image: any) => {
    let imageRef = ref(this.database.storage, `profilepic/${image.image.name + Math.random() * 10000}${image.user}`);
    let response = await uploadBytes(imageRef, image.image).then(async (snapShot) => {
      let res = await getDownloadURL(snapShot.ref).then(async (url) => {
        let userId = JSON.parse(localStorage["currentUserEmail"]);
        let resp = await updateDoc(doc(this.database.dataBase, "users", userId), { profilePicture: url }).then((res) => {
          return { message: "Upload successfully", status: true };
        }).catch((error) => { return { message: error.message, status: false } });
        return resp;
      }).catch(error => { return { message: error.message, status: false } });
      return res;
    }).catch(error => { return { message: error.message, status: false } });
    return response;
  };




  getAllUser = async () => {
    let result: any = [];
    let q = query(this.UserDatabaseRef);
    let userId = JSON.parse(localStorage["currentUserEmail"]);
    let response = await getDocs(q)
    response.forEach((ans: any) => {
      result.push({ ...ans.data(), id: ans.id })
    })
    this.allUsers = result.filter((res: any) => res.id != userId);
    return result
  }





  HandleGetCurrentUser = async () => {
    let q = query(this.UserDatabaseRef);
    let userId = JSON.parse(localStorage["currentUserEmail"]);
    let response = await getDocs(q).then(async (res: any) => {
      let all: any = []
      res.forEach((ans: any) => {
        all.push({ ...ans?.data(), id: ans.id })
      })
      let found = all.find((user: any) => user.id == userId);
      if (!!found) {
        return { user: found, status: true }
      } else {
        this.Route.navigate(["/Login"])
        localStorage.removeItem("currentUserEmail")
        return { user: "", status: false }
      }
    }).catch((error) => {
      return { status: false, user: "" }
    })
    if (response.status) {
      this.currentUser = response.user;
    }
    return response;
  }


  HandleAddFriend = async (id: any) => {
    let friends = [...this.currentUser.friends, id]
    const q = doc(this.database.dataBase, "users", this.currentUser.id)
    let response = await updateDoc(q, { friends: friends }).then((res: any) => {
      this.currentUser = { ...this.currentUser, friends };
      return { message: "Add Successfully", status: true };
    }).catch((error) => {
      return { message: "Failed to addd friend", status: false };
    })
    return response;
  }




  HandleAddMessage = async (form: any) => {
    let data: any = {}
    if (form.message) {
      data = { message: form.message, from: this.currentUser.id, users: { user1: this.currentUser.id, user2: form.to }, time: form.time };
    } else {
      data = { image: form.image, from: this.currentUser.id, users: { user1: this.currentUser.id, user2: form.to }, time: form.time };
    }
    data[`viewBy${form.to}`] = false;
    let result = await addDoc(collection(this.database.dataBase, "messages"), data).then((res: any) => {
      return { message: "successfully send", status: true }
    }).catch((error: any) => {
      alert(error.message)
      return { message: "failed to send message", status: false }
    })

    return result;
  }

  ViewMessage = async (form: any) => {

    let data: any={};
    data[`viewBy${form.userId}`] = true;
    console.log(form.messageId);
    let resp = await updateDoc(doc(this.database.dataBase,"messages",form.messageId),{...data}).then((res) => {
      return { message: "successfully", status: true };
    }).catch((error:any) => {
      return { message: "falied", status: false }

    })

    return resp;
  }

  SendImage = async (image: any) => {
    let imageRef = ref(this.database.storage, `messages/${image.image.name + Math.random() * 10000}${image.user}`);
    let response = await uploadBytes(imageRef, image.image).then(async (snapShot) => {
      let resp = await getDownloadURL(snapShot.ref).then(async (url) => {
        let data = {
          image: url,
          to: image.to,
          time: image.time
        }
        let res = await this.HandleAddMessage(data)
        return res

      }).catch((error) => {
        alert(error.message)
        return { message: "failed", status: false }
      })
      return resp
    }).catch((error) => {
      alert(error.message)
      return { message: "failed", status: false }
    })
    return response;

  }

  public q: any = query(collection(this.database.dataBase, "messages"))
  getAllMessage = () => onSnapshot(this.q, (snapshot: any) => {
    let allmes: any = []
    snapshot.forEach((items: any) => {
      let result = { ...items.data(), id: items.id, fromSelf: items.data().from == this.currentUser.id }
      allmes = [...allmes, result]

    })
    this.allMessages = allmes;
    return this.allMessages;
  })
}
