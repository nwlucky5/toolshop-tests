import { MainMenuComponent } from '@_src/ui/components/main-menu.component';
import { BasePage } from '@_src/ui/pages/base.page';
import { Page } from '@playwright/test';

export class ProductPage extends BasePage {
  addToCartButton = this.page.locator('[data-test="add-to-cart"]');
  quantityField = this.page.locator('[data-test="quantity"]');
  increaseQuantityButton = this.page.locator('[data-test="increase-quantity"]');
  decreaseQuantityButton = this.page.locator('[data-test="decrease-quantity"]');
  notificationMessageText = this.page.getByLabel('Product added to shopping');

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);

  async addToCart(productQuantity?: string): Promise<void> {
    let quantity: string;
    if (productQuantity) quantity = productQuantity;
    else quantity = '1';

    await this.quantityField.fill(quantity);
    await this.addToCartButton.click();
  }
}
