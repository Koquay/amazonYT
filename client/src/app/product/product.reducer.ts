import { createReducer, on } from "@ngrx/store"
import { StoreProduct, StoreProducts } from "./product.actions";
import { ProductModel } from './product.model';

const initialState: {products: ProductModel[], product: ProductModel, productCount: number} = {
  products: [], 
  product: new ProductModel(),
  productCount: 0
} 

export const ProductReducer = createReducer(
    initialState,

    on(StoreProduct, (state, action) => {
      console.log('productReducers.product', action.product)
  
      state = {
          ...state,     
          product: action.product,           
        };
  
      console.log('productReducer.state', state)
  
      // saveStateToLocalStorage(state);
  
      return {
      ...state
      };
  }),

    on(StoreProducts, (state, action) => {
        console.log('ProductReducer.StoreProducts.products', action.productData)
      return {
        ...state,
        products: action.productData.products,
        productCount: action.productData.productCount,        
      };
    }),
)