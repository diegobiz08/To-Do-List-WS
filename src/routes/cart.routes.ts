import {Router} from 'express';
import {createCart} from '../controllers/cart.controller';
import passport from "passport";

const router = Router();

router.post('/api/carrito', passport.authenticate('jwt', {session: false}), createCart);


export default router;
