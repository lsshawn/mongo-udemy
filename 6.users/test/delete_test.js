const assert = require('assert')
const User = require('../src/user')

describe('Deleting a user', () => {
  let joe
  
  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save()
      .then(() => done())
  })
  
  it('model instance remove', async () => {
    await joe.remove()
    const user = await User.findOne({ name: 'Joe' })
    assert(user === null)
  })
  
  it('class method remove', async () => {
    // remove a bunch of records
    await User.remove({ name: 'Joe' })
    const user = await User.findOne({ name: 'Joe' })
    assert(user === null)
  })
  
  it('class method findAndRemove', async () => {
    await User.findOneAndRemove({ name: 'Joe' })
    const user = await User.findOne({ name: 'Joe' })
    assert(user === null)    
  })
  
  it('class method findIdAndRemove', async () => {
    await User.findByIdAndRemove(joe._id)
    const user = await User.findOne({ name: 'Joe' })
    assert(user === null)    
  })  
})
