import {Router} from 'express';
import { signIn, signUp } from "../controllers/user.controller";

const router = Router();

router.post('/tasks/signup', signUp)
router.post('/tasks/signin', signIn)

export default router;