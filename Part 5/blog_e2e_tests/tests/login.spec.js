const { test, expect, beforeEach, describe } = require('@playwright/test')
const { default: axios } = require('axios')

const login = async (page, username, password) => {
  await page.getByText('username').getByRole('textbox').fill(username)
  await page.getByText('password').getByRole('textbox').fill(password)
  await page.getByRole('button', { name: "Login"}).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Create Blog'} ).click()
  await page.getByPlaceholder('write title here').fill(title)
  await page.getByPlaceholder('write author here').fill(author)
  await page.getByPlaceholder('write url here').fill(url)
  await page.waitForTimeout(500)
  await page.getByRole('button', {name: 'Create Blog'}).click()
  await page.getByRole('button', {name: 'Cancel'} ).click()
  await page.waitForTimeout(7000)
}

describe('Blog app', () => {
  const testUsername = "test"
  const testPassword = "password"
  const testName = 'tester'
  const testUsername2 = "test2"
  const testName2 = 'tester2'
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

    // Create a second test user
    await axios.post('http://localhost:3003/api/users', 
      {
      "username": testUsername2,
      "password": testPassword,
      "name": testName2
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

    describe('Interacting with blogs', ()=> {
      const targetBlogText = "test blog"
      const initialLikes = 0
      beforeEach(async({ page }) => {
        //Need to set up a few blogs to start with.
        //await axios.post()
        const testBlogs = [ 
          {
              "title": "10 speedrunning tricks.",
              "author": "Simple",
              "url": "fake_url",
              "likes": 2
          },
          {
              "title": targetBlogText,
              "author": "tester",
              "url": "fake_url",
              "likes": initialLikes
          }
        ]

        await createBlog(page, targetBlogText, testName, "fake_url")
        await createBlog(page, "10 speedrunning tricks.", "Simple", "faker_url")
      })

      test('Able to like a blog', async({page}) => {

        await page
            .getByRole('button',{ name: "show"}).first()
            .click()
        await page
          .getByRole("button", { name: "like"})
          .click()
          
        await expect(page.getByText(`likes ${initialLikes + 1}`)).toBeVisible()
      })

      test('Able to delete a blog', async ( { page })=> {
        await page
            .getByRole('button',{ name: "show"}).first()
            .click()
        
        page.on('dialog', dialog => dialog.accept());
        await page
          .getByRole("button", { name: "delete"})
          .click()
        await expect(page.getByText(targetBlogText)).toBeHidden()
      })

      test('Only the owner of a blog can delete it.', async({ page }) => {
        //See the delete is not there.
        await page 
          .getByRole('button', { name : "show"}).nth(1)
          .click()
        
        await expect(page.getByRole('button', { name: "delete"})).toBeHidden()

      })
      
      test('Blogs are ordered by likes', async ( {page}) => {
        const buttons = await page
          .getByRole('button',{ name: "show"})

        await page
          .getByRole('button',{ name: "show"})
          .first()
          .click()

        await page
          .getByRole("button", { name: "like"})
          .click()

        await page
          .getByRole('button',{ name: "show"})
          .click()
        
        const divs = await page.getByText('likes', {exact: false}).all()
        const likeCounts = []
        for (const div of divs) {
          console.log('Inner text:')
          console.log(await div.innerText())
          let rawText = await div.innerText()
          let likeCount = rawText.split(" ")[1]
          likeCounts.push(likeCount)
        }
        expect(parseInt(likeCounts[0]) > parseInt(likeCounts[1])).toBeTruthy()
        
      })
    })
    
  })


})