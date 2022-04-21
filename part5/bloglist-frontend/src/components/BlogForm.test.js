import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls onSubmit with the right details', () => {
    const createBlog = jest.fn()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('blog title here')
    const authorInput = screen.getByPlaceholderText('blog author here')
    const urlInput = screen.getByPlaceholderText('blog url here')
    const submitButton = screen.getByText('create')

    userEvent.type(titleInput, 'Testing React Applications')
    userEvent.type(authorInput, 'Kent Dodds')
    userEvent.type(urlInput, 'testing.io')
    userEvent.click(submitButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing React Applications')
    expect(createBlog.mock.calls[0][0].author).toBe('Kent Dodds')
    expect(createBlog.mock.calls[0][0].url).toBe('testing.io')
  })
})