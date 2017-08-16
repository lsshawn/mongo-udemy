const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PostSchema = require('./post')

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required']
  },
  posts: [PostSchema], // just an example of subdocuments
  likes: Number,
  blogPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]  
})

//// Virtual functions

// function() is a must for ES6 getters and setters
// => will make 'this' refers to this entire file

UserSchema.virtual('postCount').get(function() {
  return this.posts.length
})

//// Middleware to clean up deleted users and related blogpost
UserSchema.pre('remove', function(next) {
  const BlogPost = mongoose.model('blogPost')
  
  // don't iterate each record with .each
  // this === joe
  BlogPost.remove({ _id: { $in: this.blogPosts }})
    .then(() => next())
})
  
const User = mongoose.model('user', UserSchema)

module.exports = User