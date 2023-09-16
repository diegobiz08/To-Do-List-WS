import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import purchaseRoutes from "./routes/purchase.routes";
import passport from "passport";
import passportMiddleware from './middlewares/passport'
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(purchaseRoutes);

export default app;
