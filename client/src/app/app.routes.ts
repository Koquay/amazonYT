import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { SelectedProductComponent } from './product/selected-product/selected-product.component';
import { CheckoutComponent } from './checkout/checkout.component';

export const routes: Routes = [
    
    { path: 'home', component: HomeComponent, data: { breadcrumb: 'Home' } },
    { path: 'product', component: ProductComponent, data: { breadcrumb: 'Product' } },
    { path: 'cart', component: CartComponent, data: { breadcrumb: 'Cart' } },
    { path: 'checkout', component: CheckoutComponent, data: { breadcrumb: 'Checkout' } },
    
    { path: 'selected-product/:productId', component: SelectedProductComponent, data: { breadcrumb: 'Selected Product' } },
    
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
    },
];
