const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const orderRouter = require('./routes/orders');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/orders', orderRouter);
app.use((req, res, next) => {
    res.status(404).json({type : "error", error: 404, message: "Ressource non disponible : "+req.path});
    next();
});
module.exports = app;
