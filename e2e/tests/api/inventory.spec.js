import { test, request, expect } from '@playwright/test';
import defineConfig from '../../../playwright.config';

let context;

// Create new context before each test
test.beforeEach(async () => {
  context = await request.newContext();
});

test('Retrieve all models', async ({ }) => {

  // Send the API request
  const response = await context.post(
    `${defineConfig.use.apiBaseURL}/fps/personalization/v1/get?uid=86fa6dac-0e7e-444c-9697-96a6b0dcd706`,
    {
      headers: {
        "content-type": "application/json; charset=UTF-8"
      },
      data: {
        "uid": "86fa6dac-0e7e-444c-9697-96a6b0dcd706",
        "tagBrand": "Ford",
        "tagCountry": "USA",
        "referrer": "https://www.ford.com/",
        "entries": [
          { "key": "SpecificVehicleView", "value": "{}" }
        ],
        "testMode": false
      }
    }
  );

  const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{1,3}\+\d{2}:\d{2}$/

  // Validate the successful response
  expect(response.status()).toBe(200);
  expect(await response.statusText()).toBe('OK');
  const jsonResponse = await response.json();
  const data = jsonResponse[0].Value;

  data.forEach(vehicle => {
    // Assumed requirements
    expect(vehicle).toHaveProperty('_UID');
    expect(typeof vehicle._UID).toBe('string');
    expect(vehicle._UID.length).toBeGreaterThan(16);

    expect(vehicle).toHaveProperty('_appID');
    expect(typeof vehicle._appID).toBe('string');
    expect(vehicle._appID.length).toBeGreaterThan(1);

    /* Not every vehicle has _PAcode? */
    // expect(vehicle).toHaveProperty('_PAcode');
    // expect(typeof vehicle._PAcode).toBe('string');
    // expect(vehicle._appID.length).toBeGreaterThan(2);

    /* Not every vehicle has _ZIP? */
    // expect(vehicle).toHaveProperty('_ZIP');
    // expect(vehicle._ZIP).toMatch(/^\d{5}$/); // Ensures _ZIP is a 5-digit string

    expect(parseInt(vehicle._year)).toBeGreaterThanOrEqual(2024) // Ensure years are 2024+
    expect(vehicle).toHaveProperty('_brand', 'Ford'); // Ensure brand is 'Ford'
    expect(vehicle._nameplate.length).toBeGreaterThan(4); // Ensure model has more than 4 characters
    expect(vehicle).toHaveProperty('_trim'); // Esnure sub-model (trim) is present
    expect(typeof vehicle._trim).toBe('string'); // Ensure _trim is a string
    expect(vehicle.returnURL).toContain('https'); // Ensure URL contains https
    expect(vehicle.on).toMatch(dateRegex); // Assert date format
    expect(vehicle.count).toBeGreaterThanOrEqual(0); // Count should not be negative
    expect(vehicle.score).toBeGreaterThanOrEqual(0); // Score should be positive
    expect(vehicle.suffix.length).toBeGreaterThanOrEqual(0); // Score should be positive
    expect(vehicle.createdOn).toMatch(dateRegex);  // Assert date format
  });
});

test.afterEach(async () => {
  await context.dispose();
});
