const express = require('express');
const connectDb = require('./config/db');

// 
const app = express();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');

connectDb();

app.use(express.json())

app.use('/api/auth',authRoutes);
app.use('/api/todos',todoRoutes);

const port = 3000;

app.listen(port,()=>{
    console.log('server is running');
});
