import { expect } from '@playwright/test';
import { userArnold } from '../../fixtures/const/sample-users';
import { VEHICLE_BUILD_ZIP_CODE, SUBMIT_LOCATION, START_YOUR_BUILD } from "../../selectors/trucks/build-and-price-selectors";
import { COOKIES_BOX_CLOSE_BUTTON, BUILD_AND_PRICE } from "../../selectors/trucks/f150/vehicle-homepage-selectors";
import {
  EMAIL, FIRST_NAME, LAST_NAME, COMPANY, STREET, APARTMENT, CITY,
  STATE, ZIP_CODE, PHONE, CC_IFRAME, CC_INPUT, EXPIRY_IFRAME, EXPIRY_INPUT,
  CVV_IFRAME, CVV_INPUT,
  FLAT_RATE_SHIPPING
} from '../../../src/selectors/merchandise/checkout-selectors';

export const chooseAndConfirmSelection = async (page, selector) => {
  const option = page.locator(selector);

  await expect(option).toBeEnabled();
  await option.scrollIntoViewIfNeeded();
  await option.waitFor({ state: 'visible' });
  await option.click({ force: true });
  await page.locator(selector).waitFor({ has: page.locator('[aria-checked="true"]') });
  await expect(option).toHaveAttribute('aria-checked', 'true');
};

export const fillOutField = async (page, selector, value) => {
  await page.locator(selector).fill(value);
};

export const fillOutFrameField = async (page, frameSelector, inputSelector, value) => {
  const frameElement = await page.waitForSelector(frameSelector);
  const frameName = await frameElement.getAttribute('name');

  if (!frameName) {
    throw new Error(`Frame name not found for selector: ${frameSelector}`);
  }

  const frame = page.frameLocator(`iframe[name="${frameName}"]`);

  await frame.locator(inputSelector).waitFor({ state: 'visible' });
  await frame.locator(inputSelector).fill(value);
};

export const fillOutShippingDetails = async (page, user = userArnold) => {
  await fillOutField(page, EMAIL, user.email);
  await fillOutField(page, FIRST_NAME, user.firstName);
  await fillOutField(page, LAST_NAME, user.lastName);
  await fillOutField(page, COMPANY, user.company);
  await fillOutField(page, STREET, user.street);
  await fillOutField(page, APARTMENT, user.apartment);
  await fillOutField(page, CITY, user.city);
  await page.locator(STATE).selectOption(user.state);
  await fillOutField(page, ZIP_CODE, user.zip);
  await fillOutField(page, PHONE, user.phone);
};

export const fillOutPaymentDetails = async (page, user = userArnold) => {
  await fillOutFrameField(page, CC_IFRAME, CC_INPUT, user.cc_number);
  await fillOutFrameField(page, EXPIRY_IFRAME, EXPIRY_INPUT, user.cc_expiration);
  await fillOutFrameField(page, CVV_IFRAME, CVV_INPUT, user.cc_security_code);
};

export const selectShippingMethod = async (page, method = FLAT_RATE_SHIPPING) => {
  const shippingSelector = page.locator(method);

  await expect(shippingSelector).toBeVisible();
  await shippingSelector.click();
};

export const startVehicleBuild = async (page, zipCode = userArnold.zip) => {
  await page.locator(COOKIES_BOX_CLOSE_BUTTON).click();
  await page.locator(BUILD_AND_PRICE).click();
  await page.locator(VEHICLE_BUILD_ZIP_CODE).fill(zipCode);
  await page.locator(SUBMIT_LOCATION).click();
  await page.getByText(START_YOUR_BUILD).click();
}