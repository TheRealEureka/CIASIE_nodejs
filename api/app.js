const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const orderRouter = require('./routes/orders');
const usersRouter = require('./routes/users');

const app = express();

Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/orders', orderRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    res.json({error404: 'not found'});
})
module.exports = app;
