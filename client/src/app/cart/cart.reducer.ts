import { createReducer, on } from "@ngrx/store"
import { AddItemToCart, DeleteItemFromCart } from "./cart.actions"
import { CartItem } from "./cart-item.model"
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils"
import { RestoreStateFromLocalStorage } from "../app.actions"

const initialState: {cart: CartItem[]} = {
    cart: [],
  } 

export const CartReducer = createReducer(
    initialState,

    on(AddItemToCart, (state, action) => {
        console.log('CartReducer.product', action.item)
        const existingItem = state.cart?.find(item => item?.product._id === action.item.product._id)

        if(existingItem) {
            existingItem.quantity = action.item.quantity;
        } else {
            state.cart.push(action.item)
        }
        console.log('CartReducer.state', state)

        saveStateToLocalStorage(state);

        return {
        ...state,    
        };
    }),

    on(DeleteItemFromCart, (state, action) => {
        console.log('CartReducer.product', action.item)
        const newCart = state.cart?.filter(item => item?.product._id !== action.item.product._id)

        state.cart = newCart;

        saveStateToLocalStorage(state);

        return {
        ...state,           
        };
    }),

    on(RestoreStateFromLocalStorage, (state, action) => {
        if(action.amazonYT?.cart) {
            state.cart = action.amazonYT?.cart
            console.log('action.amazonYT?.cart', action.amazonYT?.cart)
        } else {
            state = initialState;
            console.log('state.cart', state.cart)
        }
    
        return {
          ...state
        }
      }),
)