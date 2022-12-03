import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {

  }

 
  // getApiUsers() {
  //   return this.http.get<any>(this.baseUrl)
  // }

  // getSingleUser(user:any){
  //   return this.http.get<any>(`${this.baseUrl}/${user}`)
  // }
}
