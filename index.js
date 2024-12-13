const productInfo = [
  {
    Id: 1,
    brand: "Forever New",
    name: "Women Bodycon Black Dress",
    price: 1200,
    InStock: true,
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/v/l/c/xxl-black-a-s-fashion-original-imah7yr8ttuhtgy9.jpeg?q=70",
  },
  {
    Id: 2,
    brand: "Forever New",
    name: "Women Fit and Flare Blue, White Dress",
    price: 2200,
    InStock: false,
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/3/q/t/l-htdrss7133-honky-tonky-original-imagszfhfghhs2rp.jpeg?q=70",
  },
  {
    Id: 3,
    brand: "Forever New",
    name: "Women Solid A-line Black Skirt",
    price: 6300,
    InStock: true,
    img: "https://rukminim2.flixcart.com/image/612/612/xif0q/skirt/t/b/j/32-3341-buynewtrend-original-imagt2zdxwjz8hrb.jpeg?q=70",
  },
];

let wishlist = document.getElementById("wishlist-count");
let productListContainer = document.getElementById("product-list");
const cartItemsContainer = document.getElementById("cart-items");

let cart = document.getElementById("cart-count");
let cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];

let cartCount = cartArr.length;
let wishlistCount = 0;

function renderProductList() {
  let productIn = "";
  productInfo.forEach((product) => {
    productIn += `
              <div class="product-card">
                  <img src="${product.img}" alt="${product.name}">
               <p>${product.brand}</p>
                  <h3>${product.name}</h3>
                 <p class="price">₹${product.price}</p>
                  <button class="add-to-cart-btn" onclick="addToCart(${product.Id})">Add to Cart</button>
              </div>
          `;
  });
  productListContainer.innerHTML = productIn;
}

function addToCart(Id) {
  const product = productInfo.find((item) => item.Id === Id);

  if (!product) {
    console.error("Product not found");
    return;
  }

  const isAlreadyInCart = cartArr.some((item) => item.Id === Id);
  if (isAlreadyInCart) {
    showPopup("This item is already in your cart!");
  } else {
    cartArr.push(product);
    cartCount++;
    cart.innerText = cartCount;
    localStorage.setItem("cartItems", JSON.stringify(cartArr));
    showPopup("Item has been added to your cart!");
  }
}

function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerText = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 2000);
}

window.addToCart = addToCart;

window.addToWishlist = function (Id) {
  wishlistCount++;
  wishlist.innerText = wishlistCount;
};

renderProductList();
cart.innerText = cartCount;

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedInUser = localStorage.getItem("loggedInUser");

  const loginContainer = document.getElementById("login-container");

  if (isLoggedIn && loginContainer) {
    loginContainer.innerHTML = `
      <span>Welcome, ${loggedInUser}</span>
      <a href="#" id="signOut-button">Sign Out</a>
    `;

    const signOutButton = document.getElementById("signOut-button");
    signOutButton.addEventListener("click", (e) => {
      e.preventDefault();

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUser");

      loginContainer.innerHTML = `
        <a href= "login/login.html"> LogIn</a>
     
           `;
    });
  }
});
