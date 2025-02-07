// @ts-check
import { test, expect } from '@playwright/test';

test.describe("Warenkorb UI Tests", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('file:///workspaces/c1g-testing-javascript-demo/src/index.html');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Warenkorb Demo/);
  });

  test('Seite lädt und Warenkorb ist initial leer', async ({ page }) => {
    const cartItems = await page.locator('#cart-items');
    await expect(cartItems).toBeEmpty();
  });

  test('Produkt hinzufügen und Warenkorb aktualisiert sich', async ({ page }) => {
    await page.click('button.add-to-cart:first-of-type');
    
    const cartItems = await page.locator('#cart-items');
    await expect(cartItems).not.toBeEmpty();
    await expect(cartItems).toContainText('x 1');
  });
});