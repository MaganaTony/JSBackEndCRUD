import { jwt } from "jsonwebtoken"; //'jsonwebtoken' is a library that is used to create and verify tokens.

const { JWT_SECRET } = process.env //This line is used to get the secret key from the environment variables.

export const authorizationMiddleware = async (request, response, next) => {

  try {
    const {authorization} = request.headers //The 'authorization' header is a header that is used to send the user's credentials to the server.

    const token = authorization.split(' ')[1] //This line is used to split the token from the 'authorization' header.
    
    const verifedUser = await jwt.verify(token, JWT_SECRET) //This line is used to verify the token using the secret key.
    
    request.user = verifedUser //This line is used to set the user to the verified user.
    
    next() //This line is used to call the next middleware.

  } catch ( error ) {
		response.status(401).send({ error: "Usuario no autorizado"}) //This line is used to send an error message if the user is not authorized.
  }

}

