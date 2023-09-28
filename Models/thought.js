const mongoose = require('mongoose');
const { Schema } = mongoose;


const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280, // Maximum 280 characters
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => {
      
      return new Date(createdAt).toISOString();
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      
      reactionId: mongoose.Types.ObjectId,
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280, // Maximum 280 characters
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => {
         
          return new Date(createdAt).toISOString();
        },
      },
    },
  ],
});


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});


const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
