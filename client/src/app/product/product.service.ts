import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, tap } from 'rxjs';
import { StoreProduct, StoreProducts } from './product.actions';
import { ProductSidebarModel } from './product-sidebar/product-sidebar.model';
import { ProductModel } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url:string = '/api/product'

  constructor(
    private httpClient:HttpClient,
    private store:Store
  ) { }

  public getProduct = (productId:string) => {
    const params = new HttpParams({
      fromObject: { productId },
    });

    this.httpClient
      .get(`${this.url}/productId`, { params: params })
      .pipe(
        tap((product) => {
          console.log('ProductService.product', product);
          this.store.dispatch(StoreProduct({ product }));
        }),
        catchError(error => {
          console.log('error', error)
          // this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        }) 
      )
      .subscribe();
  }

  public getProducts = (productsSidebar:ProductSidebarModel) => {
    const sidebarFilters = this.createFilterParams(productsSidebar);

    const params = new HttpParams({
      fromObject: { sidebarFilters: sidebarFilters },
    });

    this.httpClient
      .get<{ products:ProductModel[]; productCount:number }>(this.url, { params: params }) 
      .pipe(
        tap((productData) => {
          console.log('productData', productData);
          this.store.dispatch(StoreProducts({ productData }));
        }),
        catchError(error => {
          console.log('error', error)
          // this.toastr.error('Problem getting products', 'Get Products')
          throw error;
        }) 
      )
      .subscribe();
  };

  private createFilterParams(productsSidebar:ProductSidebarModel) {
    console.log('ProductService.productsSidebar', productsSidebar);
    const brandFilters = productsSidebar.brands.brands.filter(
      (brand:any) => brand.checked
    );
    console.log('ProductService.brandFilters', brandFilters);

    const brands:string[] = [];

    for (let brand of brandFilters) {
      brands.push(brand.name);
    }

    const range = {low: productsSidebar.priceRange.min, high: productsSidebar.priceRange.selectedPrice}

    const priceRanges = [];
    priceRanges.push(range);
    
    console.log('ProductService.priceRanges', priceRanges);
 
    const ratingFilters = productsSidebar.ratings.ratings.filter(
      (filter:any) => filter.checked
    );
    console.log('ProductService.ratingFilters', ratingFilters);

    const ratings:number[] = [];

    for (let rating of ratingFilters) {
      ratings.push(rating.rating);
    }

    const filters = {
      brands,
      priceRanges: priceRanges,
      ratings: ratings,
      pageNo: productsSidebar.pageNo,
      pageSize: productsSidebar.pageSize,
    };

    console.log('filters', filters);
    return JSON.stringify(filters);
  }
}
