import { beforeEach, describe, expect } from 'vitest'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Blog Component tests', () => {
  const title = 'A new blog title'
  const author = 'Fake Author'
  const likeCount = 3
  const url = 'Fake Url'
  const mockLikeHandler = vi.fn()

  beforeEach(() => {
    const userData = {
      name: author
    }
    const blog = {
      title: title,
      author: author,
      likes: likeCount,
      url: url
    }

    render(<Blog blog={blog} user={userData} likeBlog={mockLikeHandler}/>)
    screen.debug()
  })


  test('render title and author at start', async () => {
  //{ blog, blogs, setBlogs, user }

    const element = screen.getByText(title, { exact:false })
    const urlElement = screen.queryByText(url, { exact:false })
    const likesElement = screen.queryByText('likes', { exact:false })

    expect(element).toBeVisible()
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()

  })

  test('like and url are visible after click', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const urlElement = screen.queryByText(url, { exact:false })
    const likesElement = screen.queryByText('likes', { exact:false })

    expect(urlElement).toBeVisible()
    expect(likesElement).toBeVisible()
  })

  test('likeBlog is called twice when clicked twice', async() => {



    const user = userEvent.setup()
    const showButton = screen.getByText('show')
    await user.click(showButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)

  })
})
