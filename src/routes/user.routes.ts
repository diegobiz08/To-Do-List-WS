import {Router} from 'express';
import { signIn, signUp } from "../controllers/user.controller";
import { getProfileByDPI, updateByDPI, deleteProfile } from "../controllers/profile.controller";
import passport from "passport";

const router = Router();

router.post('/api/registro/:DPI', signUp)
router.post('/api/login', signIn)

router.get('/api/perfil/:DPI', passport.authenticate('jwt', {session: false}), getProfileByDPI)
router.put('/api/perfil/:DPI', passport.authenticate('jwt', {session: false}), updateByDPI)
router.delete('/api/perfil/:id', passport.authenticate('jwt', {session:false}), deleteProfile)

export default router;
