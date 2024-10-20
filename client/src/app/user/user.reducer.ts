import { createReducer, on } from "@ngrx/store";
import { UserModel } from "./user.model";
import { SignoutUser, StoreUser } from "./user.actions";
import { saveStateToLocalStorage } from "../shared/utils/localStorageUtils";
import { RestoreStateFromLocalStorage } from "../app.actions";

const initialState: {user: UserModel} = {
    user: new UserModel(), 
  }   
  
  export const UserReducer = createReducer(
      initialState,
  
      on(StoreUser, (state, action) => {
        console.log('userReducers.user', action.user)
    
        state = {
            ...state,     
            user: action.user,           
          };
    
        console.log('userReducer.state', state)
    
        saveStateToLocalStorage(state);
    
        return {
        ...state
        };
    }),

    on(RestoreStateFromLocalStorage, (state, action) => {
        if(action.amazonYT?.user) {
            state.user = action.amazonYT?.user
            console.log('action.amazonYT?.user', action.amazonYT?.user)
        } else {
            state = initialState;
            console.log('state.user', state.user)
        }
    
        return {
          ...state
        }
      }),

      on(SignoutUser, (state, action) => {
    
        state = {
            ...state,     
            user: new UserModel()          
          };
    
        console.log('userReducer.state', state)
    
        saveStateToLocalStorage(state);
    
        return {
        ...state
        };
    }),
  
  )