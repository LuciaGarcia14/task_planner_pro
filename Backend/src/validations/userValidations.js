const { body, param, validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


const createUserValidation = [
    body('name')
    .notEmpty()
    .withMessage('name is required')
    .isString()
    .withMessage('The name must be a String'),

    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('The email must be valid'),

    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({min: 8})
    .withMessage('The password must be at least 8 characters long.'),
    
    validateResult
];

const getUserValidations = [
    validateResult
];

const deleteUserValidations = [
    param('id')
    .isMongoId()
    .withMessage('It must be valid mongoDB ID'),

    validateResult
];

const updateUserValidations = [
    param('id')
    .notEmpty()
    .withMessage('ID is required')
    .isMongoId()
    .withMessage('It must be valid mongoDB ID'),

    body('name')
    .optional()
    .isString()
    .withMessage('The name must be a String'),

    body('email')
    .optional()
    .isEmail()
    .withMessage('The email must be valid'),

    validateResult
];

const getUserByIdValidations = [
    param('id')
    .isMongoId()
    .withMessage('It must be valid mongoDB ID'),

    validateResult
];

const loginValidations = [
    body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid'),

    body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('The password must be at least 8 characters long.'),

    validateResult
];

module.exports = {
    createUserValidation,
    updateUserValidations,
    getUserValidations,
    deleteUserValidations,
    getUserByIdValidations,
    loginValidations
}