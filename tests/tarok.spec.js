const { test, expect } = require('@playwright/test');

async function openApp(page) {
  await page.goto('http://127.0.0.1:4173/tarok_v2.html');
}

async function startPlayPhase(page) {
  await openApp(page);
  await page.locator('#dealerFeeBtn').click();
  await page.locator('#goAnnouncementsBtn').click();
  await page.locator('#goPlayBtn').click();
}

test('nolo direct closes round without scoring', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('input[name="noloR"][value="yes"]').check();
  await page.locator('#noloPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('#wizApply').click();

  await expect(page.locator('#scoreSection')).toBeHidden();
  await expect(page.locator('#closeRoundBtn')).toBeVisible();
  await expect(page.locator('#lastAction')).toContainText('Resultat registreret');
  await expect(page.locator('#roundBalance')).toHaveText('Balancerer');
  await expect(page.locator('#totalWealth')).toHaveText('1600');
});

test('nolo with king down stays balanced and closes directly', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('input[name="noloR"][value="yes"]').check();
  await page.locator('#noloPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('#nedActor').selectOption('1');
  await page.locator('input[name="nedTypeR"][value="king"]').check();
  await page.locator('#wizAddNed').click();
  await expect(page.locator('#specialGrid')).toContainText('Bent: Kong ned');
  await page.locator('#wizApply').click();

  await expect(page.locator('#scoreSection')).toBeHidden();
  await expect(page.locator('#closeRoundBtn')).toBeVisible();
  await expect(page.locator('#kongeValue')).toHaveText('160');
  await expect(page.locator('#roundBalance')).toHaveText('Balancerer');
  await expect(page.locator('#totalWealth')).toHaveText('1600');
});

test('nolo with pagat down stays balanced and closes directly', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('input[name="noloR"][value="yes"]').check();
  await page.locator('#noloPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('#nedActor').selectOption('1');
  await page.locator('input[name="nedTypeR"][value="pagat"]').check();
  await page.locator('#wizAddNed').click();
  await expect(page.locator('#specialGrid')).toContainText('Bent: Pagat ned');
  await page.locator('#wizApply').click();

  await expect(page.locator('#scoreSection')).toBeHidden();
  await expect(page.locator('#closeRoundBtn')).toBeVisible();
  await expect(page.locator('#pagatValue')).toHaveText('160');
  await expect(page.locator('#roundBalance')).toHaveText('Balancerer');
  await expect(page.locator('#totalWealth')).toHaveText('1600');
});
