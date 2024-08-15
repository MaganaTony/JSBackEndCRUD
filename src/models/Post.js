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
  coments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "coments"
  }]

}, { timestamps: true })

module.exports = mongoose.model('posts', postSchema);