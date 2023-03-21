const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const orderRouter = require('./routes/orders');
const usersRouter = require('./routes/users');
const sandwichsRouter = require('./routes/sandwichs');

const app = express();

Date.prototype.toDateInputValue = (function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

// Activer Helmet en tant que middleware
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/orders', orderRouter);
app.use('/users', usersRouter);
app.use('/sandwichs', sandwichsRouter);

// Route pour les erreurs 404
app.use((req, res) => {
    res.status(404).json({error: 'Not Found'});
});


module.exports = app;
