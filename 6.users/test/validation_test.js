const assert = require('assert')
const User = require('../src/user')

describe('Validating records', () => {
  it('requires a user name', () => {
      const user = new User({ name: undefined })
      // use validationResult() for async or more complex validations
      const validationResult = user.validateSync()
      const { message } = validationResult.errors.name

      assert(message === 'Name is required')
  })

  it('requires a user name longer than 2 characters', () => {
    const user = new User({ name: 'Al' })
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name

    assert(message === 'Name must be longer than 2 characters.')
  })

  it('disallows invalid records from being saved', async () => {
    const user = new User({ name: 'Al' })
    try {
      await user.save()
    } catch (validationResult) {
      const { message } = validationResult.errors.name
      assert(message === 'Name must be longer than 2 characters.')
    }
  })
})