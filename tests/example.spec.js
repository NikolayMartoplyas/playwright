// @ts-check
const { test, expect } = require('@playwright/test');
const { email, password, invalidEmail, invalidPassword } = require('../user');
test('authorization on the site', async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(password);
  await page.getByTestId('login-submit-btn').click();
  await page.waitForSelector("[data-testid='profile-programs-content']");
  await expect(page.locator("[data-testid='profile-programs-content']")).toContainText('Моё обучение');
});

test('Invalid authorization on the site', async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto('https://netology.ru/');
  await page.getByRole('link', { name: 'Войти' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(invalidEmail);
  await page.getByPlaceholder('Пароль').click();
  await page.getByPlaceholder('Пароль').fill(invalidPassword);
  await page.getByTestId('login-submit-btn').click();
  await expect(page.locator("[data-testid='login-error-hint']")).toHaveText('Вы ввели неправильно логин или пароль.');
});
