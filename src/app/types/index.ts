export interface user {
    firstName:string,
    lastName:string,
    email:string,
    password:string
    }
    
export interface Loginform{
    email:string,
    password:string
  }

export interface Registerform{
    userName:string,
    email:string,
    password:string,
    confirmPassword:string,
    avatar:string
  }

  
export interface messageInterface{
  message:string,
  sender:string,
  user:any,
  to:string
}

export interface userInterface{
  username:string,
  profilePicture:string,
}