import { render, screen } from '@testing-library/react'
import {  describe } from 'vitest'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

describe('', () => {

  test('', async () => {
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
    render(<CreateForm postBlog={mockPost} blogs={blogs} setBlogs={mockSetBlogs} setNotificationMessage={mockNotify}/>)

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