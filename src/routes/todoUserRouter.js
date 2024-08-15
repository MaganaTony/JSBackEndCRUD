const express = require('express');
const createError = require('http-errors'); 

const userUseCases = require('../usecases/user.usecases');

const router = express.Router();


router.post('/login', async (request, response) => {
    try {
        const data = request.body;
        console.log(data);
        
        const token = await userUseCases.login(data);

        response.json({
            success: true,
            message: 'Login success',
            data: {
                token
            }
        })
    } catch (error) {
        response.status(error.status || 501).send({ error: error.message, success: false });
    }
});


router.post('/register', async (request, response) => {
    try {
        const data = request.body;
        const user = await userUseCases.createUser(data);
        response.json({
            success: true,
            message: 'User created',
            data: {
                user
            }
        })
    } catch (error) {
        response.status(error.status || 500).send({ error: error.message, success: false });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = await userUseCases.getUserById(id);
        response.json({
            success: true,
            message: 'User found',
            data: {
                user
            }
        })
    } catch (error) {
        response.status(error.status || 500).send({ error: error.message, success: false });
    }
});

module.exports = router;