const jwt= require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Bearer token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid or expired' });
        }
        req.user = decoded; // Store decoded user info in request
        next();
    });
};

module.exports= verifyToken