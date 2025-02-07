const Cart = require("../src/Cart");

test("Berechnet den Gesamtpreis korrekt", () => {
    const cart = new Cart();
    cart.addProductById(1); // Laptop hinzufügen (999€)
    cart.addProductById(2); // Maus hinzufügen (25€)
    expect(cart.calculateTotalPrice()).toBe(999 + 25);
});

test("Erhöht die Anzahl eines Produkts", () => {
    const cart = new Cart();
    cart.addProductById(1);
    cart.increaseQuantity(1);
    expect(cart.products.find(p => p.id === 1).quantity).toBe(2);
});

test("Verringert die Anzahl eines Produkts", () => {
    const cart = new Cart();
    cart.addProductById(1);
    cart.increaseQuantity(1);
    cart.decreaseQuantity(1);
    expect(cart.products.find(p => p.id === 1).quantity).toBe(1);
    
    // und entfernt item aus warenkorb, wenn <= 0
    cart.decreaseQuantity(1);
    expect(cart.products.find(p => p.id === 1)).toBeUndefined();
});

test("Entfernt ein Produkt aus dem Warenkorb", () => {
    const cart = new Cart();
    cart.addProductById(1);
    cart.removeItem(1);
    expect(cart.products.find(p => p.id === 1)).toBeUndefined();
});

test("Warenkorb wird korrekt zurück gesetzt", () => {
    const cart = new Cart();
    cart.addProductById(1);
    cart.applyDiscount("SAVE10");
    
    expect(cart.discount).toBe(10);

    cart.clearCart();

    expect(cart.products).toHaveLength(0);
    expect(cart.discount).toBe(0);
})

test("Discount is applied", () => {
    const cart = new Cart();
    cart.addProductById(1);
    cart.applyDiscount("SAVE20");
    
    expect(cart.discount).toBe(20);

    cart.applyDiscount("");

    expect(cart.discount).toBe(0);
})

test("Add product if stock is limited", () => {
    const cart = new Cart();
    cart.addProductById(1);
    cart.increaseQuantity(1);
    cart.increaseQuantity(1);
    cart.increaseQuantity(1);
    cart.addProductById(1);
    expect(cart.products.find(p => p.id === 1).quantity).toBe(5);

    cart.addProductById(1);
    expect(cart.products.find(p => p.id === 1).quantity).toBe(5);
})

test("Gibt die verfügbaren Produkte korrekt zurück", () => {
    const cart = new Cart();
    expect(cart.getAvailableProducts()).toHaveLength(5);
});

test("Fügt kein Produkt hinzu, wenn die ID ungültig ist", () => {
    const cart = new Cart();
    cart.addProductById(999); // Nicht existierende ID
    expect(cart.products).toHaveLength(0);
});