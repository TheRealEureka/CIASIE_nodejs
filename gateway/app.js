const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const orderRouter = require('./routes/orders');


const app = express();

Date.prototype.toDateInputValue = (function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

// Activer Helmet en tant que middleware

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', orderRouter);


// Route pour les erreurs 404
app.use((req, res, next) => {
    res.status(404).json({error: 'Not Found'});
});


module.exports = app;