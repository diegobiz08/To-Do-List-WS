import {Router} from 'express';
import passport from "passport";
import {
    getItems,
    getItemById,
    createTask,
    deleteTask,
    updateTask
} from "../controllers/taskController";

const router = Router();

router.post("/ToDoListWS/api/tasks/", passport.authenticate('jwt', {session: false}), createTask)
router.get('/ToDoListWS/api/tasks/getAll', passport.authenticate('jwt', {session: false}), getItems)
router.get('/ToDoListWS/api/tasks/getById/:id', passport.authenticate('jwt', {session: false}), getItemById)
router.delete("/ToDoListWS/api/tasks/:id", passport.authenticate('jwt', {session: false}), deleteTask)
router.put("/ToDoListWS/api/tasks/:id", passport.authenticate('jwt', {session: false}), updateTask)

export default router;
