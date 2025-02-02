document.addEventListener("DOMContentLoaded", () => {
    const cart = new Cart();
    const ui = new CartUI(cart);
    ui.updateUI();

    document.getElementById("cart-items").addEventListener("click", (event) => {
        const productId = parseInt(event.target.dataset.id);
        if (event.target.classList.contains("increase")) {
            cart.increaseQuantity(productId);
        } else if (event.target.classList.contains("decrease")) {
            cart.decreaseQuantity(productId);
        } else if (event.target.classList.contains("remove")) {
            cart.removeItem(productId);
        }
        ui.updateUI();
    });
});
