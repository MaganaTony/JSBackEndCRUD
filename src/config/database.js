import mongoose from "mongoose"; //mongoose is a library that allows us to interact with MongoDB.

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOSTNAME 
} = process.env //This line is used to get the database credentials from the environment variables.

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOSTNAME}/?retryWrites=true&w=majority&appName=${DB_NAME}`

export const DBConn = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
      })
      console.log("Conexion con MongoDB exitosa!!")

  } catch ( error ) {
    console.log("Error al conectarse con MongoDB", error)
  }
}