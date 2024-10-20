import { ActionReducerMap } from "@ngrx/store";
import { HeroCarouselReducer } from "../../home/hero-carousel/hero-carousel.reducers";
import { ProductSidebarReducer } from "../../product/product-sidebar/product-sidebar.reducers";
import { ProductReducer } from "../../product/product.reducer";
import { CartReducer } from "../../cart/cart.reducer";
import { CheckoutReducer } from "../../checkout/checkout.reducer";
import { UserReducer } from "../../user/user.reducer";

export interface State {};

export const reducers: ActionReducerMap <State> = {
    heroCarouselReducer:HeroCarouselReducer,
    productSidebarReducer:ProductSidebarReducer,
    productReducer:ProductReducer,
    cartReducer:CartReducer,
    checkoutReducer:CheckoutReducer,
    userReducer:UserReducer,
    
}