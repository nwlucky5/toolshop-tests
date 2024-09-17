import { HandToolsPage } from '../../../src/pages/hand-tools.page';
import { Product } from '../../../src/pages/product.page';
import test, { expect } from '@playwright/test';

test.describe('Adding product to shopping cart verification', () => {
  let handToolsPage: HandToolsPage;
  let productPage: Product;

  test.beforeEach(async ({ page }) => {
    handToolsPage = new HandToolsPage(page);
    productPage = new Product(page);

    await handToolsPage.goto();
  });

  test('add product to shopping cart with quantity equal to 1', async () => {
    // Arrange
    const expectedNotificationMessageText = 'Product added to shopping cart';

    // Act
    await handToolsPage.firstProduct.click();
    await productPage.addToCart();

    // Assert
    await expect(productPage.notificationMessageText).toContainText(
      expectedNotificationMessageText,
    );
  });

  test('add product to shopping cart with quantity greater than 1', async () => {
    // Arrange
    const expectedNotificationMessageText = 'Product added to shopping cart';

    // Act
    await handToolsPage.firstProduct.click();
    await productPage.addToCart('100');

    // Assert
    await expect(productPage.notificationMessageText).toContainText(
      expectedNotificationMessageText,
    );
  });

  test('reject adding product to shopping cart with negative quantity', async () => {
    // Act
    await handToolsPage.firstProduct.click();
    await productPage.addToCart('-1');

    // Assert
    await expect(productPage.notificationMessageText).toBeHidden();
  });

  test('reject adding product to shopping cart with quantity equal to 0', async () => {
    // Act
    await handToolsPage.firstProduct.click();
    await productPage.addToCart('0');

    // Assert
    await expect(productPage.notificationMessageText).toBeHidden();
  });

  test('reject adding out of stock product to shopping cart', async () => {
    // Act
    await handToolsPage.productOutOfStock.click();

    // Assert
    await expect(productPage.addToCartButton).toBeDisabled();
  });
});
