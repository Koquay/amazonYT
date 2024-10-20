import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FilterProducts } from './price-sidebar.actions';
import { ProductSidebarModel } from './product-sidebar.model';
import { ProductService } from '../product.service';
import { CreateRatingStarsDirective } from '../../shared/directives/create-rating-stars.directive';

@Component({
  selector: 'app-product-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateRatingStarsDirective
  ],
  templateUrl: './product-sidebar.component.html',
  styleUrl: './product-sidebar.component.scss'
})
export class ProductSidebarComponent {

  public productSidebar:ProductSidebarModel = new ProductSidebarModel();

  constructor(
    private store: Store<{ productSidebarReducer:any; }>
  ){}

  ngOnInit() {
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    const productSidebarObservable$ = this.store.select((state) => {
      return state.productSidebarReducer;
    });

    productSidebarObservable$.subscribe((productSidebarReducer:any) => {
      this.productSidebar = JSON.parse(JSON.stringify(productSidebarReducer.productSidebar));
      console.log('ProductSidebarComponent.productSidebar', this.productSidebar)
    });
  }

  public priceChanged = (e:any) => {
    console.log('range', e.target);
    console.log('selectedPrice', e.target.value);
    console.log('min', e.target.min);
    this.productSidebar.priceRange.selectedPrice = parseInt(e.target.value);    
    this.filterProducts();
  }

  public filterProducts = () => {
    this.store.dispatch(FilterProducts({productSidebar: this.productSidebar}))
  }
}
