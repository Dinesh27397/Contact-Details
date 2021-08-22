
/*******************************
 * Import Required Modules
 ******************************/

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const swaggerUI=require('swagger-ui-express')
const swaggerDoc=require("swagger-jsdoc")
require('dotenv/config');
var router=require('./routes/http-routes')
var mongoose=require('mongoose')



app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


var server = require('http').Server(app);


console.log('Contacts Application server listening on ' + 3000);

server.listen(3000);
const SwaggerOptions={
     swaggerDefinition:{
        info:{
         title:"Contact List API",
         description:"Contact API INFORMATION",
         contact:{
            name:"Developer"
         },
         servers:["http://localhost:3000"]
        }
     },
     apis:['./routes/http-routes.js']

}
const swaggerDocs=swaggerDoc(SwaggerOptions)

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocs))
//Initializing the web routes
// var Routes = require('./routes/http-routes.js');

// router('/',Routes)
app.use('/',router)

// Connect to DB
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });

process
    .on('uncaughtException', function (err) {
        // handle the error safely
        // logger.error(err)
        console.log(err)
    })
    .on('unhandledRejection', (reason, p) => {
        // logger.error(reason, 'Unhandled Rejection at Promise', p);
})







