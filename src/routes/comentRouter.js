const express = require('express');

const postUseCases = require('../usecases/comment.usecases');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/posts/:id/coments', auth, async (request, response) => {
    try {
        const data = request.body;
        const id = request.user._id;
        data.userId = id;
        const coment = await comentUseCases.createComents(data);
        response.json({
        success: true,
        message: 'Coment created',
        data: {
            coment
        }
        })
    } catch (error) {
        response.status(error.status || 500).send({ error: error.message, success: false });
    }
    }
);

router.get('/posts/:id/coments', async (request, response) => {
    try {
        const { postId } = request.params;
        const post = await comentUseCases.getComents(postId);
        if (!post) {
        return response.status(404).send({ error: 'Post not found' })
        }
        response.send(post)
    } catch (error) {
        response.status(500).send({ error: error.message })
    }
}
);  
router.delete('posts/coments/:id', auth, async (request, response) => {
    try {
        const { id } = request.params;
        const coment = await comentUseCases.deleteComent(id);
        if (!coment) {
        return response.status(404).send({ error: 'Coment not found' })
        }
        response.send(coment)
    } catch (error) {
        response.status(500).send({ error: error.message })
    }
}
);

module.exports = router;