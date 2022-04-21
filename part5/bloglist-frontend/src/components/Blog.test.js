import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const incrementLikes = jest.fn()
    const deleteBlog = jest.fn()
    const blog = {
      title: 'Testing React Applications',
      author: 'Kent Dodds',
      url: 'testingreact.io',
      likes: 1034
    }

    container = render(
      <Blog
        blog={blog}
        deleteBlog={deleteBlog}
        incrementLikes={incrementLikes}
      />
    ).container
  })

  test('at first, only renders blog\'s title and author', async () => {
    await screen.findByText('Testing React Applications Kent Dodds')

    const hiddenElement = container.querySelector('.toggledComponent')
    expect(hiddenElement).toHaveStyle('display: none')
  })

  test('toggles more blog details when view button is clicked', () => {
    const viewButton = screen.getByText('view')
    userEvent.click(viewButton)

    const hiddenBlogDetails = container.querySelector('.toggledComponent')
    expect(hiddenBlogDetails).not.toHaveStyle('display: none')
  })
})