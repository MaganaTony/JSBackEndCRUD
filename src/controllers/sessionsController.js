import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User"

const { JWT_SECRET } = process.env

export const createSession = async (request, response) => {

  const { email, password } = JSON.parse(request.body)
  console.log(request.body)

  try {

  const user = await User.findOne({ email })


    if (!user) {
      response.status(404).send({ error: "Usuario no existe" })
      return
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
      
      if (!passwordMatch) {
        response.status(422).send({ error: "usuario y/o contrasena invalidas" })
        return
      }

      const accessToken = await jwt.sign({ user: user._id, email: user.email}, JWT_SECRET, { expiresIn: '1h'})
    
      response.status(201).send({ token: accessToken })

    } catch ( error) {
      response.status(500).send({error: error.message})
    }


}