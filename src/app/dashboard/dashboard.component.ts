import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../service/userservice.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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
  public nextOfKin:any = {}
  
  
  ngOnInit(){
    this.userId = this.userserve.userArray.findIndex((user:any, index:number)=>user.email == this.userserve.currentUser.email) + 1; 
  }



saveNextOfKin() {
  this.nextOfKin = {
    name: this.name,
    relationship: this.relationship,
    phone: this.phone
  }
  this.userserve.currentUser.nextOfKin = this.nextOfKin; // Save to the current user
  const index = this.userserve. userArray.findIndex(
    (user: any) => user.email === this.userserve.currentUser.email
  );
  this.userserve.userArray[index].nextOfKin = this.nextOfKin;

  // Update localStorage
  localStorage.setItem('userArray', JSON.stringify(this.userserve.userArray));
  this.msg = 'Next of kin saved successfully!';
}


  generate(){
      const randomDigits = Math.floor(100000 + Math.random() * 900000); 
      this.accountNo = `${this.userId}${randomDigits}`;
      this.userserve.currentUser.accountNumber = this.accountNo; 
    
  
      const index = this.userserve.userArray.findIndex(
        (user: any) => user.email === this.userserve.currentUser.email
      );
      this.userserve.userArray[index].accountNumber = this.accountNo;
    
  
      localStorage.setItem('userArray', JSON.stringify(this.userserve.userArray));
      this.msg = 'Account number generated successfully!';
    
    
  }


  logout() {
    this.userserve.clearCurrentUser();
    this.route.navigate(['/login']);
  }
}
