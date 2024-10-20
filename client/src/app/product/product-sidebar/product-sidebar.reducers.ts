import { createReducer, on } from "@ngrx/store"
import { FilterProducts } from "./price-sidebar.actions";
import { ProductSidebarModel } from "./product-sidebar.model";


const initialState = {
    productSidebar: new ProductSidebarModel()
}

export const ProductSidebarReducer = createReducer(initialState,
  on(FilterProducts, (state, action) => {
    console.log('ProductSidebarReducer.productsSidebar', action.productSidebar);
    
    state = {
      ...state,
      productSidebar: action.productSidebar,
    };

    console.log('ProductSidebarReducer.state', state);

    // saveStateToLocalStorage(state);

    return {
      ...state,
    };
  }),

)