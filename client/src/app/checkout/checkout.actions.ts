import { createAction, props } from '@ngrx/store';
import { CheckoutModel } from './checkout.model';

export const StoreCheckoutData = createAction(
  '[storeCheckoutData] storeCheckoutData',
  props<{ checkoutData:CheckoutModel }>()
);
