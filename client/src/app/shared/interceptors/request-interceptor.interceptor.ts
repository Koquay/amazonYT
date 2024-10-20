import { HttpInterceptorFn } from '@angular/common/http';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getUserToken();
    if(token) {
      const authReq = req.clone({setHeaders:{"Authorization":"Bearer " + token}});
      console.log('authReq', authReq)
      return next(authReq);
    }
    return next(req);
};

const getUserToken = () => {
  const amazonYT = localStorage.getItem('amazonYT');
  let token = null;

  if(amazonYT) {
    token = JSON.parse(amazonYT)?.user?.token;
  }

  return token;
}
