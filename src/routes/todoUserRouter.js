import { Router } from "express";
import { getUsers, newTodoUsers, getUserById, updateUserById, deleteUserById } from "../controllers/userListController";
import { authorizationMiddleware } from "../middleware/authorization";
const todoUserRouter = Router()

todoUserRouter.route('/users')
  .get(getUsers)
  .post(newTodoUsers)

todoUserRouter.route('/users/:id')
  .get(authorizationMiddleware, getUserById)
  .put(updateUserById)
  .delete(deleteUserById)


export default todoUserRouter