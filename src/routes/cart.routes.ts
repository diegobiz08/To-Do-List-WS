import {Router} from 'express';
import {createCart,deleteProductFromCart, getCartDetails} from '../controllers/cart.controller';
import passport from "passport";

const router = Router();

router.post('/api/carrito', passport.authenticate('jwt', {session: false}), createCart);
router.delete('/api/carrito', passport.authenticate('jwt', {session: false}), deleteProductFromCart);
router.get('/api/carrito', passport.authenticate('jwt', {session: false}), getCartDetails);

export default router;
