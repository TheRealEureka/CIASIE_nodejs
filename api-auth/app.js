const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index');


const app = express();

Date.prototype.toDateInputValue = (function () {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRouter);


app.use((req, res, next) => {

    res.json({error: 'not found'});
})
module.exports = app;