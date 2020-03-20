var express = require('express');
global.app = express();
global.app.use(express.urlencoded())
//global.app.use(express.json())