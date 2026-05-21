import { expect } from 'vitest'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('render title and author at start', async () => {
  //{ blog, blogs, setBlogs, user }
  const title = 'A new blog title'
  const author = 'Fake Author'
  const likeCount = 3
  const url = 'Fake Url'

  const blog = {
    title: title,
    author: author,
    likes: likeCount,
    url: url
  }

  const userData = {
    name: author
  }

  render(<Blog blog={blog} user={userData} />)
  screen.debug()

  const element = screen.getByText(title, { exact:false })
  const urlElement = screen.queryByText(url, { exact:false })
  const likesElement = screen.queryByText('likes', { exact:false })

  expect(element).toBeVisible()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()

})