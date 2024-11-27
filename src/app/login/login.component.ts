import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../service/userservice.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    public route:Router,
    public userserve:UserserviceService
  ){}

  public email = '';
  public password = '';
  public msg = '';
  public userArray:any[] = [];

  ngOnInit(){
    if(localStorage['allUsers']){
      this.userArray = JSON.parse(localStorage.getItem('allUsers')!);
      console.log(this.userArray); 
    }
  }

  login(){
    let checkUser = this.userArray.find((user:any, index:number) => user.email == this.email && user.password == this.password);

    if (checkUser){
      console.log("user found", checkUser);
      this.userserve.setCurrentUser(checkUser);
      this.route.navigate(['/dashboard']);
    } else {
      this.msg = 'Incorrect email or password';
      console.log(checkUser);
    }
  }
}
