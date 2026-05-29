const { test, expect, beforeEach, describe } = require('@playwright/test')
const { default: axios } = require('axios')

const login = async (page, username, password) => {
  await page.getByText('username').getByRole('textbox').fill(username)
  await page.getByText('password').getByRole('textbox').fill(password)
  await page.getByRole('button', { name: "Login"}).click()
}


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
      await login(page, testUsername, testPassword)

      await expect(page.getByRole('heading', { name: 'Login'})).toBeHidden()
      await expect(page.getByText(testName, {exact: false})).toBeVisible()
      await expect(page.getByRole('button', { name: 'Create Blog'})).toBeVisible()
    })
    test('Failed Login with wrong credentials', async( { page }) => {
      await login(page, testUsername.repeat(3), testPassword)

      await expect(page.getByRole('heading', { name: 'Login'})).toBeVisible()
      
      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Invalid username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async({ page }) => {
      await login(page, testUsername, testPassword)
    })

    test('Able to create a blog ', async ({ page}) => {
      const title = "New Blog title"
      const author = "New Author"
      const url = "New Blog Url"

      await page.getByRole('button', { name: 'Create Blog'} ).click()
      await page.getByPlaceholder('write title here').fill(title)
      await page.getByPlaceholder('write author here').fill(author)
      await page.getByPlaceholder('write url here').fill(url)
      await page.getByRole('button', {name: 'Create Blog'}).click()
      
      await expect(page.locator('#Blogs').getByText(title, {exact:false})).toBeVisible()
    })
  })


})