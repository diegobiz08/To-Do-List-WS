import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from "./routes/auth.routes";
import passport from "passport";
import passportMiddleware from './middlewares/passport'
import taskRoutes from './routes/task.routes'
const app = express();

app.set('port', process.env.PORT || 8080);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(authRoutes);
app.use(taskRoutes);

export default app;
