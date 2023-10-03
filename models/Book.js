const{Sequelize} =require('sequelize');
const{sequelize} =require('../database/conexion');
const Book=sequelize.define('book',{
    titulo:Sequelize.STRING,
    autor:Sequelize.STRING,
    genero:Sequelize.STRING,
    anio:Sequelize.INTEGER
});
module.exports=Book;