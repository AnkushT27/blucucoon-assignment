import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(`http://ec2-18-188-206-136.us-east-2.compute.amazonaws.com:3000/testapp`);
  }
}
