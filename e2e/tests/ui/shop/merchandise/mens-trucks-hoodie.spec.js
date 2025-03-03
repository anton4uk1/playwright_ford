import { test, expect } from '@playwright/test';
import { selectItemByAttributes } from '../../../../src/helpers/ui/shop/purchase-helpers';
import { fillOutShippingDetails, selectShippingMethod, fillOutPaymentDetails } from '../../../../src/helpers/util/page-actions';
import { getCheckoutItemTitle, getCheckoutItemSize, getCheckoutItemColor, getTotalPrice } from '../../../../src/selectors/merchandise/checkout-selectors';
import { FIRST_PRODUCT } from '../../../../src/selectors/merchandise/trucks-selectors';
import { PRODUCT_ITEM_SIZE_LRG, PRODUCT_ITEM_TITLE, PRODUCT_ITEM_COLOR } from '../../../../src/selectors/merchandise/product-listing-selectors';
import { ADD_TO_CART_BUTTON, CHECKOUT_BUTTON } from '../../../../src/selectors/merchandise/product-listing-selectors';

test.beforeEach(async ({ page }) => {
  await page.goto('https://merchandise.ford.com/collections/trucks/fleece#Start');
});

test('Sucessfully purchase first hoodie from the list (SIZE LRG) and (Flat Rate) shipping', async ({ page }) => {
  // Selecting first item from the list in (SIZE LRG)
  await selectItemByAttributes(page, FIRST_PRODUCT, PRODUCT_ITEM_SIZE_LRG);

  // Save product details for future assertion
  const productItemTitle = (await page.locator(PRODUCT_ITEM_TITLE).textContent()).trim();
  const productItemSize = (await page.locator(PRODUCT_ITEM_SIZE_LRG).textContent()).trim();
  const productItemColor = (await page.locator(PRODUCT_ITEM_COLOR).textContent()).trim();

  await page.locator(ADD_TO_CART_BUTTON).waitFor({ state: 'visible' });
  await page.locator(ADD_TO_CART_BUTTON).click();
  await page.locator(CHECKOUT_BUTTON).waitFor({ state: 'visible' });
  await page.locator(CHECKOUT_BUTTON).click();

  await fillOutShippingDetails(page);
  await selectShippingMethod(page);
  await fillOutPaymentDetails(page);

  // Save checkout details for future assertion
  const actualCheckoutItemTitle = getCheckoutItemTitle(productItemTitle)
  const checkoutItemTitle = (await page.locator(actualCheckoutItemTitle).textContent()).trim();

  const actualCheckoutItemSize = getCheckoutItemSize(productItemSize)
  const checkoutItemSize = (await page.locator(actualCheckoutItemSize).textContent()).trim();

  const actualCheckoutItemColor = getCheckoutItemColor(productItemColor)
  const checkoutItemColor = (await page.locator(actualCheckoutItemColor).textContent()).trim();

  // Comparing Checkout Details to Product Details
  expect(checkoutItemTitle).toEqual(productItemTitle);
  expect(checkoutItemSize).toContain(productItemSize);
  expect(checkoutItemColor).toContain(productItemColor);

  const totalPrice = await getTotalPrice(page);
  expect(totalPrice).toEqual('$59.81');
});