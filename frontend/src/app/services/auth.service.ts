import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   apiUrl:string = 'http://localhost:8080/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response.success) {       
          // Store JWT token in local storage
          localStorage.setItem('jwtToken', response.data.token);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  signup(username: string, mobile: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, mobile, email, password }).pipe(
      map(response => {
        if (response.success) {
          return true;
        }else{
         return false;
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwtToken'); // Check if JWT token exists
  }

  logout(): void {
    localStorage.removeItem('jwtToken'); // Remove JWT token from local storage
  }
}
