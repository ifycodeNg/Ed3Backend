const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const helmet = require('helmet');
const cors = require('cors');

const sequelize = require('./db/sequelize');

const routes = require('./routes/api');

const app = express();

app.use(helmet());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};



app.use(cors(corsOptions));

// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, Content-Type, Accept',
  );
  next();
});

app.use('/api', routes);

sequelize.sequelize.sync().then(result=>{

}).catch(err=>console.log(err))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
