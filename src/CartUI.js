class CartUI {
    constructor(cart) {
        this.cart = cart;
        this.cartItems = document.getElementById("cart-items");
        this.totalPriceElement = document.getElementById("total-price");
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
        this.totalPriceElement.textContent = `Gesamtpreis: ${this.cart.calculateTotalPrice()}€`;
    }
}

// ES6-Export für den Browser
if (typeof window !== 'undefined') {
    window.CartUI = CartUI;
}
