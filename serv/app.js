const express = require('express');
const cors = require('cors');
const server = express();
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const fileUpload = require('express-fileupload')
const path = require('path');
server.use(cors({ credentials: true, origin: true }));
//settings
const port = process.env.PORT || 3005;
server.set('port', process.env.PORT || 3005);
server.set('secret', config.secret);
//middleware
server.use(morgan('dev'));
//server.use(bodyParser.json());
server.use(bodyParser.json({limit: "50mb"}));
server.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
server.use(express.static(path.join(__dirname, 'files')));
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    //console.log("Pasando por middleware cors")
    next();
});


// Rutas

require ('./routes/prospecto')(server);

server.use(function (err, req, res, next) {  //Control de errores
    console.error(err)
    res.status(500).json({ message: 'an error occurred' })
});

const Server = server.listen(server.get('port'), () => {
    console.log("Portal in the port 3005");
});
