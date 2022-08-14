require("dotenv").config();

const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/public', express.static(__dirname + '/public'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

const routes = require('./routes')
app.use(routes)

app.listen(port, ()=>{
    console.log(`app listening to port ${port}`)
})