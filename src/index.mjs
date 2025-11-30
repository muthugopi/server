import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import studentsRouter from '../routes/students.routes.mjs';
import userRouter from '../routes/users.routes.mjs';
import contactRouter from '../routes/contact.routes.mjs';
import registerRouter from '../routes/register.router.mjs';
import { myCookie } from './cookie.learn.mjs';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json()); 
app.use(morgan('dev'));
app.use(cors());
//app.use(cookieParser("muthugopi"));

//app.use(myCookie);

app.use('/register', registerRouter)
app.use('/students', studentsRouter);
app.use('/users', userRouter);
app.use('/contact', contactRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
