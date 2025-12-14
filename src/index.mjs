import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import studentsRouter from '../routes/students.routes.mjs';
import userRouter from '../routes/users.routes.mjs';
import contactRouter from '../routes/contact.routes.mjs';
import registerRouter from '../routes/register.router.mjs';
import loginRouter from '../routes/login.routes.mjs';
import session from 'express-session';
import home from '../routes/home.routes.mjs'
//import { isAdmin } from '../controllers/auth.controller.mjs';
//import { showData } from '../controllers/data.controller.mjs';
//import { Strategy as LocalStrategy } from 'passport-local';
//import passport from 'passport';
//import { cookie } from 'express-validator';
//import { myCookie } from './cookie.learn.mjs';
//import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()); 
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(session({
    secret:"mcuhtahnudgroapvia",
    saveUninitialized:false,
    resave:false,
    cookie : {
        maxAge : 60000*60
    }
}));

//app.use(cookieParser("muthugopi"));
//app.use(myCookie);
app.use('/', home);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/students', studentsRouter);
app.use('/users', userRouter);
app.use('/contact', contactRouter);

app.get("/session", (req, res) => {
  req.session.data = {
    id:1,
    role:"admin"
  }
  console.log(req.session);  // logs session object in terminal
  res.json(req.session, res.cookie);     // sends session data as JSON to browser
});


app.listen(3000, () => console.log('Server running on port 3000'));
