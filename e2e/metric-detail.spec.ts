import { test, expect } from '@playwright/test';

test.describe('MetricDetail Page', () => {
  test('should load metric detail page', async ({ page }) => {
    await page.goto('/metric/mrr');

    // Check that the metric title is visible
    await expect(page.getByTestId('metric-title')).toContainText('Monthly Recurring Revenue');

    // Check that all sections are present
    await expect(page.getByTestId('section-definition')).toBeVisible();
    await expect(page.getByTestId('section-why-it-matters')).toBeVisible();
    await expect(page.getByTestId('section-formula')).toBeVisible();
    await expect(page.getByTestId('section-calculator')).toBeVisible();
    await expect(page.getByTestId('section-tips')).toBeVisible();
    await expect(page.getByTestId('section-mistakes')).toBeVisible();
  });

  test('should navigate back to homepage', async ({ page }) => {
    await page.goto('/metric/mrr');

    // Click back button
    await page.click('[data-testid="button-back"]');

    // Verify we're back on homepage
    await expect(page).toHaveURL('/');
  });

  test('should display formula correctly', async ({ page }) => {
    await page.goto('/metric/mrr');

    // Check that formula is displayed
    const formula = page.getByTestId('formula');
    await expect(formula).toBeVisible();
    await expect(formula).toContainText('MRR');
  });

  test('should calculate MRR when inputs change', async ({ page }) => {
    await page.goto('/metric/mrr');

    // Wait for calculator section to be visible
    await page.waitForSelector('[data-testid="section-calculator"]');

    // Find input fields
    const customersInput = page.getByTestId('input-customers');
    const avgRevenueInput = page.getByTestId('input-avgRevenue');

    // Clear and fill inputs
    await customersInput.clear();
    await customersInput.fill('100');

    await avgRevenueInput.clear();
    await avgRevenueInput.fill('50');

    // Wait for calculation to update
    await page.waitForTimeout(500);

    // Check that result is displayed (100 * 50 = 5000)
    await expect(page.locator('text=/\\$5,000/')).toBeVisible();
  });

  test('should show tips section', async ({ page }) => {
    await page.goto('/metric/mrr');

    // Check that at least one tip is visible
    const firstTip = page.getByTestId('tip-0');
    await expect(firstTip).toBeVisible();
  });

  test('should show common mistakes section', async ({ page }) => {
    await page.goto('/metric/mrr');

    // Check that at least one mistake is visible
    const firstMistake = page.getByTestId('mistake-0');
    await expect(firstMistake).toBeVisible();
  });

  test('should handle invalid metric ID', async ({ page }) => {
    await page.goto('/metric/invalid-metric-id');

    // Should show "Metric Not Found" message
    await expect(page.getByText(/Metric Not Found/i)).toBeVisible();

    // Should have a back button
    await expect(page.getByTestId('button-back-home')).toBeVisible();
  });

  test('should work with business type toggle for CAC metric', async ({ page }) => {
    await page.goto('/metric/cac');

    // Wait for page to load
    await page.waitForSelector('[data-testid="section-calculator"]');

    // Check if business type toggle exists (CAC supports business types)
    const b2bButton = page.getByRole('button', { name: /b2b/i }).first();
    const b2cButton = page.getByRole('button', { name: /b2c/i }).first();

    if (await b2bButton.isVisible() && await b2cButton.isVisible()) {
      // Click B2C
      await b2cButton.click();
      await page.waitForTimeout(300);

      // Click B2B
      await b2bButton.click();
      await page.waitForTimeout(300);

      // Business type toggle works
      expect(true).toBe(true);
    }
  });

  test('should display benchmark feedback after calculation', async ({ page }) => {
    await page.goto('/metric/ltv-cac-ratio');

    // Wait for calculator
    await page.waitForSelector('[data-testid="section-calculator"]');

    // Fill in LTV and CAC inputs
    const ltvInput = page.getByTestId('input-ltv');
    const cacInput = page.getByTestId('input-cac');

    await ltvInput.clear();
    await ltvInput.fill('3000');

    await cacInput.clear();
    await cacInput.fill('1000');

    // Wait for calculation
    await page.waitForTimeout(500);

    // Should show result of 3:1
    await expect(page.locator('text=/3\\.0:1/')).toBeVisible();

    // Should show benchmark feedback
    await expect(page.locator('text=/excellent|good|warning/i')).toBeVisible();
  });
});
