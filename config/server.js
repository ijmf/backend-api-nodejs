const port = 3001 //Mudei a porta de 3000 para 3001 para não dar conflito com o Lanfuse que usa a 3000
const bodyParser = require('body-parser')
const express = require('express')
const server = express()

const queryParser = require('express-query-int')
const allowCors = require('./cors')

server.use(bodyParser.json({ limit: '50mb' }));
server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
server.use(queryParser());
server.use(allowCors);
server.use(express.static('public'));

server.listen(port, function(){
    console.log(`BACKEND is runner on port ${port}.`)
})

module.exports = server