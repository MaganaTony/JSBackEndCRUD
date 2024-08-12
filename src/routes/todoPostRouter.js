import { Router } from "express";
import { createPosts, getPosts, getPostById, updatePostById, deletePostById} from "../controllers/postsListController";

const todoPostRouter = Router()

todoPostRouter.route('/posts')
  .get(getPosts)
  .post(createPosts)

todoPostRouter.route('/posts/:id')
  .get(getPostById)
  .put(updatePostById)
  .delete(deletePostById)
/* 
  todoPostRouter.route('/posts/:id/comments')
  .get(getPostById)
  .put(updatePostById)
  .delete(deletePostById)  */

export default todoPostRouter