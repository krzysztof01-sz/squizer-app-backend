require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const verify = require('./middlewares/verifyToken');

mongoose.Promise = global.Promise;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(hpp());
app.disable('x-powered-by');

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.post('/dashboard', verify, (req, res) => {
  if (req.user) res.send(req.user);
});

// routes

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () =>
  mongoose
    .connect(process.env.MONGO_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('connection with mongodb has started')),
);

module.exports = app;
