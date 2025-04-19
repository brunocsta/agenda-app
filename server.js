const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const connectionString = 'mongodb+srv://bcostamartins:M2NK0fvOPOSfUiwt@expressapi.dfhzomx.mongodb.net/?retryWrites=true&w=majority&appName=ExpressAPI';

mongoose.connect(connectionString, { useNewUrlParser: true});

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const routes = require('./routes');
const path = require('path');
const {middlewareGlobal} = require('./src/middlewares/middeware');

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'asdfasdfasdfasdfasdfasdfaasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasd',
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://bcostamartins:M2NK0fvOPOSfUiwt@expressapi.dfhzomx.mongodb.net/?retryWrites=true&w=majority&appName=ExpressAPI' }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}
);

app.use(sessionOptions);
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(middlewareGlobal);
app.use(routes);


app.listen(3000, () => {
    console.log(`Acessar http://localhost:${PORT}`);
    console.log(`Servidor executando na porta ${PORT}`);
});