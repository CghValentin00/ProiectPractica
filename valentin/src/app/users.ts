import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Users {
  private apiUrl = 'https://localhost:7277';

  constructor(private http: HttpClient) { }
}
