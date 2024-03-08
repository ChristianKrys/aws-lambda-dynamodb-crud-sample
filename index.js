

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const serverless = require("serverless-http");

const { routeDynamodb } = require('./routes/dynamodb-route');


const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit : '10mb'}));

const prefix_API = '/dynamodb-api/v1';

app.use(prefix_API,routeDynamodb);


app.get("/",(req,res)=>{
    res.status(200).json({"HHello" : "Hello World"})
});


// const PORT = 8000;
// app.listen(PORT, ()=>{
//     console.log(`Server listening on port ${PORT}`);
// })


// ------- serverless and Lambda function --------

module.exports.handler = serverless(app);

