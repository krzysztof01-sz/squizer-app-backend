require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

mongoose.Promise = global.Promise;

app.use(helmet());
app.disable('X-Powered-By');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(hpp());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello world!'));

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
