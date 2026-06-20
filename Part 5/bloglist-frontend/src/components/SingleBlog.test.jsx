import { beforeEach, describe, expect } from 'vitest'
import SingleBlog from './SingleBlog'
import { render, screen } from '@testing-library/react'


describe('Single blog view tests', () => {
  const title = 'A new blog title'
  const author = 'Fake Author'
  const likeCount = 3
  const url = 'Fake Url'
  const poster = 'Fake Poster'
  const mockDeleteHandler = vi.fn()
  const mockLikeHandler = vi.fn()

  beforeEach(() => {
  })


  test('Info displayed to non-logged in users', () => {
    const user = null
    const blog = {
      title: title,
      author: author,
      likes: likeCount,
      url: url,
      user: {
        name: poster
      }
    }

    render(<SingleBlog blog={blog} deleteBlog={mockDeleteHandler} likeBlog={mockLikeHandler} user={user}></SingleBlog>)

    const titleElement = screen.getByText(title, { exact: false })
    const authorElement = screen.getByText(author, { exact: false })
    const likeElement = screen.getByText(likeCount, { exact: false })
    const posterElement = screen.getByText(poster, { exact: false })

    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
    expect(likeElement).toBeVisible()
    expect(posterElement).toBeVisible()

    const likeButton = screen.queryByText('like')
    const deleteButton = screen.queryByText('delete')

    expect(likeButton).toBeNull()
    expect(deleteButton).toBeNull()

  })

  test('Non-owners logged in can see the like button', () => {
    const user = {
      name: 'New User'
    }
    const blog = {
      title: title,
      author: author,
      likes: likeCount,
      url: url,
      user: {
        name: poster
      }
    }

    render(<SingleBlog blog={blog} deleteBlog={mockDeleteHandler} likeBlog={mockLikeHandler} user={user}></SingleBlog>)

    const titleElement = screen.getByText(title, { exact: false })
    const authorElement = screen.getByText(author, { exact: false })
    const likeElement = screen.getByText(likeCount, { exact: false })
    const posterElement = screen.getByText(poster, { exact: false })

    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
    expect(likeElement).toBeVisible()
    expect(posterElement).toBeVisible()

    const likeButton = screen.getByText('like')
    const deleteButton = screen.queryByText('delete')

    expect(likeButton).toBeVisible()
    expect(deleteButton).toBeNull()
  })

  test('Blog creater can see delete', () => {
    const user = {
      name: poster
    }
    const blog = {
      title: title,
      author: author,
      likes: likeCount,
      url: url,
      user: {
        name: poster
      }
    }

    render(<SingleBlog blog={blog} deleteBlog={mockDeleteHandler} likeBlog={mockLikeHandler} user={user}></SingleBlog>)

    const titleElement = screen.getByText(title, { exact: false })
    const authorElement = screen.getByText(author, { exact: false })
    const likeElement = screen.getByText(likeCount, { exact: false })
    const posterElement = screen.getByText(poster, { exact: false })

    expect(titleElement).toBeVisible()
    expect(authorElement).toBeVisible()
    expect(likeElement).toBeVisible()
    expect(posterElement).toBeVisible()

    const likeButton = screen.getByText('like')
    const deleteButton = screen.getByText('delete')

    expect(likeButton).toBeVisible()
    expect(deleteButton).toBeVisible()
  })
})