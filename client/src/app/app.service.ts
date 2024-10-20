import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RestoreStateFromLocalStorage } from './app.actions';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private store:Store
) { }

public restoreStateFromLocalStorage = () => {
  let amazonStr = localStorage.getItem('amazonYT');

  let amazonYT = null;

  if(amazonStr) {
    amazonYT = JSON.parse(amazonStr);
  } 

  this.store.dispatch(RestoreStateFromLocalStorage({amazonYT})); 
}
}
