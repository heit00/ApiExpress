const express = require('express');
const usersController = require('./controllers/usersController');
const usersMiddleware = require('./middlewares/usersMiddleware');
const productsController = require('./controllers/productsController');
const productsMiddleware = require('./middlewares/productsMiddleware');
const entriesController = require('./controllers/entriesController');
const entriesMiddleware = require('./middlewares/entriesMiddleware');
const purchasesController = require('./controllers/purchasesController');
const purchasesMiddleware = require('./middlewares/purchasesMiddleware');
const router = express.Router();

// USERS //
router.get('/users',usersController.getAllUsers);
router.post('/users', usersMiddleware.validateFieldsExtrict, usersController.createUser);
router.delete('/users/:id', usersController.deleteUser);
router.put('/users/:id', usersMiddleware.validateFields ,usersController.updateUser);

// PRODUCTS //
router.get('/products',productsController.getAllProducts);
router.post('/products', productsMiddleware.validateFieldsExtrict, productsController.createProduct);
router.delete('/products/:id', productsController.deleteProduct);
router.put('/products/:id', productsMiddleware.validateFields ,productsController.updateProduct);

// ENTRIES //
router.get('/entries',entriesController.getAllEntries);
router.post('/entries', entriesMiddleware.validateFieldsExtrict, entriesController.createEntry);
router.delete('/entries/:id', entriesController.deleteEntry);
router.put('/entries/:id', entriesMiddleware.validateFields ,entriesController.updateEntry);

// PURCHASES
router.get('/purchases',purchasesController.getAllPurchases);
router.post('/purchases', purchasesMiddleware.validateFieldsExtrict, purchasesController.createPurchase);
router.delete('/purchases/:id', purchasesController.deletePurchase);
router.put('/purchasess/:id', purchasesMiddleware.validateFields ,purchasesController.updatePurchase);

module.exports = router;