const jwt =require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const getAllUsers = async (req, res) => {
  try {
    const Users = await User.findAll();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los Usuarios",error:error });
  }
};
const getUserById=async(req,res)=>{
    const {id}=req.params;
    try {
        const user=await User.findByPk(id);
        if(user){
            res.status(200).json(user)
        }else{
            res.status(404).json({error:"Libro no encontrado"});
        }
    } catch (error) {
        res.status(500).json({error:"Error al obtener el libro"});
    }
}
const createUser = async (req, res) => {
  try {
      const {password}=req.body;
      const passwordHash= await bcrypt.hash(password,10);
      req.body.password=passwordHash;
      const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar el Usuario" ,error:error.message });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, {
      where: { id },
    });
    console.log(updated);
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Usuario" });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.destroy({
      where: { id },
    });
    if (deleteUser) {
      res.status(200).json({
        message: "Eliminado correctamente",
      });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el Usuario" });
  }
};
const loginUser=async(req,res)=>{
    try {
        const {email, password}=req.body;
    const user=await User.findOne({ where:{correoElectronico:email}});
    if(!user){
        return res.status(404).json({
            error:"Nombre de usuario o contraseña invalidos"
        })
    }
    //verificamos la contraseña
    const passwordIgual=await bcrypt.compare(password,user.password);
    if(!passwordIgual){
        return res.status(400).json({
            error:"Nombre de Usuario o contraseña invalidos"
        })
    }
    //geenramos el token para devolver al usuario
    const token=jwt.sign({userId:user.id},"llave_secreta",{
        expiresIn:"1h"
    })
    //devolver el token al usuario
    res.status(200).json({token})
    } catch (error) {
        console.error("Error al iniciar sesión",error);
        res.status(500).json({
            error:"Ocurrio un error al iniciar sesion"
        })
    }

}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser
};
