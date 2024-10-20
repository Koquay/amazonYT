import { Component, Input } from '@angular/core';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { Store } from '@ngrx/store';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';
import { ShortenTextPipe } from '../shared/pipes/shorten-text.pipe';
import { CreateRatingStarsDirective } from '../shared/directives/create-rating-stars.directive';
import { AddItemToCart } from '../cart/cart.actions';
import { CartItem } from '../cart/cart-item.model';
import { ProductModel } from './product.model';
import { ProductSidebarModel } from './product-sidebar/product-sidebar.model';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ProductSidebarComponent,
    ShortenTextPipe,
    CreateRatingStarsDirective
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public productSidebar = new ProductSidebarModel()
  public products:ProductModel[] = [];
  public productCount:number = 0;
  public numberOfPages = 0;
  public pages:number[] = [];

  constructor(
    private store: Store<{ productSidebarReducer:any; productReducer:any }>,
    private productService:ProductService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    const productSidebarObservable$ = this.store.select((state) => {
      return state.productSidebarReducer;
    });

    productSidebarObservable$.subscribe((productSidebarReducer:any) => {
      this.productSidebar = productSidebarReducer.productSidebar;
      console.log('ProductComponent.productSidebar', this.productSidebar)
      this.productService.getProducts(this.productSidebar)
    });

    const productObservable$ = this.store.select((state) => {
      return state.productReducer;
    });

    productObservable$.subscribe((productReducer:any) => {
      this.products = productReducer.products;
      console.log('ProductComponent.products', this.products)

      this.productCount = productReducer.productCount;
      this.numberOfPages = Math.ceil(
        this.productCount / this.productSidebar.pageSize
      );
      this.pages = [];
      for (let i = 1; i <= this.numberOfPages; i++) {
        this.pages.push(i);
      }
    });
  }

  public addItemToCart = (product:ProductModel) => {
    console.log('SelectedProductComponent.addItemToCart')
    const item = new CartItem(product, 1)
    
    try {
      this.store.dispatch(AddItemToCart( {item} ))
    } catch (e) {
      this.toastr.success('There was a problem adding your item to cart.', '');
      throw e;
    } finally {
      this.toastr.success('Item successfully added to cart.', '');
    }
    
  }

  public getPage(pageNo:number) {
    this.productSidebar.pageNo = pageNo;
    this.productService.getProducts(this.productSidebar);
  }

  public getPageByDirection(direction:string) {
    if (direction === '»') {
      if (this.productSidebar?.pageNo < this.numberOfPages) {
        ++this.productSidebar.pageNo;
        this.productService.getProducts(this.productSidebar);
      }
    } else if (direction === '«') {
      if (this.productSidebar?.pageNo > 1) {
        --this.productSidebar.pageNo;
        this.productService.getProducts(this.productSidebar);
      }
    }
  }
}
