var assignee=require("./routes/assignee");
var creator=require("./routes/creator");
var bodyParser = require('body-parser');
var express = require('express');
var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented:true}));

app.use("/assignee", assignee);
app.use("/creator", creator);


var port= process.env.PORT || 8000;
app.listen(port);

module.exports=app;
