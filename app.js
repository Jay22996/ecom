var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catRouter = require('./routes/Category');
var proRouter = require('./routes/Product');
var branchRouter = require('./routes/branch');
var stockRouter = require('./routes/Stock');
var absRouter = require('./routes/Abs');
var coupleRouter = require('./routes/Coupne');
var reviewRouter = require('./routes/Review');
var shippingRouter = require('./routes/Shipping_address');
var orderRouter = require('./routes/Order');
var paymentRouter = require('./routes/Payment');


const corsOptions = {
  origin:"http://localhost:3001",
  methods:"GET , POST",
  credentials: true,
}


var app = express();
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', catRouter);
app.use('/product', proRouter);
app.use('/branch', branchRouter);
app.use('/stock', stockRouter);
app.use("/ads",absRouter)
app.use("/coupne",coupleRouter)
app.use("/review",reviewRouter)
app.use("/address",shippingRouter)
app.use("/order",orderRouter)
app.use("/payment",paymentRouter)









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
