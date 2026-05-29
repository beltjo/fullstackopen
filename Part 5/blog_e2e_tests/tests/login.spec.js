const { test, expect, beforeEach, describe } = require('@playwright/test')
const { default: axios } = require('axios')

describe('Blog app', () => {
  const testUsername = "test"
  const testPassword = "password"
  const testName = 'tester'
  beforeEach(async ({ page }) => {
    // Clear the database
    await axios.post('http://localhost:3003/api/testing/reset')

    // Create a test user
    await axios.post('http://localhost:3003/api/users', 
      {
      "username": testUsername,
      "password": testPassword,
      "name": testName
      }
    )

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

  describe('Test login', () => {
    test('Successiful login', async({page}) => {
      await page.getByText('username').getByRole('textbox').fill(testUsername)
      await page.getByText('password').getByRole('textbox').fill(testPassword)
      await page.getByRole('button', { name: "Login"}).click()

      await expect(page.getByRole('heading', { name: 'Login'})).toBeHidden()
      await expect(page.getByText(testName, {exact: false})).toBeVisible()
      await expect(page.getByRole('button', { name: 'Create Blog'})).toBeVisible()
    })
    test('Failed Login with wrong credentials', async( { page }) => {
      await page.getByText('username').getByRole('textbox').fill(testUsername.repeat(3))
      await page.getByText('password').getByRole('textbox').fill(testPassword)
      await page.getByRole('button', { name: "Login"}).click()

      await expect(page.getByRole('heading', { name: 'Login'})).toBeVisible()
      
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Invalid username or password')
    })
  })
})