// server.ts
// Imports
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import { sequelize } from './utils/db';
import studentsRouter from '../routes/students.routes';
import userRouter from '../routes/users.routes';
import messageRouter from '../routes/message.routes.mjs';
import registerRouter from '../routes/register.router';
import loginRouter from '../routes/login.routes';
import home from '../routes/home.routes';
// Import models 
import '../models/student.model';
import '../models/admin.model';
import '../models/user.model';
import '../models/message.model';
const app = express();
// Middlewares 
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(session({
    secret: process.env.SESSION_SECRET || "mcuhtahnudgroapvia",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
    },
}));
app.use((req, res, next) => {
    console.log(req.headers);
    next();
});
// Routes
app.use('/', home);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/students', studentsRouter);
app.use('/users', userRouter);
app.use('/message', messageRouter);
// Database & Server
(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected successfully!');
        await sequelize.sync();
        console.log('Tables synced');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (err) {
        console.error('DB connection failed:', err);
    }
})();
//# sourceMappingURL=index.js.map