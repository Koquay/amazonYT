import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from './cart-item.model';
import { ShortenTextPipe } from '../shared/pipes/shorten-text.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddItemToCart, DeleteItemFromCart } from './cart.actions';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public cart:CartItem[] = [];

  constructor(
    private store: Store<{ cartReducer:any; }>,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    const cartObservable$ = this.store.select((state) => {
      return state.cartReducer;
    });

    cartObservable$.subscribe((cartReducer:any) => {
      this.cart = JSON.parse(JSON.stringify(cartReducer.cart));
      console.log('CartComponent.cart', this.cart)
    });
  }

  public deleteItem = (item:CartItem) => {
    this.store.dispatch(DeleteItemFromCart({item}))
  }

  public getSubtotal = () => {
    const subtotal = this.cart.reduce((acc, item) => {                     
      // const discount = item.product.discount/100 * item.product.price;
       return (acc += (item.product.price * item.quantity));
    }, 0);

    return subtotal;
  }

  public changeItemQuantity = (item:CartItem) => {
    console.log('SelectedProductComponent.addItemToCart')
    // const item = new CartItem(product, this.quantity)
    
    try {
      this.store.dispatch(AddItemToCart( {item} ))
    } catch (e) {
      this.toastr.error('There was a problem adding your item to cart.', '');
      throw e;
    } finally {
      this.toastr.success('Item successfully added to cart.', '');
    }
    
  }
}
