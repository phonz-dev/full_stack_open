const _ = require('lodash')

const dummy = (blogs) => {
	console.log(blogs)
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (total, { likes }) => {
		return total + likes
	}

	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	if (!blogs.length) return null

	const mostLikesCount =
    Math.max(...blogs.map(({ likes }) => likes))

	const mostLikedBlog = blogs.find((blog) =>
		blog.likes === mostLikesCount
	)

	const { title, author, likes } = mostLikedBlog

	return { title, author, likes }
}

const mostBlogs = (blogs) => {
	const authorsBlogCount = _.countBy(blogs, 'author')
	const mostBlogsCount = Math.max(..._.values(authorsBlogCount))

	let authorWithMostBlogs = null
	for (let author in authorsBlogCount) {
		let count = authorsBlogCount[author]

		if (count === mostBlogsCount) {
			authorWithMostBlogs = { author, blogs: count }
		}
	}

	return authorWithMostBlogs
}

const mostLikes = (blogs) => {
	if (!blogs.length) return null

	const authorsLikeCount = blogs.reduce((counts, { author, likes }) => {
		if (author in counts) {
			counts[author] += likes
		} else {
			counts[author] = likes
		}

		return counts
	}, {})

	const mostLikesCount = Math.max(..._.values(authorsLikeCount))

	let authorWithMostLikes = null
	for (let author in authorsLikeCount) {
		let likes = authorsLikeCount[author]

		if (likes === mostLikesCount) {
			authorWithMostLikes = { author, likes }
		}
	}

	return authorWithMostLikes
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}