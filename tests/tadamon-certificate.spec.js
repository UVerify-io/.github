const { test, expect } = require('@playwright/test');

test('CSO certificate is present on app.uverify.io', async ({ page }) => {
  const url = 'https://app.uverify.io/verify/72799343f99f7d411bb267973bf927cf0c2f31c9bc9975726e52346d71e3c750/1';
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  // Give the page a moment to settle for dynamic content.
  await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
  await expect(page.getByText('CSO Certificate', { exact: false })).toBeVisible({ timeout: 30000 });
});