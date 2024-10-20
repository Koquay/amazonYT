import { createReducer, on } from "@ngrx/store";
import { StoreCheckoutData } from "./checkout.actions";
import { CheckoutModel } from "./checkout.model";
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils";
import { RestoreStateFromLocalStorage } from "../app.actions";

const initialState: {checkoutData: CheckoutModel,} = {
    checkoutData: new CheckoutModel(),
  } 

export const CheckoutReducer = createReducer(
    initialState,

    on(StoreCheckoutData, (state, action) => {
        console.log('CheckoutReducers.checkoutData', action.checkoutData)

        state = {
            ...state,    
            checkoutData: action.checkoutData
          };
        
          saveStateToLocalStorage(state);

        return {
        ...state,            
        };
    }),

    on(RestoreStateFromLocalStorage, (state, action) => {
        if(action.amazonYT?.checkoutData) {
            state.checkoutData = action.amazonYT?.checkoutData
            console.log('action.amazonYT?.checkoutData', action.amazonYT?.checkoutData)
        } else {
            state = initialState;
            console.log('state.checkoutData', state.checkoutData)
        }
    
        return {
          ...state
        }
      }),
)