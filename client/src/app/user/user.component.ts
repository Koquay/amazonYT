import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  @ViewChild('closeSignInModalBtn', { static: true }) closeSignInModalBtn?: ElementRef<HTMLElement>; 
  @ViewChild('closeSignUpModalBtn', { static: true }) closeSignUpModalBtn?: ElementRef<HTMLElement>; 

  user = new UserModel(); 

  constructor(
    private userService:UserService,
    private toastr:ToastrService
  ) {}


ngOnInit() {}

signup = () => {
  this.userService.signup(this.user).subscribe(() => {
    let el:HTMLElement = this.closeSignUpModalBtn!.nativeElement;
    el.click();
    this.toastr.success('Sign up successful!', '');
  })
};

signin = () => {
  this.userService.signin(this.user).subscribe(() => {
    let el: HTMLElement = this.closeSignInModalBtn!.nativeElement;
    el.click();
    this.toastr.success('Sign in successful!', '');
  })
};

}
