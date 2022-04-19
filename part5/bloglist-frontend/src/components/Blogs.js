import Blog from "./Blog"

const Blogs = ({blogs, incrementLikesOf}) => (
  <>
    {blogs.map(blog =>
      <Blog 
        key={blog.id}
        blog={blog}
        incrementLikes={() => incrementLikesOf(blog.id)} 
      />
    )}
  </>
)

export default Blogs