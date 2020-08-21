const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
color = require('colors');
require('./config/config');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'))

mongoose.set('useCreateIndex', true);

//Connecting to MongoDB
mongoose.connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    },
    (err, resp) => {
        if (err) throw err;
        else {
            console.log('Base de Datos Online!!!!!!!!'.green)
        }
    });
app.listen(process.env.PORT, () => {
    console.log('escuchando puerto: '.blue, process.env.PORT.red);
})




