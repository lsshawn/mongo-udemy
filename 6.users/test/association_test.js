const mongoose = require('mongoose')
const assert = require('assert')
const User = require('../src/user')
const Comment = require('../src/comment')
const BlogPost = require('../src/blogPost')

describe('Associations', () => {
  let joe, blogPost, comment  // instances

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    blogPost = new BlogPost({ title: 'JS is great', content: 'Yup, awesome' })
    comment = new Comment({ content: 'Congrats on great post'})

    joe.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = joe

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
  })

  // populating queries
  it('saves a relation between a user and a blogpost', async () => {
    const user = await User.findOne({ name: 'Joe' }).populate('blogPosts')
    await assert(user.blogPosts[0].title === 'JS is great')
  })

  // lading deeply nested associations
  it('saves a full relation graph', async () => {
    const user = await User.findOne({ name: 'Joe' }).populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',  
        populate: {
          path: 'user',
          model: 'user'
        }
      }
    })

    await assert(user.name === 'Joe')
    await assert(user.blogPosts[0].title === 'JS is great')
    await assert(user.blogPosts[0].comments[0].content === 'Congrats on great post')
    await assert(user.blogPosts[0].comments[0].user.name === 'Joe')
  })
})