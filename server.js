const express = require('express');
const sequelize = require('./db.js');
const bodyParser = require('body-parser');
const {body,bodyValidarion}= require('express-validator');
const userRoutes = require("./routes/userRoutes.js");
const todoRoutes = require("./routes/todoRoutes.js");

//Swagger Documentation
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig.js')

const app = express();
const port= process.env.PORT||4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

// Server for  Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})