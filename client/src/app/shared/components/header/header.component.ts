import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { SignoutUser } from '../../../user/user.actions';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../user/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public user?:UserModel;
  public numberOfItems?:number;

  constructor(private store:Store<{userReducer:any, cartReducer:any}>) {}

  ngOnInit() {
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {

    const userReducer$ = this.store.select((state) => {
      return state.userReducer;
    });

    userReducer$.subscribe((userReducer:any) => {
      this.user = userReducer.user;
      console.log('header.user', this.user)
    });

    const cartReducer$ = this.store.select((state) => {
      return state.cartReducer;
    });

    cartReducer$.subscribe((cartReducer:any) => {
      this.numberOfItems = cartReducer.cart.length;
    });
  }

  signout = () => {
    this.store.dispatch(SignoutUser())
  }
}
