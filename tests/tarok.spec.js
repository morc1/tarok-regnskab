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

test('round can end with normal last trick only and go to scoring', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="no"]').check();
  await page.locator('#wizNext').click();
  await expect(page.locator('#specialGrid')).toContainText('Ingen ned-begivenheder.');
  await page.locator('#wizApply').click();

  await expect(page.locator('#scoreSection')).toBeVisible();
  await expect(page.locator('#roundBalance')).toHaveText('Balancerer');
  await expect(page.locator('#totalWealth')).toHaveText('1600');
  await expect(page.locator('#lastAction')).toContainText('Resultat registreret');
  await expect(page.locator('#kongeValue')).toHaveText('80');
  await expect(page.locator('#pagatValue')).toHaveText('80');
});

test('round can end with king down and go to scoring', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="no"]').check();
  await page.locator('#wizNext').click();
  await page.locator('#nedActor').selectOption('1');
  await page.locator('input[name="nedTypeR"][value="king"]').check();
  await page.locator('#wizAddNed').click();
  await expect(page.locator('#specialGrid')).toContainText('Bent: Kong ned');
  await page.locator('#wizApply').click();

  await expect(page.locator('#scoreSection')).toBeVisible();
  await expect(page.locator('#kongeValue')).toHaveText('160');
  await expect(page.locator('#roundBalance')).toHaveText('Balancerer');
  await expect(page.locator('#totalWealth')).toHaveText('1600');
});

test('round can end with king ultimo and go to scoring', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="king"]').check();
  await page.locator('#wizNext').click();
  await page.locator('#wizApply').click();

  await expect(page.locator('#scoreSection')).toBeVisible();
  await expect(page.locator('#kongeValue')).toHaveText('0');
  await expect(page.locator('#roundBalance')).toHaveText('Balancerer');
  await expect(page.locator('#totalWealth')).toHaveText('1600');
});

test('round can end with pagat ultimo and go to scoring', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="pagat"]').check();
  await page.locator('#wizNext').click();
  await page.locator('#wizApply').click();

  await expect(page.locator('#scoreSection')).toBeVisible();
  await expect(page.locator('#pagatValue')).toHaveText('0');
  await expect(page.locator('#roundBalance')).toHaveText('Balancerer');
  await expect(page.locator('#totalWealth')).toHaveText('1600');
});

test('round can end with pagat down and go to scoring', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="no"]').check();
  await page.locator('#wizNext').click();
  await page.locator('#nedActor').selectOption('1');
  await page.locator('input[name="nedTypeR"][value="pagat"]').check();
  await page.locator('#wizAddNed').click();
  await expect(page.locator('#specialGrid')).toContainText('Bent: Pagat ned');
  await page.locator('#wizApply').click();

  await expect(page.locator('#scoreSection')).toBeVisible();
  await expect(page.locator('#pagatValue')).toHaveText('160');
  await expect(page.locator('#roundBalance')).toHaveText('Balancerer');
  await expect(page.locator('#totalWealth')).toHaveText('1600');
});

test('pagat down option is not available after pagat ultimo', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="pagat"]').check();
  await page.locator('#wizNext').click();

  await expect(page.locator('input[name="nedTypeR"][value="pagat"]')).toHaveCount(0);
  await expect(page.locator('#specialGrid')).toContainText('Konge gik kan registreres op til');
});

test('king lost can be registered four times when no king ultimo or king down applies', async ({ page }) => {
  await startPlayPhase(page);

  for (const player of ['0', '1', '3', '0']) {
    await page.locator('#kingEventPlayer').selectOption(player);
    await page.locator('#kingLostBtn').click();
  }

  await expect(page.locator('#playActions')).toContainText('Konge gik (4/4)');
  await expect(page.locator('#playActions')).toContainText('Tilbage: 0');
  await expect(page.locator('#kingLostBtn')).toBeDisabled();
});

test('play-phase king lost limit drops to three after king ultimo result is applied', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="king"]').check();
  await page.locator('#wizNext').click();
  await expect(page.locator('#specialGrid')).toContainText('Konge gik kan registreres op til 3 gange i denne omgang.');
});

test('king lost limit drops to three in wizard after king ultimo', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="king"]').check();
  await page.locator('#wizNext').click();

  await expect(page.locator('#specialGrid')).toContainText('Konge gik kan registreres op til 3 gange i denne omgang.');
  await expect(page.locator('#specialGrid')).not.toContainText('Konge gik kan registreres op til 4 gange i denne omgang.');
});

test('king lost limit drops to three in wizard after king down is added', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="no"]').check();
  await page.locator('#wizNext').click();
  await expect(page.locator('#specialGrid')).toContainText('Konge gik kan registreres op til 4 gange i denne omgang.');

  await page.locator('#nedActor').selectOption('1');
  await page.locator('input[name="nedTypeR"][value="king"]').check();
  await page.locator('#wizAddNed').click();

  await expect(page.locator('#specialGrid')).toContainText('Konge gik kan registreres op til 3 gange i denne omgang.');
  await expect(page.locator('#specialGrid')).not.toContainText('Konge gik kan registreres op til 4 gange i denne omgang.');
});

