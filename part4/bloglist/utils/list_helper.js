const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogList) => {
  const reducer = (total, {likes}) => {
    return total + likes;
  };

  return blogList.reduce(reducer, 0);
}

module.exports = {
  dummy,
  totalLikes
}