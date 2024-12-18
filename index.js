// import { productInfo } from "./data/data.js";
// let wishlist = document.getElementById("wishlist-count");
// let productListContainer = document.getElementById("product-list");
// const cartItemsContainer = document.getElementById("cart-items");

// let cart = document.getElementById("cart-count");
// let cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];

// let cartCount = cartArr.length;
// let wishlistCount = 0;

// function renderProductList() {
//   let productIn = "";
//   productInfo.forEach((product) => {
//     productIn += `
//               <div class="product-card">
//                   <img src="${product.img}" alt="${product.name}">
//                <p>${product.brand}</p>
//                   <h3>${product.name}</h3>
//                  <p class="price">₹${product.price}</p>
//                   <button class="add-to-cart-btn" onclick="addToCart(${product.Id})">Add to Cart</button>

//               </div>
//           `;
//   });
//   productListContainer.innerHTML = productIn;
// }

// function addToCart(Id) {
//   const product = productInfo.find((item) => item.Id === Id);

//   if (!product) {
//     console.error("Product not found");
//     return;
//   }

//   const isAlreadyInCart = cartArr.some((item) => item.Id === Id);
//   if (isAlreadyInCart) {
//     showPopup("This item is already in your cart!");
//   } else {
//     cartArr.push(product);
//     cartCount++;
//     cart.innerText = cartCount;
//     localStorage.setItem("cartItems", JSON.stringify(cartArr));
//     showPopup("Item has been added to your cart!");
//   }
// }

// function showPopup(message) {
//   const popup = document.createElement("div");
//   popup.className = "popup";
//   popup.innerText = message;
//   document.body.appendChild(popup);
//   setTimeout(() => {
//     popup.remove();
//   }, 2000);
// }

// window.addToCart = addToCart;

// window.addToWishlist = function (Id) {
//   wishlistCount++;
//   wishlist.innerText = wishlistCount;
// };

// renderProductList();
// cart.innerText = cartCount;

// document.addEventListener("DOMContentLoaded", () => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const loggedInUser = localStorage.getItem("loggedInUser");

//   const loginContainer = document.getElementById("login-container");

//   if (isLoggedIn && loginContainer) {
//     loginContainer.innerHTML = `
//       <span>Welcome, ${loggedInUser}</span>
//       <a href="#" id="signOut-button">Sign Out</a>
//     `;

//     const signOutButton = document.getElementById("signOut-button");
//     signOutButton.addEventListener("click", (e) => {
//       e.preventDefault();

//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("loggedInUser");

//       loginContainer.innerHTML = `
//         <a href= "login/login.html"> LogIn</a>

//            `;
//     });
//   }
// });

import { productInfo } from "./data/data.js";

let wishlist = document.getElementById("wishlist-count");
let productListContainer = document.getElementById("product-list");
let cart = document.getElementById("cart-count");

let cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];
let wishlistArr = JSON.parse(localStorage.getItem("wishlistItems")) || [];

let cartCount = cartArr.length;
let wishlistCount = wishlistArr.length;

// Function to Render Product List
function renderProductList() {
  let productIn = "";
  productInfo.forEach((product) => {
    const isInWishlist = wishlistArr.some((item) => item.Id === product.Id);
    productIn += `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}">
        <p>${product.brand}</p>
        <h3>${product.name}</h3>
        <p class="price">₹${product.price}</p>
        
        <button class="add-to-cart-btn" onclick="addToCart(${
          product.Id
        })">Add to Cart</button>
        
        <!-- Wishlist Heart Icon -->
        <span class="wishlist-icon ${
          isInWishlist ? "active" : ""
        }" onclick="addToWishlist(${product.Id})">
          &#9825;
        </span>
      </div>
    `;
  });
  productListContainer.innerHTML = productIn;
}

// Function to Add Product to Cart
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


window.addToWishlist = function (Id) {
  const product = productInfo.find((item) => item.Id === Id);

  if (!product) {
    console.error("Product not found");
    return;
  }

  const isInWishlist = wishlistArr.some((item) => item.Id === Id);
  if (isInWishlist) {
    
    wishlistArr = wishlistArr.filter((item) => item.Id !== Id);
    wishlistCount--;
    showPopup("Removed from your wishlist");
  } else {
    
    wishlistArr.push(product);
    wishlistCount++;
    showPopup("Added to your wishlist!");
  }

  wishlist.innerText = wishlistCount;
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr));
  renderProductList(); 
};


function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.innerText = message;
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.remove();
  }, 2000);
}


cart.innerText = cartCount;
wishlist.innerText = wishlistCount;

renderProductList();
