/* importar o módulo do framework express */
var path = require('path');
var express = require('express');


var favicon = require('serve-favicon');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');


/* importar o módulo do multiparty */
var multiparty = require('connect-multiparty');


/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* Importar o módulo do expressSession   */
var expressSession = require('express-session');

/* Importar o módulo do connect-flash-plus  */
var flash = require('connect-flash-plus');

/* Importar o módulo dos cookie */
var cookie = require('cookie');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));
//app.use(favicon(__dirname + '/public/img/favicon.ico'));
//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* configurar o middleware multiparty */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multiparty());

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configurar o middleware de expressSession */
app.use(expressSession({
        secret: 'hahah',
        resave: false,
        saveUninitialized: false
    }))
    /* configurar o middleware de connect-flash */
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})


/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
    .include('app/routes')
    .then('config/conexaoMongoose.js')
    .then('config/dbConnection.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* exportar o objeto app */
module.exports = app;