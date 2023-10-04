const jwt =require('jsonwebtoken')

function authMidleware(req,res,next){
    const token =req.header('Authorization');
    if(!token){
        return res.status(400).json({error:"Token no proporcionado"})
    }

    try {
        const decoded=jwt.verify(token,'llave_secreta');
        req.userId=decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({error:"Token no valido"})
    }
}

module.exports=authMidleware;