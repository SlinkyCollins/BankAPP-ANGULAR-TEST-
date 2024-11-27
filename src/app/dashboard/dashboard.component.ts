import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../service/userservice.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(
    public route:Router,
    public userserve:UserserviceService
  ){}

  public accountNo:any;
  public msg='';
  public userId:any;
  public  name= '';
  public  relationship= '';
  public  phone= '';
  public nextOfKin:any = {};
  public amount:number = 0;
  public isGenerating = false;
  
  
  ngOnInit(){
    this.userId = this.userserve.userArray.findIndex((user:any, index:number)=>user.email == this.userserve.currentUser.email) + 1; 
  }

  deposit() {
    if (this.amount > 0) {
      this.userserve.currentUser.balance += this.amount;
  
      const index = this.userserve.userArray.findIndex(
        (user: any) => user.email === this.userserve.currentUser.email
      );
      this.userserve.userArray[index].balance = this.userserve.currentUser.balance;
  

      localStorage.setItem('userArray', JSON.stringify(this.userserve.userArray));
      localStorage.setItem('currentUser', JSON.stringify(this.userserve.currentUser));
  
      this.msg = 'Deposit successful!';
      setTimeout(() => (this.msg = ''), 3000);
    } else {
      this.msg = 'Enter a valid amount!';
      setTimeout(() => (this.msg = ''), 3000);
    }
  }


  

generate() {
  if (!this.isGenerating) {
    this.isGenerating = true; 

    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    this.accountNo = `${this.userId}${randomDigits}`;
    this.userserve.currentUser.accountNumber = this.accountNo;

    
    const index = this.userserve.userArray.findIndex(
      (user: any) => user.email === this.userserve.currentUser.email
    );
    this.userserve.userArray[index].accountNumber = this.accountNo;
    localStorage.setItem('userArray', JSON.stringify(this.userserve.userArray));

    
    this.msg = 'Account number generated successfully!';
    setTimeout(() => {
      this.msg = '';  
    }, 3000); 
  }
}



  logout() {
    this.userserve.clearCurrentUser();
    this.route.navigate(['/login']);
  }
}
