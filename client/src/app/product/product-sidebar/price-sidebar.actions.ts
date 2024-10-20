import { createAction, props } from "@ngrx/store";

export const FilterProducts = createAction(
    '[FilterProducts] FilterProducts',
    props<{ productSidebar:any }>()
  );