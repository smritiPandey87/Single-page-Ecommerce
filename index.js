const productInfo = [
    {
        Id: 1,
        name: "TShirt",
        brand: "POLO",
        price: 1200,
        InStock: true,
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/p/9/i/m-lrkpnslf174030-louis-philippe-jeans-original-imagszfr4fzpjzvm.jpeg?q=70",
    },
    {
        Id: 2,
        name: "Shoe",
        brand: "PUMA",
        price: 2200,
        InStock: false,
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/e/m/v/-original-imah4adtab5dvcbw.jpeg?q=70",
    },
    {
        Id: 3,
        name: "Kurtis",
        brand: "LIVA KURTIS",
        price: 6300,
        InStock: true,
        img: "https://rukminim2.flixcart.com/image/612/612/xif0q/ethnic-set/n/n/x/m-e919-the-style-story-original-imaguqrdsykzddsm.jpeg?q=70",
    }
];

// let cartCount = 0;
// let wishlistCount = 0;

let cart = document.getElementById("cart-count");
let wishlist = document.getElementById("wishlist-count");
let productListContainer = document.getElementById("product-list");
let productIn = "";


productInfo.map((product, i) => {
    productIn += `
        <div class="product-card">
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p class="price">$${product.price}</p>
            <p class="stock">${product.InStock ? "Available" : "Not Available"}</p>
            <button onclick="addToCart(${product.Id})">Add to Cart</button>
            <button onclick="addToWishlist(${product.Id})">Add to Wishlist</button>
        </div>
    `;
});


productListContainer.innerHTML = productIn;

// function addToCart(id) {
//     cartCount++;
//     cart.innerText = cartCount;
//     alert(`Product with ID: ${id} added to cart`);
// }


// function addToWishlist(id) {
//     wishlistCount++;
//     wishlist.innerText = wishlistCount;
//     alert(`Product with ID: ${id} added to wishlist`);
// }

