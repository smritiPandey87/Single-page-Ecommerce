const wishlistContainer = document.getElementById("product-list");
let wishlistArr = JSON.parse(localStorage.getItem("wishlistItems")) || [];
let cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];

function renderWishlist() {
  if (wishlistArr.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty!</p>";
    return;
  }

  let wishlistHTML = "";
  wishlistArr.forEach((product) => {
    wishlistHTML += `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
        <p class="price">₹${product.price}</p>
        <button onclick="movetoBag(${product.Id})">Move To Bag</button>
        <button onclick="removeFromWishlist(${product.Id})">Remove</button>
      </div>
    `;
  });

  wishlistContainer.innerHTML = wishlistHTML;
}

function removeFromWishlist(Id) {
  wishlistArr = wishlistArr.filter((item) => item.Id !== Id);
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr));
  renderWishlist();
  updateWishlistCount();
}

function movetoBag(Id) {
  const product = wishlistArr.find((item) => item.Id === Id);

  if (!product) {
    console.error("Product not found in wishlist");
    return;
  }

  const isAlreadyInCart = cartArr.some((item) => item.Id === Id);
  if (isAlreadyInCart) {
    alert("This item is already in your cart!");
  } else {
    cartArr.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartArr));
    removeFromWishlist(Id);
    alert("Item has been moved to your cart!");
  }
}

function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlist-count");
  wishlistCount.innerText = wishlistArr.length;
}

document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();
  updateWishlistCount();
});
