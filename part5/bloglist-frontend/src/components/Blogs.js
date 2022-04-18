import Blog from "./Blog"

const Blogs = ({blogs}) => (
  <>
    <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
  </>
)

export default Blogs