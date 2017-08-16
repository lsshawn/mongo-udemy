const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let joe;
  
  beforeEach( async () => {
    joe = new User({ name: 'Joe', postCount: 0 })
    await joe.save()
  })
  
  // helper function
  async function assertName(operation) {
    await operation
    const allUsers = await User.find({})
    
    assert(allUsers.length === 1)
    assert(allUsers[0].name === 'Alex')    
  }
  
  //// Instance Update
  
  // 'set and save' for piecemeal update
  it('instance set n save', async () => {
    await joe.set('name', 'Alex')
    const user = await joe.save()
    assertName(user)
  })
  
  // 'update' for bulk update
  it('A model instance can update', async () => {
    assertName(await joe.update({ name: 'Alex'}))
  })
  
  //// Model Update
  
  it('A model class can update', async () => {
    assertName(await User.update({ name: 'Joe' }, { name: 'Alex' }))
  })
  
  it('A model class can update one record', async () => {
    assertName(await User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }))
  })
  
  it('A model class can find a record with an ID and update', async () => {
    assertName(await User.findByIdAndUpdate(joe._id, { name: 'Alex' }))
  })
  
  it('A user can update their postcount by 1', async () => {
    await User.update({ name: 'Joe' }, { $inc: { postCount: 1 }})
    const user = await User.findOne({ name: 'Joe' })
    console.log(user)
    assert(user.postCount === 1)
  })
})
