import { createReducer } from "@ngrx/store";

const initialState = {
    heroCarouselImages: [
        "Screenshot%20from%202024-10-03%2011-15-55.png",
        "Screenshot%20from%202024-10-03%2011-17-02.png",
        "Screenshot%20from%202024-10-03%2011-17-57.png"
    ],    
}

export const HeroCarouselReducer = createReducer(initialState);