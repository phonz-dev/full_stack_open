import { useState } from 'react'

const Blog = props => {
  const {
    blog,
    incrementLikes,
    deleteBlog
  } = props

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    border: '1px solid black',
    borderRadius: '2px',
    margin: '5px 0',
    padding: '5px'
  }

  const removeButtonStyle = {
    border: '1px solid black',
    backgroundColor: '#8A2BE2',
    padding: 5,
    borderRadius: 5
  }

  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>
            {visible ? 'hide' : 'view'}
          </button>
        </div>

        <div style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={incrementLikes}>like</button>
          </div>
          <div>{blog.author}</div>
          <button
            onClick={deleteBlog}
            style={removeButtonStyle}>remove</button>
        </div>
      </div>

    </div>
  )
}

export default Blog