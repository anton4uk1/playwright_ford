import { chooseAndConfirmSelection } from '../../../helpers/util/page-actions';
import { F150_KING_RANCH } from '../../../selectors/trucks/f150/choose-your-model-selectors';

export const selectModel = async (page, vehicleModel = F150_KING_RANCH) => {
  await page.waitForSelector(vehicleModel, { state: 'visible', timeout: 10000 });
  await page.locator(vehicleModel).click();
}

export const setVehicleOptions = async (page, options) => {
  for (const option of options) {
    await chooseAndConfirmSelection(page, option.selector);
    await page.waitForLoadState('load');
  }
};