import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import studentsRouter from '../routes/students.routes.mjs';
import userRouter from '../routes/users.routes.mjs';
import contactRouter from '../routes/contact.routes.mjs';
import visitorRoute from '../routes/visitor.routes.mjs'

const app = express();

app.use(express.json()); 
app.use(morgan('dev'));
app.use(cors())

app.use("/api", visitorRoute);
app.use('/students', studentsRouter);
app.use('/users', userRouter);
app.use('/contact', contactRouter)

app.listen(3000, () => console.log('Server running on port 3000'));