test('undo after direct nolo returns to trick-play wizard start', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('input[name="noloR"][value="yes"]').check();
  await page.locator('#noloPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('#wizApply').click();
  await expect(page.locator('#closeRoundBtn')).toBeVisible();

  await page.locator('#undoBtn').click();

  await expect(page.locator('#closeRoundBtn')).toBeHidden();
  await expect(page.locator('#scoreSection')).toBeHidden();
  await expect(page.locator('#specialGrid')).toContainText('1/4 — Nolo');
  await expect(page.locator('#centerPhase')).toHaveText('Spil');
});

test('king ultimo round can be scored and closed into history', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="king"]').check();
  await page.locator('#wizNext').click();
  await page.locator('#wizApply').click();

  await page.locator('#countPlayer0').fill('26');
  await page.locator('#countPlayer1').fill('26');
  await page.locator('#countPlayer3').fill('26');
  await page.locator('#applyScoreBtn').click();
  await page.locator('#closeRoundBtn').click();

  await expect(page.locator('#historyList')).toContainText('Omgang 1');
  await expect(page.locator('#historyList')).toContainText('ultimere konge');
  await expect(page.locator('#headerState')).toContainText('Omgang 2');
});

test('pagat down round can be scored and closed into history', async ({ page }) => {
  await startPlayPhase(page);

  await page.locator('#wizNext').click();
  await page.locator('#lastTrickPlayer').selectOption('0');
  await page.locator('#wizNext').click();
  await page.locator('input[name="ultimoR"][value="no"]').check();
  await page.locator('#wizNext').click();
  await page.locator('#nedActor').selectOption('1');
  await page.locator('input[name="nedTypeR"][value="pagat"]').check();
  await page.locator('#wizAddNed').click();
  await page.locator('#wizApply').click();

  await page.locator('#countPlayer0').fill('26');
  await page.locator('#countPlayer1').fill('26');
  await page.locator('#countPlayer3').fill('26');
  await page.locator('#applyScoreBtn').click();
  await page.locator('#closeRoundBtn').click();

  await expect(page.locator('#historyList')).toContainText('Omgang 1');
  await expect(page.locator('#historyList')).toContainText('pagat ned');
  await expect(page.locator('#headerState')).toContainText('Omgang 2');
});

test('exported json can be imported back and restore session state', async ({ page }) => {
  await openApp(page);

  await page.locator('#sessionTitle').fill('Gem og indlæs test');
  await page.locator('#applySettingsBtn').click();
  await page.locator('#namePlayer0').fill('Alice');
  await page.locator('#namePlayer1').fill('Bob');
  await page.locator('#namePlayer2').fill('Clara');
  await page.locator('#namePlayer3').fill('David');
  await page.locator('#applyNamesBtn').click();
  await page.locator('#dealerFeeBtn').click();

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#exportBtn').click();
  const download = await downloadPromise;
  const downloadPath = await download.path();

  await page.locator('#sessionTitle').fill('Muteret session');
  await page.locator('#applySettingsBtn').click();
  await expect(page.locator('#sessionName')).toHaveText('Muteret session');
  await expect(page.locator('#lastAction')).toContainText('Session sat til 4 spillere');

  page.on('dialog', dialog => dialog.accept());
  await page.locator('#importFile').setInputFiles(downloadPath);

  await expect(page.locator('#sessionName')).toHaveText('Gem og indlæs test');
  await expect(page.locator('#namePlayer0')).toHaveValue('Alice');
  await expect(page.locator('#namePlayer1')).toHaveValue('Bob');
  await expect(page.locator('#namePlayer2')).toHaveValue('Clara');
  await expect(page.locator('#namePlayer3')).toHaveValue('David');
  await expect(page.locator('#lastAction')).toContainText('Kopper fyldt automatisk og giverbetaling bogført');
});

test('name changes work in 3-player setup', async ({ page }) => {
  await openApp(page);

  await page.locator('#playerCountSelect').selectOption('3');
  await page.locator('#applySettingsBtn').click();

  await expect(page.locator('#namePlayer0')).toBeVisible();
  await expect(page.locator('#namePlayer1')).toBeVisible();
  await expect(page.locator('#namePlayer2')).toBeVisible();
  await expect(page.locator('#namePlayer3')).toBeHidden();

  await page.locator('#namePlayer0').fill('Asta');
  await page.locator('#namePlayer1').fill('Bo');
  await page.locator('#namePlayer2').fill('Carl');
  await page.locator('#applyNamesBtn').click();

  await expect(page.locator('#namePlayer0')).toHaveValue('Asta');
  await expect(page.locator('#namePlayer1')).toHaveValue('Bo');
  await expect(page.locator('#namePlayer2')).toHaveValue('Carl');
  await expect(page.locator('#centerMeta')).toContainText('Aktive: Asta, Bo, Carl');
  await expect(page.locator('body')).toContainText('Asta');
  await expect(page.locator('body')).toContainText('Bo');
  await expect(page.locator('body')).toContainText('Carl');
  await expect(page.locator('#lastAction')).toContainText('Spillernavne opdateret');
});
