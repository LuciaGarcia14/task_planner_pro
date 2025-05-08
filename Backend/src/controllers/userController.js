const { getUsers, updateUser, insertUser, deleteUser, getUserById, loginUser} = require('../services/userService');
const{
    createUserValidation, 
    updateUserValidations, 
    getUserValidations, 
    deleteUserValidations, 
    getUserByIdValidations, 
    loginValidations
} = require('../validations/userValidations');

const userController = {
    getUserController: [
        ...getUserValidations,
        async(req, res)=>{
            try{
                const data = await getUsers();
                res.status(200).json(data);

            }catch(error){
                console.error('Error retrieving user from the database', error)
                res.status(500).json({error: 'Error retrieving user from the database'});
            }
        }
    ],

    createUser: [
        ...createUserValidation,
        async(req, res) =>{
            try{
                const newUser = await insertUser(req.body);
                console.log('user created:', newUser);
                res.status(201).json(newUser);

            }catch(error){
                console.error('Error creating the user', error);
                res.status(500).json({message: 'Internal server error', sucess: 'NOK', error: error.message});
            }
        }

    ],

    deleteUser: [
        ...deleteUserValidations,
        async(req, res) => {
            try{
                const {id} = req.params;
                const deletedUser = await deleteUser(id);
                res.status(200).json(deletedUser);
            }catch(error){
                console.error('Error deleted user', error);
                res.status(500).json({error: 'Error while deleting user'});
            }
        }
    ],

    updateUser: [
        ...updateUserValidations,
        async(req, res) =>{
            try{
                const {id} = req.params;
                const userData = req.body;
                const updatedUser = await updateUser(id, userData);
                res.status(200).json(updatedUser);
            }catch(error){
                console.error('Error while updating user', error);
                res.status(500).json({ error: 'Error while updating user '})
            }
        }
    ],

    getUserById: [
        ...getUserByIdValidations,
        async(req, res) => {
            try{
                const {id} = req.params;
                const user = await getUserById(id);
                res.status(200).json(user);
            }catch(error){
                console.error('Error while fetching user by ID', error);
                res.status(500).json({ error: 'Error while fetching user by ID' });
            }
        }
    ],

    loginUser: [
        ...loginValidations,
        async(req, res) => {
            try{
                const {email, password} = req.body;
                const token = await loginUser(email, password);

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite:'Lax',
                    maxAge: 3600000,
                    path:'/'
                });

                res.status(200).json({ menssage: 'Login successful', token});
            }catch(error){
                console.error('The session could not be started', error);
                res.status(401).json({ error: error.message });

            }
        }
    ],

    verifyToken: async (req, res) => {
        try {
            let token = req.cookies.token;
    
            if (!token && req.headers.authorization) {
                const authorization = req.headers.authorization;
                if (authorization.startsWith("Bearer ")) {
                    token = authorization.substring(7);
                }
            }

            if(!token){
                return res.status(401).json({ authenticated: false, message: 'No token provided'});
            }

            res.status(200).json({ authenticated: true});

        }catch(error){
            console.error('Error verifying token', error);
            res.status(401).json({ authenticated: false, message: error.menssage });
        }
    },

    logOutUser: async(req, res) => {
        try{
            res.cookie('token', '', {
                expires: new Date(0),
                httpOnly: true,
                path: '/'
            });

            res.status(200).json({ mensagge: 'The session has been successfully closed' });
        }catch(error){
            console.error('Error logout:', error);
            res.status(500).json({message: 'Internar server error', success: 'NOK', error: error.mensagge });
        }
    }
}

module.exports = userController;

