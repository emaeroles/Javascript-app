const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');

// Initializations
const app = express();
require('./database');

// Settings, aca va las configuraciones
app.set('port', process.env.PORT || 3000); // para un puerto de un servicio en la nuve o uno local
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares, funciones que van a ser ejecutadas antes que lleguen al servidor o cuando lleguen, antes que pasarselo a las rutas
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

// Global Variables

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

// Static Files, para configurar en donde estara la carpeta de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Server is listenning, para inicializar el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});