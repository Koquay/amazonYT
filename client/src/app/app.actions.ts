import { createAction, props } from '@ngrx/store';

export const RestoreStateFromLocalStorage = createAction(
    '[restoreStateFromLocalStorage] restoreStateFromLocalStorage',
    props<{ amazonYT:any }>()
  );