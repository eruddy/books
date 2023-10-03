const {Sequelize}=require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging:false
  });

  sequelize.authenticate().then(()=>{
    console.log('Conexion a la base de datos fue exitosa');
  }).catch(error=>{
    console.log('Error al conectar a la base de datos',error)
  })

  sequelize.sync({force:true}).then(()=>{
    console.log('Tablas Creadas exitosamente');
  }).catch(error=>{
    console.log('Error al crear las tablas',error);
  })

  module.exports={
    sequelize
  }