import { createAction, props } from "@ngrx/store";

export const StoreProducts = createAction(
    '[Store Products] Store Products',
    props<{ productData:any }>()
  );

  export const StoreProduct = createAction(
    '[Store Product] Store Product',
    props<{ product:any }>()
  );