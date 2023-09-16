import {Router} from 'express';
import {makePurchase} from '../controllers/purchase.controller';
import passport from "passport";

const router = Router();

router.post('/api/compra', passport.authenticate('jwt', {session: false}), makePurchase);

export default router;
