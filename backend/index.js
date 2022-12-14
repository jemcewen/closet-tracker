const express = require('express');
const ejsMate = require('ejs-mate');
const flash = require('connect-flash')
const path = require('path');
const methodOverride = require('method-override');
const dotenv = require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const errorHandler = require('./middleware/errorMiddleware');
const flashHandler = require('./middleware/flashMiddleware');
const connectDB = require('./config/database');
const port = process.env.PORT || 5000;
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();
const app = express();
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend', 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));

app.use(express.json());

const store = MongoStore.create({
  mongoUrl: process.env.DB_URL,
  secret: process.env.SECRET,
  touchAfter: 24 * 60 * 60
});

store.on('error', (e) => {
  console.log('Session store error.', e)
})

const sessionConfig = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
}
app.use(session(sessionConfig));
app.use(flash());

app.use((req, res, next) => {
  res.locals.user = req.session.user_id;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/items', itemRoutes);
app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));