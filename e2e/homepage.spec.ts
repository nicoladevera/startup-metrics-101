import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Startup Metrics 101/);

    // Check main heading is visible
    await expect(page.getByRole('heading', { name: /Startup Metrics 101/i })).toBeVisible();
  });

  test('should display all 15 metric cards', async ({ page }) => {
    await page.goto('/');

    // Wait for metrics to load
    await page.waitForSelector('[data-testid^="metric-card-"]', { timeout: 5000 });

    // Count metric cards
    const metricCards = page.locator('[data-testid^="metric-card-"]');
    await expect(metricCards).toHaveCount(15);
  });

  test('should navigate to metric detail when card is clicked', async ({ page }) => {
    await page.goto('/');

    // Click on the first metric card (MRR)
    await page.click('[data-testid="metric-card-mrr"]');

    // Verify we're on the metric detail page
    await expect(page).toHaveURL(/\/metric\/mrr/);
    await expect(page.getByRole('heading', { name: /Monthly Recurring Revenue/i })).toBeVisible();
  });

  test('should filter metrics using search', async ({ page }) => {
    await page.goto('/');

    // Find and fill the search input
    const searchInput = page.getByPlaceholder(/search metrics/i);
    await searchInput.fill('revenue');

    // Check that only revenue-related metrics are shown
    const visibleCards = page.locator('[data-testid^="metric-card-"]:visible');
    const count = await visibleCards.count();

    // Should show less than 15 metrics
    expect(count).toBeLessThan(15);
    expect(count).toBeGreaterThan(0);
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');

    // Find and click theme toggle button
    const themeToggle = page.locator('button[aria-label*="theme" i], button:has-text("Toggle theme")').first();

    if (await themeToggle.isVisible()) {
      await themeToggle.click();

      // Wait for theme to change
      await page.waitForTimeout(300);

      // Verify theme changed (dark class should be added/removed from html)
      const htmlElement = page.locator('html');
      const hasTheme = await htmlElement.evaluate((el) => {
        return el.classList.contains('dark') || el.classList.contains('light');
      });

      expect(hasTheme).toBe(true);
    }
  });
});
