const express=require('express');
const router=express.Router();
const userController=require('./../controllers/userController')

//rutas para las operaciones de CRUD tabla Usuarios
router.get('/',userController.getAllUsers);
router.get('/:id',userController.getUserById);
router.post('/',userController.createUser);
router.post('/login',userController.loginUser);

router.put('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

//exportamos nuestras rutas
module.exports=router;
