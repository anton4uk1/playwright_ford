export const selectItemByAttributes = async (page, itemSelector, sizeSelector) => {
  await page.locator(itemSelector).click();
  await page.locator(sizeSelector).click();
};