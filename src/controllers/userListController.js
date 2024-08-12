import User from "../models/User.js";

export const getUsers = async ( request, response) =>{
  const users = await User.find({})
  response.send(users)
}

export const getUserById = async ( request, response) => {
  const { id } = request.params
  const user = await User.findById(id).populate('posts')

    if (!user) {
      response.status(404).send("No existe el usuario en la base de datos")
    }
    response.status(200).send(user)
}

export const newTodoUsers = async ( request, response ) => {
  try {
    const {name, lastName, user, avatar, email, password} = request.body
    const newUser = new User ({
      name,
      lastName,
      avatar,
      email,
      user,
      password
    })
    await newUser.save()
    response.status(201).send(newUser)

  } catch (error) {
    response.status(422).send({ error: error.message })
  }
}

export const updateUserById = async ( request, response ) => {
  const { id } = request.params
  const { name, lastName, avatar, user, password, email } = request.body
  const use = await User.findOneAndUpdate(
    {_id: id}, 
    { name, lastName, avatar, user, password, email },
    {returnOriginal: false} 
  )
  response.send({ message: 'Se actualizo el usuario' , data: use }) 
}

export const deleteUserById = async ( request, response ) => {
  const { id } = request.params

  try {
    const user = await User.findByIdAndDelete(id)

    if(!user){
      response.status(404).send({message: "Ya no existe el usuario en la base de datos"})
    }
    response.status(200).send({message: "Se elimino el usuario correctamente"})

  } catch ( error ) {
    console.log( error.message)
    response.status(422).send({error: error.message})
  }
}