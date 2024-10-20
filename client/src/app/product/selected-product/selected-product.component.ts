import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductService } from '../product.service';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from '../product.model';
import { CommonModule } from '@angular/common';
import { CreateRatingStarsDirective } from '../../shared/directives/create-rating-stars.directive';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../cart/cart-item.model';
import { AddItemToCart } from '../../cart/cart.actions';

@Component({
  selector: 'app-selected-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CreateRatingStarsDirective
  ],
  templateUrl: './selected-product.component.html',
  styleUrl: './selected-product.component.scss'
})
export class SelectedProductComponent {
  public product = new ProductModel();
  public productColor:string = '';
  public colorImgs:string[] = [];
  public currentGalleryImg = '';
  public quantity = 1;

  constructor(
    private activatedRoute:ActivatedRoute,
    private store:Store<{productReducer:any}>,
    private productService:ProductService,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    const productId = this.activatedRoute.snapshot.paramMap.get('productId')
    console.log('selectedProduct', productId)

    this.productService.getProduct(productId as string)

    this.subscribeToRedux();
   
  }

  private subscribeToRedux = () => {

    const productReducer$ = this.store.select((state) => {
      return state.productReducer;
    });

    productReducer$.subscribe((productReducer:any) => {
      this.product = productReducer.product;
      console.log('SelectedProduct.product', this.product)
      this.currentGalleryImg = this.product?.images[0]

    });
  }

  public setCurrentImage = (img:string) => {
    this.currentGalleryImg = img;
  }

  public addItemToCart = (product:ProductModel) => {
    console.log('SelectedProductComponent.addItemToCart')
    const item = new CartItem(product, this.quantity)
    
    try {
      this.store.dispatch(AddItemToCart( {item} ))
    } catch (e) {
      this.toastr.success('There was a problem adding your item to cart.', '');
      throw e;
    } finally {
      this.toastr.success('Item successfully added to cart.', '');
    }
    
  }
}
