import { Router } from "express";
import { createSession } from "../controllers/sessionsController";

//controller

const sessionsRouter = Router()

sessionsRouter.route("/sessions")
    .post(createSession)


    export default sessionsRouter