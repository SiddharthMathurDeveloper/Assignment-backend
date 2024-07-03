import { Router } from "express";





const taskRouter = Router();

// create new user task
taskRouter.route("/new-task").post();

export default taskRouter;
