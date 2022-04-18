import Input from "./Input"

const BlogForm = props => {
  const {
    handleBlogCreation,
    setTitle,
    setAuthor,
    setUrl,
    title,
    author,
    url
  } = props

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <Input 
          text='title:'
          type='text'
          value={title}
          handleChange={({target}) => setTitle(target.value)}
        />
        <Input 
          text='author:'
          type='text'
          value={author}
          handleChange={({target}) => setAuthor(target.value)}
        />
        <Input 
          text='url:'
          type='text'
          value={url}
          handleChange={({target}) => setUrl(target.value)}
        />
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm