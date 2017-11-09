#!/usr/bin/env node

/**
 * Module dependencies.
 */

var debug = require('debug')('nodeapp:server');
var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let routeIndex = require(__dirname + '/routes/index.js');
let routeSocket = require(__dirname + '/routes/socket.js');

let helper = require(__dirname + '/api/helper.js');

let cfg = null,
    db = null,
    api = {};

helper.getConfig()
    .then((r) => {
        cfg = r;
        return helper.getMongo();
    })
    .then((_db) => {
        db = _db;
        return routeIndex();
    })
    .then((rIndex) => {
        var app = express();
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.set('views', path.join(__dirname, '/views'));
        app.set('view engine', 'pug');

        app.use(express.static(path.join(__dirname, '/public')));
        app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use('/', rIndex);

        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handler
        app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });

        let server_port = cfg.app.port;
        if (process.env.PORT) {
            server_port = process.env.PORT;
        } else if (process.env.OPENSHIFT_NODEJS_PORT) {
            server_port = process.env.OPENSHIFT_NODEJS_PORT;
        }
        var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

        console.log(
            'server_port ', server_port,
            'server_ip_address ', server_ip_address
        );

        app.set('port', server_port);

        /**
        * Create HTTP server.
        */
        var server = http.createServer(app);
        server.listen(server_port);
        server.on('error', onError);
        server.on('listening', onListening);

        routeSocket(server);


        /**
         * Event listener for HTTP server "error" event.
         */

        function onError(error) {
            if (error.syscall !== 'listen') {
                throw error;
            }

            var bind = typeof port === 'string'
                ? 'Pipe ' + port
                : 'Port ' + port;

            // handle specific listen errors with friendly messages
            switch (error.code) {
                case 'EACCES':
                    console.error(bind + ' requires elevated privileges');
                    process.exit(1);
                    break;
                case 'EADDRINUSE':
                    console.error(bind + ' is already in use');
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        }

        /**
         * Event listener for HTTP server "listening" event.
         */

        function onListening() {
            var addr = server.address();
            var bind = typeof addr === 'string'
                ? 'pipe ' + addr
                : 'port ' + addr.port;
            debug('Listening on ' + bind);
        }
    });
