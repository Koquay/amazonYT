import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { catchError, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreUser } from './user.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = '/api/user';

  constructor(
    private httpClient:HttpClient,
    private store:Store,
    private toastr: ToastrService
  ) { }

  public signup = (user:UserModel) => {
    console.log('UserService.user', user)

    return this.httpClient.post<UserModel>(this.url, {user}).pipe(
      tap(user => {
        console.log('UserService.user tap', user)
        this.store.dispatch(StoreUser({user}))
      }),
      catchError(error => {
        console.log('error', error)
        this.toastr.warning(error.error, '');
        throw error;
      })   
    )
  }

  public signin = (user:UserModel) => {
    return this.httpClient.put<UserModel>(this.url, {user}).pipe(
      tap(user => {
        console.log('UserService.user tap: ', user)
        this.store.dispatch(StoreUser({user: user}))
      }),
      catchError(error => {
        console.log('error', error)
        this.toastr.warning(error.error, '');
        throw error;
      })    
    )
  }
}
