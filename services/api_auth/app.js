const express = require('express');


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

const error_handler = async (err, req, res) => {

    return res.status(err).location(req.path).json(err);

};
app.use(error_handler);

module.exports = app;
