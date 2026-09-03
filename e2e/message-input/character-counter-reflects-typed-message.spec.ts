// spec: specs/plan.md
// seed: e2e/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Message input character counter', () => {
  test('character counter reflects typed message length', async ({ page }) => {
    // 1. Navigate to '/' and wait for landing view (heading 'How can I help?' visible, team config progress bar gone).
    await page.goto('/');
    await page.getByText('How can I help?').first().waitFor({ state: 'visible' });
    await expect(page).toHaveTitle('Multi-Agent - Custom Automation Engine');
    await expect(page.getByText('How can I help?')).toBeVisible();

    // 2. Locate prompt textbox and character counter element (text /^\d+\/5000$/).
    const promptTextbox = page.getByRole('textbox', { name: /Tell us what needs planning/i });
    const characterCounter = page.getByText(/^\d+\/5000$/);
    await expect(promptTextbox).toHaveValue('');
    await expect(characterCounter).toBeVisible();
    await expect(characterCounter).toHaveText('0/5000');

    // 3. Assert initial counter is '0/5000' with empty textbox.
    await expect(promptTextbox).toHaveValue('');
    await expect(characterCounter).toHaveText('0/5000');

    // 4. Click textbox, type 'Hi', verify counter shows '2/5000'.
    await promptTextbox.click();
    await promptTextbox.pressSequentially('Hi');
    await expect(promptTextbox).toHaveValue('Hi');
    await expect(characterCounter).toHaveText('2/5000');

    // 5. Append ' there, please plan my week.' to get 'Hi there, please plan my week.' (30 chars), verify counter shows '30/5000'.
    await promptTextbox.pressSequentially(' there, please plan my week.');
    await expect(promptTextbox).toHaveValue('Hi there, please plan my week.');
    await expect(characterCounter).toHaveText('30/5000');

    // 6. Clear textbox, verify counter returns to '0/5000'.
    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.press('Backspace');
    await expect(promptTextbox).toHaveValue('');
    await expect(characterCounter).toHaveText('0/5000');
  });
});
