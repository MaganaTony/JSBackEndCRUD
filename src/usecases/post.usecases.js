const createError = require('http-errors');
const Post = require('../models/Post');

async function createPost(data){
    const post = await Post.create(data);
    return post;
}

async function getPosts(){
    const posts = await Post.find();
    return posts;
}

async function getPostById(id){
    const post = await Post.findById(id);
    if(!post){
        throw createError(404, 'Post not found');
    }
    return post;
}

async function updatePostById(id, data){
    const post = await Post.findByIdAndUpdate(id, data, { new: true });
    if(!post){
        throw createError(404, 'Post not found');
    }
    return post;
}

async function deletePostById(id){
    const post = await Post.findByIdAndDelete(id);
    if(!post){
        throw createError(404, 'Post not found');
    }
    return post;
}

async function getPostsByTitle(title){
    if(!title){
        throw createError(400, 'Title is required');
    }
    const posts = await Post.find({ title: { $regex: title, $options: 'i' } });
    return posts;
}

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePostById,
    getPostsByTitle
}   