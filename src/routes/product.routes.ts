import {Router} from 'express';
import {getProducts, createProduct, updateProduct, deleteProduct} from '../controllers/products.controller';
import passport from "passport";

const router = Router();

router.get('/api/productos', passport.authenticate('jwt', {session: false}), getProducts);
router.post('/api/productos', passport.authenticate('jwt', {session: false}), createProduct);
router.put('/api/productos/:id', passport.authenticate('jwt', {session: false}), updateProduct);
router.delete('/api/productos/:id', passport.authenticate('jwt', {session: false}), deleteProduct);

export default router;
