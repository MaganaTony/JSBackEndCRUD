const express = require('express');

const postUseCases = require('../usecases/post.usecases');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/', auth, async (request, response) => {
  try {
    const data = request.body;
    console.log(data);
    
    const id = request.user._id;
    data.userId = id;
    const newpost = await postUseCases.createPost(data);
    response.json({
      success: true,
      message: `Post created`,
      data: {
        post : newpost
      }
    })
  } catch (error) {
    response.status(error.status || 500).send({ error: error.message, success: false });
  }
}
);

router.get('/', async (request, response) => {
  try {
    const { search } = request.query;
    if (search) {
      const posts = await postUseCases.getPostsByTitle(search);
      return response.json({
        success: true,
        message: `Posts with title ${search} found`,
        data: {
          posts
        }
      })
    } else {
      const posts = await postUseCases.getPosts();
      return response.json({
        success: true,
        message: `Post with title ${search} not found, showing all posts`,
        data: {
          posts
        }
      })
    }
  } catch (error) {
    response.status(error.status || 500).send({ error: error.message, success: false });
  }
});

router.patch('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params;
    const userId = request.user._id;
    const data = request.body;

    const post = await postUseCases.getPostById(id);

    if (!post) {
      return response.status(404).json({
        success: false,
        message: 'Post not found'
      })
    }
    if (post.userId.toString() !== userId.toString()) {
      return response.status(401).json({
        success: false,
        message: 'Unauthorized'
      })
    }

    const newPost = await postUseCases.updatePostById(id, data);
    return response.json({
      success: true,
      message: 'Post updated',
      data: {
        post: newPost
      }
    })


  } catch (error) {
    response.status(error.status || 500).send({ error: error.message, success: false });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const userId = request.user._id;

    const post = await postUseCases.getPostById(id);

    if (!post) {
      return response.status(404).json({
        success: false,
        message: 'Post was not found',
      });
    }

    if (post.user.toString() !== userId.toString()) {
      return response.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const postDeleted = await postUseCases.deletePostById(id);

    response.json({
      success: true,
      message: 'The post was deleted',
      data: { post: postDeleted },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;