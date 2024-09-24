const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  hashtags: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length <= 4;
      },
      message: "You can add up to 4 hashtags"
    },
  },
  coments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "coments"
  }]

}, { timestamps: true })

module.exports = mongoose.model('posts', postSchema);