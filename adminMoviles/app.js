var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose= require('mongoose');
//MODELOS
var Administrador= requiere('./models/Moviles');
//ROUTERS
var administradorRouter= require('./routes/administrador');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//CONEXION A MONGODB
var user = process.env.USERDB || "";
var password= process.env.PASSDB || "";
var server = process.env.SERVER || "localhost";
var db= process.env.DATABASE || "adminmoviles";
var string = `mongodb://${user}:${password}@${server}/${db}`;

mongoose.Promise=global.Promise;

mongoose.connect(string,{
  useNewUrlParser:true,
  useFindAndModify:false,
  useCreateIndex:true
}).then(()=>console.log('Conectado a MongoDB'))
.catch(()=>console.error('No se pudo conectar a MONGODB'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//USAR ROUTET DE administrador.js
app.use('/movil',administradorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
