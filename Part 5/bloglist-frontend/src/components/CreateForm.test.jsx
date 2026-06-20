import { render, screen } from '@testing-library/react'
import {  describe } from 'vitest'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
describe('', () => {

  //Not planning to test at the moment.
  test.skip('', async () => {
    const mockSetBlogs = vi.fn()
    const user = userEvent.setup()
    const title = 'TestTitle'
    const author = 'TestAuthor'
    const url = 'TestUrl'
    const blogs = []
    const mockPost = vi.fn()
    const mockNotify = vi.fn()
    mockPost.mockImplementationOnce(() => {
      return { title: title,
        author: author,
        url: url
      }
    })
    render(<Router>
      <Routes >
        <Route path='/' element={<div>Home <a href='/blog/create'>Create</a></div>}> </Route>
        <Route index path='/blog/create' element={
          <CreateForm postBlog={mockPost} blogs={blogs} setBlogs={mockSetBlogs} setNotificationMessage={mockNotify}/>
        }/>
      </Routes>

    </Router>)
    screen.debug()
    await screen.getByText('Create').click()
    screen.debug()
    const titleInput = screen.getByPlaceholderText('write title here')
    await user.type(titleInput, title)

    const authorInput = screen.getByPlaceholderText('write author here')
    await user.type(authorInput, author)

    const urlInput = screen.getByPlaceholderText('write url here')
    await user.type(urlInput, url)

    screen.debug()
    const submitButton = screen.getByText('Create Blog')
    await user.click(submitButton)


    console.log(mockPost.mock.calls[0][0])
    expect(mockPost.mock.calls[0][0].title).toBe(title)
    expect(mockPost.mock.calls[0][0].author).toBe(author)
    expect(mockPost.mock.calls[0][0].url).toBe(url)
  })

})