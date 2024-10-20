export class ProductSidebarModel {
    brands = {
        title: 'Brands',
        brands: [
            {
                name: 'ASUS',
                checked: false,
            },
            {
                name: 'LG',
                checked: false,
            },
            {
                name: 'Acer',
                checked: false,
            },
            {
                name: 'Razer',
                checked: false,
            },
            {
                name: 'MSI',
                checked: false,
            },
            ],
    };

    priceRange = {
        title: 'Price',
        min: 0,
        max: 10000,
        step:10,
        selectedPrice: 10000
    };
    
    ratings = {
        title: 'Ratings',
        ratings: [
        {
            rating: 5,
            checked: false,
            },
            {
            rating: 4,
            checked: false,
            },
            {
            rating: 3,
            checked: false,
            },
            {
            rating: 2,
            checked: false,
            },
            {
            rating: 1,
            checked: false,
            },
                            
        ],
    };

    pageNo= 1;
    pageSize= 8;
    pageSizeOptions = [5, 10, 15];
}