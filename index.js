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
                  <h3>${product.name}</h3>
                  <p>${product.brand}</p>
                  <p class="price">₹${product.price}</p>
                  <p class="stock">${
                    product.InStock ? "Available" : "Not Available"
                  }</p>
                  <button onclick="addToCart(${
                    product.Id
                  })">Add to Cart</button>
                  <button onclick="addToWishlist(${
                    product.Id
                  })">Add to Wishlist</button>
              </div>
          `;
  });
  productListContainer.innerHTML = productIn;
}

function addToCart(Id) {
  const product = productInfo.find((item) => item.Id === Id);
  if (product) {
    cartArr.push(product);
    cartCount++;
    cart.innerText = cartCount;
    localStorage.setItem("cartItems", JSON.stringify(cartArr));
    // renderCartItems();
  }
}

window.addToCart = addToCart;

window.addToWishlist = function (Id) {
  wishlistCount++;
  wishlist.innerText = wishlistCount;
};

renderProductList();
cart.innerText = cartCount;
// renderCartItems();

// const cartItemsContainerr = document.getElementById("cart-items");
// if (cartItemsContainerr) {
//   renderCartItems();
// } else {
//   console.error("Element with ID 'cart-items' not found.");
// }

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

  function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");

    popupMessage.textContent = message;

    popup.classList.remove("hidden");

    setTimeout(() => {
      closePopup();
    }, 1000);
  }

  function closePopup() {
    const popup = document.getElementById("popup");
    popup.classList.add("hidden");
  }
}

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
