class Cart {
    constructor() {
        this.availableProducts = [
            { id: 1, name: "Laptop", price: 999 },
            { id: 2, name: "Maus", price: 25 },
            { id: 3, name: "Tastatur", price: 50 },
            { id: 4, name: "Monitor", price: 200 },
            { id: 5, name: "Headset", price: 75 }
        ];
        this.products = [];
        this.discount = 0;
    }

    getAvailableProducts() {
        return this.availableProducts;
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
        if (product) {
            product.quantity--;
            if (product.quantity <= 0) {
                this.removeItem(productId); // Automatisch entfernen, wenn 0 erreicht
            }
        }
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

    addProductById(productId) {
        const product = this.availableProducts.find(p => p.id === productId);
        if (!product) return;

        const existingProduct = this.products.find(p => p.id === productId);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            this.products.push({ ...product, quantity: 1 });
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
