const createError = require('http-errors');

const userUseCases = require ('../usecases/user.usecases');
const postUseCases = require ('../usecases/post.usecases');

const jwt = require('../lib/jwt');

async function auth(request, response, next) {
    try { 
        const authorization = request.headers.authorization;
        const token = authorization?.replace("Bearer ", "");

        if (!token) { 
            throw createError(401, 'Token is required in authorization header');
        } 

        const payload = jwt.verify(token); 
        
        // Espera a que el usuario se recupere desde la base de datos
        const user = await userUseCases.getById(payload.id); 

        if (!user) {
            throw createError(401, 'User not found');
        }

        request.user = user;
        next();
    } catch (error) {
        response.status(error.status || 401);
        response.json ({
            success: false,
            message: error.message
        });
    }
}

module.exports = auth;