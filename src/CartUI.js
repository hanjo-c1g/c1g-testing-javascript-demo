class CartUI {
    constructor(cart) {
        this.cart = cart;
        this.cartItems = document.getElementById("cart-items");
        this.totalPriceElement = document.getElementById("total-price");
        this.discountCodeInput = document.getElementById("discount-code");
        this.applyDiscountButton = document.getElementById("apply-discount");
        this.clearCartButton = document.getElementById("clear-cart");
        this.addRandomProductButton = document.getElementById("add-random-product");

        this.applyDiscountButton.addEventListener("click", () => {
            this.cart.applyDiscount(this.discountCodeInput.value);
            this.updateUI();
        });

        this.clearCartButton.addEventListener("click", () => {
            this.cart.clearCart();
            this.updateUI();
        });

        this.addRandomProductButton.addEventListener("click", () => {
            this.cart.addRandomProduct();
            this.updateUI();
        });
    }

    updateUI() {
        this.cartItems.innerHTML = "";
        this.cart.products.forEach(product => {
            const li = document.createElement("li");
            li.className = "cart-item";
            li.innerHTML = `
                ${product.name} - ${product.price}€ x ${product.quantity} 
                <button class="increase" data-id="${product.id}">+</button>
                <button class="decrease" data-id="${product.id}">-</button>
                <button class="remove" data-id="${product.id}">🗑️</button>
            `;
            this.cartItems.appendChild(li);
        });

        this.totalPriceElement.textContent = `Gesamtpreis: ${this.cart.calculateTotalPrice().toFixed(2)}€`;
    }
}

if (typeof window !== 'undefined') {
    window.CartUI = CartUI;
}
