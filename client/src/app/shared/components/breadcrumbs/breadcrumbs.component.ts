import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  public breadcrumbs = [{label:'Home', url:'/'}];
  public productName:string = '';
  public productId = null;

  constructor(
    private router: Router,
    private store: Store<{ productReducer:any }>
  ) {}

  ngOnInit(): void {
    this.subscribeToRedux();
    this.buildBreadcrumbs();    
  }

  private subscribeToRedux = () => {
    const productData$ = this.store.select((state) => {
      return state.productReducer;
    });

    console.log('Breadcrumbs.productData$', productData$)

    productData$.subscribe((productData) => { 
      this.productName = productData?.product?.brand || 'product'
      this.productId = productData?.product?._id ;
    });
  };

  private buildBreadcrumbs = () => {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let url = this.router.url;                

        let label = url.substring(1);
        console.log('url', url);        

        if (label.includes('/')) {
          let index = label.indexOf('/');
          label = label.substring(0, index);
        }

        label = label.replaceAll('-', ' ');

        if(url.startsWith('/selected-product')) {     
          label = this.productName?.substring(0, 20).trim() + '...'
        }

        let breadcrumb:{label:string, url:string} = { label, url };

        this.breadcrumbs = this.breadcrumbs?.filter(
          (breadcrumb:{label:string, url:string}) => breadcrumb.url !== url
        );
        this.breadcrumbs?.push(breadcrumb);

        console.log('breadcrumbs', this.breadcrumbs);

        if (this.breadcrumbs.length === 1) {
          if (breadcrumb.url !== '/home') {
            let tmp = localStorage.getItem('amazonYT');

            let state:{breadcrumbs:{label:string, url:string }} = {label:'', ''};
            if(tmp) {
              state = JSON.parse(tmp);  
            }
            // let state = JSON.parse(localStorage.getItem('amazonYT'));
            this.breadcrumbs = state.breadcrumbs;
          }
        }

        let state = JSON.parse(localStorage.getItem('amazonYT')) || {};
        state.breadcrumbs = this.breadcrumbs;
        localStorage.setItem('amazonYT', JSON.stringify(state));
        
      }
    });
  };

  navigateToUrl = (url:string) => {

    if(url.startsWith('/selected-product')) {
      const productId = url.split('/')[2]
      this.store.dispatch(StoreSelectedProduct({productId}))
    }

    this.router.navigateByUrl(url);
  }

  public clearBreadcrumbs = () => {
    this.breadcrumbs = [this.breadcrumbs[this.breadcrumbs.length - 1]]
    let breadcrumb = {label:'Home', url:'/home' }
    this.breadcrumbs.unshift(breadcrumb)
  }
}
