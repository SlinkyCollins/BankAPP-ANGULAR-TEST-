import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(public route:Router){}

  public firstname = '';
  public lastname ='';
  public email = '';
  public password = '';
  public phoneNumber = '';
  public accountType:any;
  public availableBalance:number = 0;
  public isChecked:boolean=false ;
  public msg = ''
  public userArray:any[] = [];

  ngOnInit(){
    if(localStorage['allUsers']){
      this.userArray = JSON.parse(localStorage.getItem('allUsers')!);
      console.log(this.userArray);
    }
  }

  signup(){
    let userObj = {
      firstname : this.firstname,
      lastname : this.lastname,
      email : this.email,
      password : this.password,
      phoneNumber : this.phoneNumber,
      accountType : this.accountType,
      checked : this.isChecked,
      balance: this.availableBalance
    }

    let userCheck = this.userArray.findIndex((user:any, index:number) => user.email == this.email)
    
    console.log(userCheck);

    if (userCheck !== -1) {
      console.log('User already exists');
      this.msg = 'User already exists';
    } else {
      this.userArray.push(userObj);
      localStorage.setItem('allUsers', JSON.stringify(this.userArray));
      this.route.navigate(['/login']);
    }





    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.password = '';
    this.phoneNumber = '';
    this.isChecked = false;
  }
}
