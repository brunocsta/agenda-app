require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        app.emit('listening');
    })
    .catch(e => console.log(e)
);

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middeware');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'ASDdhfsa84654asdiISHDUS!sndfn_asnd!@64',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
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

app.use(csrf())
//Middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);


app.on('listening', () => {
    const server = app.listen(PORT || 0, '0.0.0.0', () => {
        const address = server.address();
        const host = address.address === '::' ? 'localhost' : address.address;
        const port = address.port;

        console.log('Conectado ao MongoDB');
        console.log(`Acesse: http://${host}:${port}`);
        console.log(`Servidor executando na porta ${port}`);
        console.log(`Data/hora atual: ${new Date().toLocaleString()}`);
});