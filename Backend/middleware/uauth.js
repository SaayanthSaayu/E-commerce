const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).send({ message: 'Token not provided' });
    
    jwt.verify(token, process.env.JWT_SECRET , ( err , decoded ) => {
        if (err) return res.status(401).json({msg:"Invalid Token"});

        req.user = decoded;
        next();
    });
};

const isAdmin = ( req, res, next ) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.status(403).json({ msg: "Forbiden only for admin" });
    }
};

const isClient = (req , res , next ) => {
    if (req.user && req.user.role === "client") {
        next();
    } else {
            res.status(403).json({ msg: "Forbidden only for client" });
    }
}

module.exports = { verifyToken , isAdmin ,isClient };