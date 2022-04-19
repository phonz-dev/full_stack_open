import Blog from "./Blog"

const Blogs = props => {
  const {
    blogs, 
    incrementLikesOf,
    deleteBlogOf
  } = props

  return (
    <>
    {blogs.map(blog =>
      <Blog 
        key={blog.id}
        blog={blog}
        incrementLikes={() => incrementLikesOf(blog.id)}
        deleteBlog={() => deleteBlogOf(blog.id)}
      />
    )}
  </>
  )
}

export default Blogs