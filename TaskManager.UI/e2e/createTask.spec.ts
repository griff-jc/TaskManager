import { expect, test } from '@playwright/test';

test('view task will navigate to task details', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('row').nth(2).getByRole('button').click();
  await page.getByRole('button', { name: 'Edit' }).click();
  await expect(page.locator('h2')).toContainText('Edit Task');
});

test('task creation, into newly created task view', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByRole('button', { name: 'Add Data' }).click();
  await page.getByRole('textbox', { name: 'Title *' }).click();
  await page.getByRole('textbox', { name: 'Title *' }).fill('Test task');
  await page.getByRole('textbox', { name: 'Description' }).fill('A description');
  await page.getByText('Mark as completed immediately').click();
  await page.getByRole('button', { name: 'Create Task' }).click();
  await page.getByRole('button', { name: 'Next page' }).click();
  await page.getByRole('row').last().getByRole('button').click();
  await expect(page.locator('h2')).toContainText('Test task');
  await expect(page.locator('mat-card-content')).toContainText('A description');
});