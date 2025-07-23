const { body, validationResult } = require('express-validator');

const menuItemRules = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a number > 0'),
  body('description').notEmpty().isString(),
];

const updateMenuItemRules = [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be > 0'),
    body('description').optional().isString(),
  ];

const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  next();
};

module.exports = { menuItemRules,updateMenuItemRules ,runValidation };
