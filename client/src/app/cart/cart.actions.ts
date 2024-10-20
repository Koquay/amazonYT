import { createAction, props } from "@ngrx/store";
import { CartItem } from "./cart-item.model";

export const AddItemToCart = createAction(
    '[AddItemToCart] AddItemToCart',
    props<{item:CartItem }>()
  );

  export const DeleteItemFromCart = createAction(
    '[DeleteItemFromCart] DeleteItemFromCart',
    props<{item:CartItem }>()
  );