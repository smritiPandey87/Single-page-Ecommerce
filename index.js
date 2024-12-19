import { productInfo } from "./data/data.js";
let wishlist = document.getElementById("wishlist-count");
let productListContainer = document.getElementById("product-list");
// const cartItemsContainer = document.getElementById("cart-items");

let cart = document.getElementById("cart-count");
let cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];

let cartCount = cartArr.length;

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
           <span class="wishlist-icon" onclick="addToWishlist(${product.Id})">
                      ❤️
                  </span>
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
let wishlistArr = JSON.parse(localStorage.getItem("wishlistItems")) || [];
let wishlistCount = wishlistArr.length;
wishlist.innerText = wishlistCount;

window.addToWishlist = function (Id) {
  const product = productInfo.find((item) => item.Id === Id);

  if (!product) {
    console.error("Product not found");
    return;
  }

  const isAlreadyInWishlist = wishlistArr.some((item) => item.Id === Id);
  if (isAlreadyInWishlist) {
    showPopup("This item is already in your wishlist!");
  } else {
    wishlistArr.push(product);
    wishlistCount++;
    wishlist.innerText = wishlistCount;
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr));
    showPopup("Item has been added to your wishlist!");
  }
};

