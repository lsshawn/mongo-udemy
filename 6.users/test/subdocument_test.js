const assert = require('assert')
const User = require('../src/user')

describe('Subdocuments', () => {
  it('can create a subdocument', async () => {
    const joe = new User({
      name: 'Joe', 
      posts: [{ title: 'PostTitle' }] 
    })

    await joe.save()
    const user = await User.findOne({ name: 'Joe' })
    await assert(user.posts[0].title === 'PostTitle') 
  })

  it('can add subdocuments to existing records', async () => {
    const joe = new User({
      name: 'Joe',
      posts: []
    })

    await joe.save()
    const user = await User.findOne({ name: 'Joe' })
    await user.posts.push({ title: 'New Post' })
    await user.save()

    const userFound = await User.findOne({ name: 'Joe' })
    await assert(userFound.posts[0].title === 'New Post') 
  })

  it('can remove an existing subdocuments', async () => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    })
    await joe.save()

    const user = await User.findOne({ name: 'Joe' })
    const post = await user.posts[0]
    await post.remove()
    await user.save()

    const userFound = await User.findOne({ name: 'Joe' })
    assert(userFound.posts.length === 0)
  })
})