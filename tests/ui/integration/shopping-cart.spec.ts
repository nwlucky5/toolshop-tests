import { expect, test } from '@_src/fixtures/merge.fixture';

test.describe('Adding product to shopping cart verification', () => {
  test('add product to shopping cart with quantity equal to 1', async ({
    handToolsPage,
    productPage,
  }) => {
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

  test('add product to shopping cart with quantity greater than 1', async ({
    handToolsPage,
    productPage,
  }) => {
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

  test('reject adding product to shopping cart with negative quantity', async ({
    handToolsPage,
    productPage,
  }) => {
    // Act
    await handToolsPage.firstProduct.click();
    await productPage.addToCart('-1');

    // Assert
    await expect(productPage.notificationMessageText).toBeHidden();
  });

  test('reject adding product to shopping cart with quantity equal to 0', async ({
    handToolsPage,
    productPage,
  }) => {
    // Act
    await handToolsPage.firstProduct.click();
    await productPage.addToCart('0');

    // Assert
    await expect(productPage.notificationMessageText).toBeHidden();
  });

  test('reject adding out of stock product to shopping cart', async ({
    handToolsPage,
    productPage,
  }) => {
    // Act
    await handToolsPage.productOutOfStock.click();

    // Assert
    await expect(productPage.addToCartButton).toBeDisabled();
  });
});
