const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const BlogPost = require('../src/blogPost')

describe('Middleware', () => {
  let joe, blogPost

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is great', content: 'Yup, awesome' })
    
    joe.blogPosts.push(blogPost)
  
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done())
  })

  it('users clean up dangling blogposts on remove', async () => {
      await joe.remove()
      const count = await BlogPost.count()
      assert(count === 0)
  })

})