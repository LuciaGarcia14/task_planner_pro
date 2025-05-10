const jwt = require('jsonwebtoken');
const secret_key = '1652013pP';

const verify_token = (allowedPermission = []) => (req, res, next) => {
    let token = req.cookies.token;

    if(!token) return res.status(401).json({ message: 'No token provided' });

    try{
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;

        if(allowedPermission.length > 0 && (!req.user || !allowedPermission.includes(req.user.role))){
            return res.status(403).json({ message: 'You do not have permission'});

            next();
        }

    }catch(error){
        return res.status(401).json({ message: 'Invalid Token '});
    }
}

module.exports = {
    verify_token
};
