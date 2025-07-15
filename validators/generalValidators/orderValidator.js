const { body, validationResult } = require('express-validator');

 const orderValidator = [
  body('restaurantId')
    .exists().withMessage('restaurantId is required')
    .isInt({ gt: 0 }).withMessage('restaurantId must be a positive integer'),

  body('items')
    .exists().withMessage('menuItems are required')
    .isArray({ min: 1 }).withMessage('menuItems must be a non-empty array'),

  body('items.*.menuItemId')
    .exists().withMessage('menuItemId is required')
    .isInt({ gt: 0 }).withMessage('menuItemId must be a positive integer'),

  body('items.*.quantity')
    .exists().withMessage('quantity is required')
    .isInt({ gt: 1 }).withMessage('quantity must be greater than 0'),

  body('items.*.price')
    .exists().withMessage('price is required')
    .isFloat({ gt: 0 }).withMessage('price must be a positive number'),

  body('items').custom(items => {
    const total = items.reduce((acc, i) => acc + i.quantity * i.price, 0);
    if (total < 50) {
      throw new Error(`Total must be at least 50, current total is ${total}`);
    }
    return true;
  }),
];


// const runValidation = (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
//     next();
//   };

module.exports = {orderValidator }