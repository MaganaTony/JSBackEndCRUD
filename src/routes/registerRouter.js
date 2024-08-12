import { Router } from "express";
import { register } from "../controllers/registerController";

const registerRouter = Router()

registerRouter.post('/singup', register)

export default registerRouter