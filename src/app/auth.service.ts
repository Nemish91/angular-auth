import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{Http, RequestOptions} from '@angular/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URLSearchParams,Response } from '@angular/http';
import { headersToString } from 'selenium-webdriver/http';
import { ContentType } from '@angular/http/src/enums';


@Injectable()
export class AuthenticationService {
    constructor(private http: Http, private http1:HttpClient) { }
    username:string = 'Admin';
    password:string='livelink';  
    
    login() 
    {
        console.log("Inside Login");
        localStorage.removeItem('currentUser');
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('Username', this.username);
        urlSearchParams.append('Password', this.password);
        console.log (this.username,this.password);
          this.http.post('http://localhost/otcs/cs.exe/api/v1/auth',urlSearchParams)
            .subscribe((res:Response) => 
            {
                console.log("Subscribing !");
                // login successful if there's a jwt token in the response
                if (res) {
                    const data = res.json();
            
                    console.log("Token Generated From Authentication = "  +data['ticket']);
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    
                    localStorage.setItem('currentUser', JSON.stringify({  ticket: data.ticket }));
                    this.getReportData();
                }
            });
            
            
    }

    public getReportData() {
        console.log("Inside getReportData");
        //let options:HttpHeaders = Headers.arguments(ContentType,'application/x-www-form-urlencoded');
        
        this.http1.get('http://localhost/otcs/cs.exe/api/v1/nodes/16236/output')
          .subscribe(
            data => console.log(data),
            err => console.log(err)
          );
      }

    public getToken() {
        
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser)
        {
        console.log("Token Genereated from getToken() = ", currentUser['ticket'])//done for debugging
        return currentUser['ticket'];
        }
        else 
        {
         console.log("No Token Found in localStorage")  ;
        return null;
        }
        
}


}