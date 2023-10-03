const Book=require('../models/Book');
const getAllBooks=async(req,res)=>{
    try {
        const books=await Book.findAll();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({error:"Error al obtener los libros"});
    }
}
const getBookById=async(req,res)=>{
    const {id}=req.params;
    try {
        const book=await Book.findByPk(id);
        if(book){
            res.status(200).json(book)
        }else{
            res.status(404).json({error:"Libro no encontrado"});
        }
    } catch (error) {
        res.status(500).json({error:"Error al obtener el libro"});
    }
}
const createBook=async(req,res)=>{
    try {
        const newBook=await Book.create(req.body);
        res.status(200).json(newBook)
    } catch (error) {
        res.status(500).json({error:"Error al guardar el libro"});
    }
}
const updateBook=async(req,res)=>{
    const {id}=req.params;
    try {
        const [updated]=await Book.update(req.body,{
            where:{id}
        });
        console.log(updated);
        if(updated){
            const updatedBook=await Book.findByPk(id);
            res.status(200).json(updatedBook);
        }else{
            res.status(404).json({error:"Libro no encontrado"});
        }
    } catch (error) {
        res.status(500).json({error:"Error al actualizar el libro"});
    }
}
const deleteBook=async(req,res)=>{
    const {id}=req.params;
    try {
       const deleteBook=await Book.destroy({
        where:{id}
       });
       if(deleteBook){
        res.status(200).json({
            message:"Eliminado correctamente"
        })
       }else{
        res.status(404).json({error:"Libro no encontrado"});
       }
    } catch (error) {
        res.status(500).json({error:"Error al eliminar el libro"});
    }
}

module.exports={
    getAllBooks,
getBookById,
createBook,
updateBook,
deleteBook
}
