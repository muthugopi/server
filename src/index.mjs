import express from 'express';
import studentsRouter from '../routes/students.routes.mjs';

const app = express();

app.use(express.json()); 

app.use('/users', studentsRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
