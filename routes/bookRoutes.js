const express=require('express');
const router=express.Router();
const bookController=require('./../controllers/bookController')
const authMidleware=require('./../midlewares/authMiddleware');

//rutas para las operaciones de CRUD
router.get('/',authMidleware,bookController.getAllBooks);
router.get('/:id',authMidleware,bookController.getBookById);
router.post('/',authMidleware,bookController.createBook);
router.put('/:id',authMidleware,bookController.updateBook);
router.delete('/:id',authMidleware,bookController.deleteBook);

module.exports=router;

//exportamos nuestras rutas