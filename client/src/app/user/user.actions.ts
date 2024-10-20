import { createAction, props } from "@ngrx/store";
import { UserModel } from "./user.model";

export const StoreUser = createAction(
    '[Store user] Store user',
    props<{ user:UserModel}>()
  );

  export const SignoutUser = createAction(
    '[SignoutUser] SignoutUser'
  );
