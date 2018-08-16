var express = require('express');
var path = require('path');
var app = express();
var ROOT_PATH = path.resolve(process.cwd());

var pkgConfig = require(path.resolve(ROOT_PATH, 'server/config.js'));
require('./middleware')(app);
app.use(express.static(path.resolve(ROOT_PATH, 'src/public')));

app.listen(pkgConfig.dev.port);
