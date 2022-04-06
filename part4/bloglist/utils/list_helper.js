const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const reducer = (total, { likes }) => {
    return total + likes;
  };

  return blogs.reduce(reducer, 0);
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null;

  const mostLikesCount = 
    Math.max(...blogs.map(({ likes }) => likes));

  const mostLikedBlog = blogs.find((blog) => 
    blog.likes === mostLikesCount
  );

  const { title, author, likes } = mostLikedBlog;

  return { title, author, likes };
}

const mostBlogs = (blogs) => {
  const authorsBlogCount = _.countBy(blogs, 'author');
  const mostBlogsCount = Math.max(..._.values(authorsBlogCount));

  let authorWithMostBlogs = null;
  for (let author in authorsBlogCount) {
    let count = authorsBlogCount[author];

    if (count === mostBlogsCount) {
      authorWithMostBlogs = {author, blogs: count};
    }
  }

  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}