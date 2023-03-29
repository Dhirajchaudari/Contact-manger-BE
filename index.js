const express = require("express");
require('dotenv').config();
const cors=require('cors');
const dbconnect=require('./connection/conn');
const bodyParser=require('body-parser');
const checkToken = require('./helper/verifytoken');
dbconnect();
const app = express();
const contactRoute=require('./routes/contacts')
const resisterAndLogin = require('./routes/usersRoute.jsx');
//const contactDetails=require('./routes/contacts')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(resisterAndLogin);
app.use('/contacts',checkToken,contactRoute);
//app.use('/contacts',checkToken,contactDetails);

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
