import { pageObjectTest } from '../fixtures/page-object.fixture';
import { HandToolsPage } from '../pages/hand-tools.page';
import { ProductPage } from '../pages/product.page';

interface ProductInCartContext {
  handToolsPage: HandToolsPage;
  productPage: ProductPage;
}

interface ProductInCartFixtures {
  addProductToCart: ProductInCartContext;
}

export const productInCart = pageObjectTest.extend<ProductInCartFixtures>({
  addProductToCart: async ({ productPage, handToolsPage }, use) => {
    await handToolsPage.firstProduct.click();
    await productPage.addToCart();
    await use({ productPage, handToolsPage });
  },
});
