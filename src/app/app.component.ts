import { Component } from '@angular/core';
import { AuthenticationService } from './auth.service';
import{Http} from '@angular/http'
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
 
  
  constructor(private authenticationservice:AuthenticationService, private http:HttpClient)
  {
    
    this.authenticationservice.login();
    
   
  
}




}