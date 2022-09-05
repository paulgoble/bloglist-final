const dummy = blogs => {
  return 1;
}

const totalLikes = blogs => {
  let totalLikes = 0;
  for (let blog of blogs) {
    totalLikes += blog.likes;
  }
  return totalLikes;
}

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes);
  likes.sort().reverse();
  return blogs.find(blog => blog.likes === likes[0])
}

const mostBlogs = blogs => {
  let authors = [];
  blogs
    .map(blog => blog.author)
    .forEach(author => {
      let numberBlogs = blogs.filter(blog => blog.author === author).length;
      authors.push({ author: author, blogs: numberBlogs })
    })
    
  return authors.reduce((a, b) => a.blogs > b.blogs ? a : b);
}

const mostLikes = blogs => {
  const authors = blogs
    .map(blog => { 
      return { author: blog.author, likes: blog.likes }
    })
       
  const mostLiked = authors.reduce((a, b) => a.likes > b.likes ? a : b)

  let totalLikes = 0;
  blogs
    .filter(blog => blog.author === mostLiked.author)
    .forEach(blog => totalLikes += blog.likes)
  return { author: mostLiked.author, likes: totalLikes };
}

module.exports = { 
  dummy, 
  totalLikes, 
  favoriteBlog, 
  mostBlogs,
  mostLikes 
}