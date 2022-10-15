const express = require('express');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/database');
const port = process.env.PORT || 5000;
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');


connectDB();
const app = express();


const session = require('express-session');
const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}
app.use(session(sessionConfig));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/items', itemRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

