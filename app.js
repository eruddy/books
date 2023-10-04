require('dotenv').config();
const express=require('express');
const app=express();
const bodyParser = require('body-parser');
const port =process.env.PORT || 3000;
const bookRoutes =require('./routes/bookRoutes')
const userRoutes =require('./routes/userRoutes')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/books',bookRoutes);
app.use('/users',userRoutes);
app.listen(port,()=>{
    console.log(`Aplicacion escuchando en el puerto : ${port}`);
})