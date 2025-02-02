const Cart = require("../src/Cart");

test("Berechnet den Gesamtpreis korrekt", () => {
    const cart = new Cart();
    cart.products[0].quantity = 2; // Laptop x2 (999 * 2)
    expect(cart.calculateTotalPrice()).toBe(1998 + 25 + 50 + 200 + 75);
});

test("Erhöht die Anzahl eines Produkts", () => {
    const cart = new Cart();
    cart.increaseQuantity(1);
    expect(cart.products.find(p => p.id === 1).quantity).toBe(2);
});

test("Verringert die Anzahl eines Produkts", () => {
    const cart = new Cart();
    cart.products[0].quantity = 2;
    cart.decreaseQuantity(1);
    expect(cart.products.find(p => p.id === 1).quantity).toBe(1);
});

test("Entfernt ein Produkt aus dem Warenkorb", () => {
    const cart = new Cart();
    cart.removeItem(1);
    expect(cart.products.find(p => p.id === 1)).toBeUndefined();
});