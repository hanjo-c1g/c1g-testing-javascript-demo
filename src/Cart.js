class Cart {
    constructor() {
        this.products = [
            { id: 1, name: "Laptop", price: 999, quantity: 1 },
            { id: 2, name: "Maus", price: 25, quantity: 1 },
            { id: 3, name: "Tastatur", price: 50, quantity: 1 },
            { id: 4, name: "Monitor", price: 200, quantity: 1 },
            { id: 5, name: "Headset", price: 75, quantity: 1 }
        ];
        this.discount = 0;
    }

    calculateTotalPrice() {
        let total = this.products.reduce((sum, product) => sum + product.price * product.quantity, 0);
        return total * (1 - this.discount / 100);
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

    clearCart() {
        this.products = [];
        this.discount = 0;
    }

    applyDiscount(code) {
        if (code === "SAVE10") {
            this.discount = 10;
        } else if (code === "SAVE20") {
            this.discount = 20;
        } else {
            this.discount = 0;
        }
    }

    addRandomProduct() {
        const allProducts = [
            { id: 6, name: "Tablet", price: 499, quantity: 1 },
            { id: 7, name: "Smartphone", price: 799, quantity: 1 },
            { id: 8, name: "Drucker", price: 150, quantity: 1 },
            { id: 9, name: "Webcam", price: 89, quantity: 1 },
            { id: 10, name: "USB-Stick", price: 20, quantity: 1 }
        ];

        const randomProduct = allProducts[Math.floor(Math.random() * allProducts.length)];

        if (!this.products.find(p => p.id === randomProduct.id)) {
            this.products.push(randomProduct);
        } else {
            this.increaseQuantity(randomProduct.id);
        }
    }
}

// **Export für Browser**
if (typeof window !== 'undefined') {
    window.Cart = Cart;
}

// **CommonJS-Export für Jest-Tests**
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cart;
}
