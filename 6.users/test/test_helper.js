const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

// only 1 time
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', {
    useMongoClient: true
  })

  mongoose.connection
    .once('open', () => { done() }) // allow testing now
    .on('error', (error) => console.warn('Warning', error))
})

// hook
beforeEach((done) => {
  // mongoose lowercase all collection name to lowercase and send to mongodb
  const { users, comments, blogposts } = mongoose.connection.collections 
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
})  