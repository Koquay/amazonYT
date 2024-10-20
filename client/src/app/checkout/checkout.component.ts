import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../cart/cart-item.model';
import { CheckoutModel } from './checkout.model';
import { Store } from '@ngrx/store';
import { StoreCheckoutData } from './checkout.actions';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../order/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  public checkoutData:CheckoutModel = new CheckoutModel();
  public cart: CartItem[] = [];

  expirationMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

expirationYears = [
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
    "2031",
    "2032",
    "2033",
    "2034",
]

  constructor(
    private store:Store<{checkoutReducer:any, cartReducer:any}>,
    private toastr:ToastrService,
    private orderService:OrderService
  ) {}

  ngOnInit() {
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    const checkoutReducer$ = this.store.select((state) => {
      return state.checkoutReducer;
    });

    checkoutReducer$.subscribe((checkoutReducer:any) => {
      this.checkoutData = JSON.parse(JSON.stringify(checkoutReducer?.checkoutData))
    });

    const cartReducer$ = this.store.select((state) => {
      return state.cartReducer;
    });

    cartReducer$.subscribe((cartReducer:any) => {
      this.cart = cartReducer.cart;
    });
  }

  public placeOrder = () => {    
    const amazonYT = localStorage.getItem('amazonYT');
    let token = null;

    if(amazonYT) {
      token = JSON.parse(amazonYT).user.token;
    }

    if(!token) {
      this.toastr.warning('Please sign in to place an order.', '');
      return;
    }

    this.checkoutData.cart = this.cart;
    this.orderService.placeOrder(this.checkoutData)
  }

  public saveToDatastore = () => {
    this.store.dispatch(StoreCheckoutData({checkoutData: this.checkoutData}))
  }

  public getSubtotal = () => {
    const subtotal = this.cart.reduce((acc, item) => {                    
       return (acc += (item.product.price * item.quantity));
    }, 0);

    return subtotal;
  }
}
