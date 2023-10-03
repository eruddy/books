require('dotenv').config();
const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const port =process.env.PORT || 3000;
const bookRoutes =require('./routes/bookRoutes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/books',bookRoutes)
app.listen(port,()=>{
    console.log(`Aplicacion escuchando en el puerto : ${port}`);
})