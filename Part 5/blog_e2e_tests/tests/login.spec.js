const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    const loginHeader = page.getByRole('heading', { name: 'Login' })
    const username = page.getByText('username')
    const password = page.getByText('password')
    await expect(loginHeader).toBeVisible()
    await expect(username).toBeVisible()
    await expect(password).toBeVisible()
  })
})