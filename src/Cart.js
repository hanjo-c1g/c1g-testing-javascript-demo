class Cart {
    constructor() {
        this.products = [
            { id: 1, name: "Laptop", price: 999, quantity: 1 },
            { id: 2, name: "Maus", price: 25, quantity: 1 },
            { id: 3, name: "Tastatur", price: 50, quantity: 1 },
            { id: 4, name: "Monitor", price: 200, quantity: 1 },
            { id: 5, name: "Headset", price: 75, quantity: 1 }
        ];
    }

    calculateTotalPrice() {
        return this.products.reduce((total, product) => total + product.price * product.quantity, 0);
    }

    increaseQuantity(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product) product.quantity++;
    }

    decreaseQuantity(productId) {
        const product = this.products.find(p => p.id === productId);
        if (product && product.quantity > 1) product.quantity--;
    }

    removeItem(productId) {
        this.products = this.products.filter(p => p.id !== productId);
    }
}

// ES6-Export für den Browser
if (typeof window !== 'undefined') {
    window.Cart = Cart;
}

// CommonJS-Export für Jest-Tests
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cart;
}
