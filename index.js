import { productInfo } from "./data/data.js";
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

