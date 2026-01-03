//import modules here

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import studentsRouter from '../routes/students.routes.mjs';
import userRouter from '../routes/users.routes.mjs';
import messageRouter from '../routes/message.routes.mjs';
import registerRouter from '../routes/register.router.mjs';
import loginRouter from '../routes/login.routes.mjs';
import home from '../routes/home.routes.mjs';
import { sequelize } from './utils/db.mjs';
import '../models/student.model.mjs';
import '../models/admin.model.mjs';
import '../models/user.model.mjs';
import '../models/message.model.mjs';

const app = express();

//middlewares here

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60
  }
}));

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

//routes here

app.use('/', home);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/students', studentsRouter);
app.use('/users', userRouter);
app.use('/message', messageRouter);

//connections

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected successfully!");

    await sequelize.sync();
    console.log("Tables synced");

    app.listen(3000, () => console.log("Server running on port 3000"));
  } catch (err) {
    console.error("DB connection failed:", err);
  }
})();
