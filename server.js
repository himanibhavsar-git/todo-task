// Environment variables
require('dotenv').config();

const http = require('http');
const cors = require('cors');

const express = require('express');

const app = express();
require('./helper/database.js');

// Body Parse
const bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(cors());


// Express Settings
app.set('port', process.env.SERVER_PORT);

// CORS
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Request-Headers', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// HTTP Logger
const morgan = require('morgan');

app.use(morgan('combined'));

// Public
app.use(express.static('public'));

// Router
app.use('/api/v1', require('./routes/v1'));

// Start server
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Express server listening on port ${process.env.PORT}`);
});