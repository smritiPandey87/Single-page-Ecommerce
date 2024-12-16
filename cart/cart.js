document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  let cartArr = JSON.parse(localStorage.getItem("cartItems")) || [];

  function renderCartItems() {
    if (cartArr.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
      document.getElementById("checkout-button-container").innerHTML = ""; 
      return;
    }

    cartItemsContainer.innerHTML = "";

    cartArr.forEach((item) => {
      if (!item.numberOfUnits) {
        item.numberOfUnits = 0;
      }

      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>Brand: ${item.brand}</p>
            <p>Price: ₹${item.price}</p>
            <div class="cart-item-controls">
              <button class="btn minus" onclick="changeNumberOfUnits('minus', ${
                item.Id
              })">-</button>
              <span class="number">${item.numberOfUnits}</span>
              <button class="btn plus" onclick="changeNumberOfUnits('plus', ${
                item.Id
              })">+</button>
            </div>
            <p>Total: ₹<span id="total-price-${item.Id}">${
        item.numberOfUnits * item.price
      }</span></p>
          </div>
        `;
      cartItemsContainer.appendChild(cartItem);
    });

    updateCartTotal();
    renderCheckoutButton();
  }

  window.changeNumberOfUnits = (action, id) => {
    cartArr = cartArr.map((item) => {
      if (item.Id === id) {
        if (action === "minus" && item.numberOfUnits > 0) {
          item.numberOfUnits--;
        } else if (action === "plus") {
          item.numberOfUnits++;
        }
      }
      return item;
    });

    updateCart();
  };

  function updateCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartArr));
    renderCartItems();
  }

  function updateCartTotal() {
    let cartTotal = 0;
    cartArr.forEach((item) => {
      cartTotal += item.numberOfUnits * item.price;
    });
    document.getElementById("cart-total").innerText = `Total: ₹${cartTotal}`;
  }

  function renderCheckoutButton() {
    const checkoutContainer = document.getElementById(
      "checkout-button-container"
    );
    if (cartArr.length > 0) {
      checkoutContainer.innerHTML = `
        <button class="btn" id="checkout-button">Proceed to Checkout</button>
      `;
      const checkoutButton = document.getElementById("checkout-button");
      checkoutButton.addEventListener("click", () => {
        window.location.href = "../checkout/check.html";
      });
    } else {
      checkoutContainer.innerHTML = ""; 
    }
  }

  renderCartItems();
});
