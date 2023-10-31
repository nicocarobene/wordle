import { test, expect } from '@playwright/test';

test('page have a title and heading', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await expect(page).toHaveTitle(/Wordle/);
  await expect(page.getByRole('heading', { name: 'Wordle' })).toBeVisible();
  })

test('Rae link is visible', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByText('a', { exact: true }).click();
  await page.getByText('r', { exact: true }).click();
  await page.getByText('b', { exact: true }).click();
  await page.getByText('o', { exact: true }).click();
  await page.getByText('l', { exact: true }).click();
  await page.getByText('NEXT').click();
  await expect(page.getByText('ARBOL')).toBeVisible();
  await expect(page.getByRole('link',{name:'RAE 📚'})).toBeVisible();
})

test('Show alert with written wrong word', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  page.on("dialog", async (alert) => {
    const text = alert.message();
    console.log(text);;
    expect(text).toBe('the word not exist in diccionary')
    await alert.accept();
  })
  await page.getByText('a', { exact: true }).click();
  await page.getByText('r', { exact: true }).click();
  await page.getByText('b', { exact: true }).click();
  await page.getByText('o', { exact: true }).click();
  await page.getByText('l', { exact: true }).click();
  await page.getByText('NEXT').click();
  await expect(page.getByText('ARBOL')).toBeVisible();
  await expect(page.getByRole('link',{name:'RAE 📚'})).toBeVisible();
  await page.getByText('d', { exact: true }).click();
  await page.locator('wordle-keyboard').getByText('e', { exact: true }).click({
    clickCount: 4
  });
  await page.getByText('NEXT').click();
  await expect(page.getByText('deeee')).toBeVisible()
  await page.getByText('BACK').click({
    clickCount: 5
  });
  await expect(page.getByText('deeee')).not.toBeVisible()
})


