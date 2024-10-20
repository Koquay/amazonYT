import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule
  ],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss'
})
export class HeroCarouselComponent {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: true,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      }
    }
  }

  public heroCarouselImages:string[] = [];

  constructor(
    private store: Store<{ heroCarouselReducer:unknown; }>
  ){}

  ngOnInit() {
    this.subscribeToRedux();
  }

  private subscribeToRedux = () => {
    const heroCarouselReducer$ = this.store.select((state) => {
      return state.heroCarouselReducer;
    });

    heroCarouselReducer$.subscribe((heroCarouselReducer:any) => {
      this.heroCarouselImages = heroCarouselReducer.heroCarouselImages;
      console.log('HeroCarouselComponent.this.heroCarouselImages', this.heroCarouselImages)
    });
  }
}
