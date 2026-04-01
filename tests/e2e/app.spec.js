import { test, expect } from '@playwright/test';

test.describe('Cocodona 250 Runner Dashboard', () => {
  test('page loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Cocodona/);
  });

  test('header renders with race info', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Cocodona', { exact: true })).toBeVisible();
    await expect(page.getByText('252.9 miles')).toBeVisible();
  });

  test('tab navigation - all 8 tabs load without crashing', async ({ page }) => {
    await page.goto('/');

    const tabNames = [
      'Map',
      'Aid Stations',
      'Race Summary',
      'Schedule',
      'Required Gear',
      'Key Rules',
      'Course Info',
      'Pacing',
    ];

    for (const tab of tabNames) {
      await page.getByRole('button', { name: tab, exact: true }).click();
      // Verify the page still has content (no crash)
      await expect(page.locator('.min-h-screen')).toBeVisible();
    }
  });

  test('Map tab renders Leaflet map', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Map', exact: true }).click();
    await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 10000 });
  });

  test('Aid Stations tab shows stations and expands on click', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Aid Stations', exact: true }).click();

    // Verify station list renders with station names
    await expect(page.getByText('Cottonwood Creek')).toBeVisible({ timeout: 5000 });

    // Click the first station row to expand it
    await page.getByText('Start Line').click();

    // Verify expanded content appears (My Plan button)
    await expect(page.getByText('My Plan')).toBeVisible({ timeout: 5000 });
  });

  test('Schedule tab shows race schedule', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Schedule', exact: true }).click();
    await expect(page.getByText('Mon May 4')).toBeVisible();
  });

  test('Required Gear tab shows gear list', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Required Gear', exact: true }).click();
    await expect(page.getByText('Cell Phone')).toBeVisible();
  });

  test('Key Rules tab shows rules', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Key Rules', exact: true }).click();
    await expect(page.getByText('No Outside Aid')).toBeVisible();
  });

  test('Course Info tab shows course stats', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Course Info', exact: true }).click();
    await expect(page.getByText('252.9')).toBeVisible();
    await expect(page.getByText("40,667'")).toBeVisible();
  });

  test('Pacing tab renders input form', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Pacing', exact: true }).click();
    // Look for the input fields (Base Pace, Target Finish, Pack Weight)
    await expect(page.locator('input[type="number"]').first()).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Base Pace')).toBeVisible();
  });

  test('Race Summary tab renders a table', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Race Summary', exact: true }).click();
    await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
  });
});
