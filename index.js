const express = require('express');

const app = express();

const fs = require('fs');
const port = 8000;
const db = require('./config/database');
const path = require('path');
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.set('view engine','ejs');
app.use(express.urlencoded());

app.use('/',require('./routes/indexroutes'));

app.listen(port,(err)=>{
    if(err){
        console.log("server is not started");
        return false;

    }
    console.log(`server is started on port :- ${port}`);
})