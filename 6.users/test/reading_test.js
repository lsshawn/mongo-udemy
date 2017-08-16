const assert = require('assert')
const User = require('../src/user')

describe('Reading users from database', () => {
  let joe, maria, alex, zech 

  beforeEach((done) => {
    alex = new User({ name: 'Alex' })
    zach = new User({ name: 'Zach' })
    maria = new User({ name: 'Maria' })
    joe = new User({ name: 'Joe' }) // don't declare const here. Your tests below can't reference 'joe'.
    
    Promise.all([ joe.save(), alex.save(), maria.save(), zach.save() ])
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
      })
  })

  // skip and limit
  it('can skip and limit the result set', async () => {
    const users = await User.find({})
      .sort({ name: 1 }) // sort ascending
      .skip(1)
      .limit(2)
    
    await assert(users.length === 2)
    await assert(users[0].name === 'Joe')
    await assert(users[1].name === 'Maria')
  })
})

