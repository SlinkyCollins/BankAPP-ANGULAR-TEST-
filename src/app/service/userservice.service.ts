import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor() { }

  public userArray:any[] = JSON.parse(localStorage.getItem('allUsers')!) || [];

  public currentUser = JSON.parse(localStorage.getItem('currentUser')!) || null;  

  setCurrentUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  clearCurrentUser() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}
