const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');




const bankRoutes = require('./routers/bank')




const app = express();



app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Connect-Type', 'Authorization');
    next();
});

// app.use(bodyparser.json());
app.use(bodyparser.json());

app.use('/bank', bankRoutes);






app.use((error, req, res, next) =>
{
    // console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

mongoose.connect('mongodb+srv://moamn:moamn@cluster0.ojvgbto.mongodb.net/test?retryWrites=true&w=majority')
    .then(result =>
    {
        app.listen(8081);
        console.log('connected sccessfully')
    })
    .catch(err => { console.log(err); });
