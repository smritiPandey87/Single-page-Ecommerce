document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.createElement("div");
  cartItemsContainer.id = "checkout-items";
  document.body.appendChild(cartItemsContainer);

  const totalPriceContainer = document.createElement("p");
  totalPriceContainer.id = "checkout-total";
  document.body.appendChild(totalPriceContainer);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalAmount = 0;

  function renderCheckoutItems() {
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      totalPriceContainer.innerText = "Total: ₹0";
      return;
    }

    cartItemsContainer.innerHTML = "";

    cartItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "checkout-item";
      itemDiv.innerHTML = `
          <div>
            <img src="${item.img}" alt="${item.name}" class="checkout-item-img">
          </div>
          <div class="checkout-item-details">
            <h4>${item.name}</h4>
            <p>Brand: ${item.brand}</p>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.numberOfUnits}</p>
            <p>Subtotal: ₹${item.price * item.numberOfUnits}</p>
            <button class="btn remove" data-index="${index}">Remove</button>
          </div>
        `;

      cartItemsContainer.appendChild(itemDiv);
    });

    updateTotalPrice();
  }

  function updateTotalPrice() {
    totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.numberOfUnits,
      0
    );
  }

  cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove")) {
      const itemIndex = event.target.getAttribute("data-index");
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCheckoutItems();
    }
  });

  renderCheckoutItems();
});
