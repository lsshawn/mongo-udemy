const assert = require('assert')
const User = require('../src/user')

describe('Reading users from database', () => {
  
  beforeEach((done) => {
    joe = new User({ name: 'Joe' }) // don't declare const here. Your tests below can't reference 'joe'.
    joe.save()
      .then(() => done())
  })
  
  it('finds all users with a name of Joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString()) // _id is ObjectId()
        done()
    })
  })
  
  it('find a user with a specific id', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user.name === 'Joe')
        done()
      } )
  })

})