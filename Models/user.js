const mongoose = require('mongoose');
const { Schema } = mongoose;


const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,20}(?:\.[a-zA-Z]{2})?)$/,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
