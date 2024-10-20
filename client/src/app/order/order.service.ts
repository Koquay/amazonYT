import { Injectable } from '@angular/core';
import { CheckoutModel } from '../checkout/checkout.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = '/api/order'

  constructor(
    private httpClient: HttpClient,
    private toastr:ToastrService
  ) { }

  public placeOrder = (orderData:CheckoutModel) => {

    this.httpClient.post(this.url, orderData).pipe(
      tap(order => {
        console.log('new order', order)
        this.toastr.success('Order successfully placed.', 'Place Order')
      }),
      catchError(error => {
        console.log('error', error)
        this.toastr.success(error.error, 'Place Order');
        throw error;
      }) 
    ).subscribe()
  } 
}
