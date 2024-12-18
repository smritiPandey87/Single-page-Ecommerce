
const wishlistContainer = document.getElementById("product-list");


let wishlistArr = JSON.parse(localStorage.getItem("wishlistItems")) || [];


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
        <button onclick="removeFromWishlist(${product.Id})">Remove</button>
      </div>
    `;
  });

  wishlistContainer.innerHTML = wishlistHTML;
}


function removeFromWishlist(Id) {
  wishlistArr = wishlistArr.filter((item) => item.Id !== Id);
  localStorage.setItem("wishlistItems", JSON.stringify(wishlistArr));
  renderWishlist(); // Re-render the wishlist
  updateWishlistCount();
}


function updateWishlistCount() {
  const wishlistCount = document.getElementById("wishlist-count");
  wishlistCount.innerText = wishlistArr.length;
}


document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();
  updateWishlistCount();
});
