const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogList) => {
  const reducer = (total, {likes}) => {
    return total + likes;
  };

  return blogList.reduce(reducer, 0);
}

const favoriteBlog = (blogList) => {
  const mostLikesCount = 
    Math.max(...blogList.map(({likes}) => likes));

  const mostLikedBlog = blogList.find((blog) => 
    blog.likes === mostLikesCount
  );

  return mostLikedBlog;
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}