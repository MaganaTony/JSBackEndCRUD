const Coment = require('../models/Coments');
const Post = require('../models/Post');
const User = require('../models/User');


//get comments by post id
async function getComents ( request, response ) {
    try {
      const { postId } = request.params
      const post = await Post.findById(postId).populate('coments')
  
      if (!post) {
        return response.status(404).send({ error: 'Post not found' })
      }
  
      response.send(post.coments)
  
    } catch (error) {
      response.status(500).send({ error: error.message })
    }
  }

async function createComents ( request, response ) {
    try {
      const {comentario, postId} = request.body
  
      const post = await Post.findById(postId)
      console.log(postId)
      console.log(post)
  
      const newComent = new Coment ({
        comentario,
        post
      })
      
  
      const comentSave = await newComent.save()
      post.coments.push(comentSave)
  
      await post.save({ validateBeforeSave: false })
      response.status(201).send(newComent)
  
      } catch (error) {
        response.status(422).send({ error: error.message })
    }
  }

async function deleteComent ( request, response ) {
    try {
      const { id } = request.params
      const comment = await Coment.findByIdAndDelete(id)
  
      if (!comment) {
        return response.status(404).send({ error: 'Comment not found' })
      }
  
      response.send(comment)
  
    } catch (error) {
      response.status(500).send({ error: error.message })
    }
  }


module.exports = {
    getComents,
    createComents,
    deleteComent
}