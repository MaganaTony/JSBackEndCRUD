import mongoose from "mongoose";

const { Schema, model } = mongoose

const comentsSchema = new Schema({
    comentario: {
        type: String
    }, 
    post: {
        type: Schema.Types.ObjectId,
        ref: 'posts',
        required: true
      }
},{ timestamps: true } )

const Coment = model("coments", comentsSchema) // coments es el nombre de la colección en la base de datos

export default Coment