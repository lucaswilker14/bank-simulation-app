// packages
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import body_parser from 'body-parser';
import ejs from 'ejs';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path'

const swaggerUi = require('swagger-ui-express')
import doc from './resources/swagger/swagger'


// start application
const app = express();


// environment
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;


// db setup
const db = require(__dirname + "/api/config/database.json");
const dbURI = isProd ? db.dbProd : db.dbDev;
mongoose.connect(dbURI, {useNewUrlParser: true, useCreateIndex: true,
    useUnifiedTopology: true, useFindAndModify: false})
    .then(result => {console.log('MongoDB connect!')})
    .catch(result => {console.log(result)} );


// Set 'views' directory for any views
// being rendered res.render()
app.set('views', path.join(__dirname, '/api/components/person/views'));


// Set view engine as EJS
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


// others configs
if(!isProd) app.use(morgan("dev"));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());


// setup body-parser
app.use(body_parser.json({limit: 1.5*1024*1024}));
app.use(body_parser.urlencoded({extends: true, limit: 1.5*1024*1024}));


//loading models
require(__dirname + '/api/components/account/model')
require(__dirname + '/api/components/person/model');
require(__dirname + '/api/components/transaction/model');

//loading routes
const routes = require(__dirname + '/api/routes');
app.use("/", routes)
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(doc))


// 404 - route
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404
    next(err);
});


// other errs routes
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if(err.status !== 404) console.warn("Error:", err.message, new Date());
    if (err.status === 401) return res.status(err.status).send({message: err});
    res.status(422).json(err);
});



// listener
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Run in http://localhost:${PORT}`);
});