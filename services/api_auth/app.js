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

// Route pour les erreurs 404
app.use((req, res, next) => {
    res.status(404).json({error: 'Not Found'});
});

module.exports = app;
