export const EMAIL = '#email';
export const FIRST_NAME = '.cektnc5 [name="firstName"]';
export const LAST_NAME = '.cektnc5 [name="lastName"]';
export const COMPANY = '.cektnc5 [name="company"]';
export const STREET = '.cektnc5 [name="address1"]';
export const APARTMENT = '.cektnc5 [name="address2"]';
export const CITY = '.cektnc5 [name="city"]';
export const STATE = '.RD23h [name="zone"]';
export const ZIP_CODE = '.cektnc5 [name="postalCode"]';
export const PHONE = '.r62YW .cektnc5 [name="phone"]';
export const FLAT_RATE_SHIPPING = 'p:has-text("Flat Rate")';
export const CC_IFRAME = 'iframe[name^="card-fields-number"]';
export const CC_INPUT = 'input[name="number"]';
export const EXPIRY_IFRAME = 'iframe[name^="card-fields-expiry"]';
export const EXPIRY_INPUT = 'input[name="expiry"]';
export const CVV_IFRAME = 'iframe[name^="card-fields-verification"]';
export const CVV_INPUT = 'input[name="verification_value"]';
export const TOTAL = '._1x41w3p7 strong';

export async function getTotalPrice(page) {
  await page.waitForSelector(TOTAL);
  return (await page.locator(TOTAL).textContent())?.trim();
}

export function getCheckoutItemTitle(itemText) {
  return `p:has-text("${itemText}")`;
}

export function getCheckoutItemSize(itemText) {
  return `p:has-text("${itemText}")`;
}

export function getCheckoutItemColor(itemText) {
  return `p:has-text("${itemText}")`;
}