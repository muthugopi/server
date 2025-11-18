import express from 'express';
import studentsRouter from '../routes/students.routes.mjs';
import userRouter from '../routes/users.routes.mjs';

const app = express();

app.use(express.json()); 

app.use('/students', studentsRouter);
app.use('/users', userRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
