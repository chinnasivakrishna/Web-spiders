require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');
const morgan = require('morgan');

// Connect to Database
connectDB();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api', taskRoutes);
app.use('/api/user', authRoutes);
app.use('/',(req,res)=>{
    res.json("Web Spider task manager is live")
});

// Error Handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
