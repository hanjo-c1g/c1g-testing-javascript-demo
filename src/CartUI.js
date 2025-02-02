class CartUI {
    constructor(cart) {
        this.cart = cart;
        this.cartItems = document.getElementById("cart-items");
        this.totalPriceElement = document.getElementById("total-price");
        this.discountCodeInput = document.getElementById("discount-code");
        this.applyDiscountButton = document.getElementById("apply-discount");
        this.clearCartButton = document.getElementById("clear-cart");
        this.productList = document.getElementById("products");

        this.applyDiscountButton.addEventListener("click", () => {
            this.cart.applyDiscount(this.discountCodeInput.value);
            this.updateUI();
        });

        this.clearCartButton.addEventListener("click", () => {
            this.cart.clearCart();
            this.updateUI();
        });

        this.renderProductList();
    }

    updateUI() {
        this.cartItems.innerHTML = "";
        this.cart.products.forEach(product => {
            const stockInfo = this.cart.getAvailableProducts().find(p => p.id === product.id).stock;
            const remainingStock = stockInfo - product.quantity;

            const li = document.createElement("li");
            li.className = "cart-item";
            li.innerHTML = `
                ${product.name} - ${product.price}€ x ${product.quantity} (Lager: ${remainingStock})
                <button class="increase" data-id="${product.id}" ${remainingStock === 0 ? "disabled" : ""}>+</button>
                <button class="decrease" data-id="${product.id}">-</button>
                <button class="remove" data-id="${product.id}">🗑️</button>
            `;
            this.cartItems.appendChild(li);
        });

        this.totalPriceElement.textContent = `Gesamtpreis: ${this.cart.calculateTotalPrice().toFixed(2)}€`;
    }

    renderProductList() {
        this.productList.innerHTML = "";
        this.cart.getAvailableProducts().forEach(product => {
            const li = document.createElement("li");
            li.className = "product-item";
            li.innerHTML = `
                ${product.name} - ${product.price}€ (Lager: ${product.stock})
                <button class="add-to-cart" data-id="${product.id}" ${product.stock === 0 ? "disabled" : ""}>In den Warenkorb</button>
            `;
            this.productList.appendChild(li);
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const productId = parseInt(event.target.dataset.id);
                this.cart.addProductById(productId);
                this.updateUI();
            });
        });
    }
}

if (typeof window !== 'undefined') {
    window.CartUI = CartUI;
}
