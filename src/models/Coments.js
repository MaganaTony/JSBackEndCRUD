const mongoose = require('mongoose')


const comentsSchema = new mongoose.Schema({
    comentario: {
        type: String
    }, 
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true
      }
},{ timestamps: true } )

module.exports = mongoose.model('coments', comentsSchema);