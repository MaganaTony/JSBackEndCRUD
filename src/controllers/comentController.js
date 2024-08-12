import Coment from "../models/Coments";
import Post from "../models/Post";
import User from "../models/User";

export const getComents = async ( request, response) =>{
  const coments = await Coment.find({})
  response.send(coments)
}

export const getComentsById = async ( request, response ) => {
    const { id } = request.params
    const coments = await Coment.findById(id).populate('posts')
    if (!coments) {
        response.status(404).send({ message: "Us, no existen comentarios aun, Se el primero"})
    }
    response.status(200).send(coments)

}

export const createComents = async ( request, response ) => {
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