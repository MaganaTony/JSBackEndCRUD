import mongoose from "mongoose";

const { Schema, model } = mongoose

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
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
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  coments: [{
    type: Schema.Types.ObjectId,
    ref: "coments"
  }]

}, { timestamps: true })

const Post = model("posts", postSchema) // posts es el nombre de la colección en la base de datos

export default Post