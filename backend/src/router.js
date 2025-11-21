const express = require('express');
const usersController = require('./controllers/usersController');
const usersMiddleware = require('./middlewares/usersMiddleware');
const productsController = require('./controllers/productsController');
const productsMiddleware = require('./middlewares/productsMiddleware');
const entriesController = require('./controllers/entriesController');
const entriesMiddleware = require('./middlewares/entriesMiddleware');
const purchasesController = require('./controllers/purchasesController');
const purchasesMiddleware = require('./middlewares/purchasesMiddleware');
const pbController = require('./controllers/pbController');
const pbMiddleware = require('./middlewares/pbMiddleware');
const globalMiddleware = require('./middlewares/globalMiddleware');
const { AppError } = require('./controllers/globalController');
const router = express.Router();

// LOGIN E CRIAÇÃO DE CONTA //
router.post('/data/users', usersMiddleware.validateFieldsExtrict, usersMiddleware.passwordCheck, usersController.createUser);
router.post('/login', globalMiddleware.login);
router.get('/data/products',productsController.getAllProducts); 
// JWT // 

router.use(globalMiddleware.verifyToken);

// 

// PUBLIC-AUTH ENDPOINTS <<<<<<<<<<<<<<<<<<<

//GETTERS

router.get('/data/products/:id', productsController.getProduct);
router.get('/data/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), purchasesController.getPurchase);
router.get('/data/purchases/:id/products/:id2',globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbController.getPb);
router.get('/data/users/:id', globalMiddleware.setParamsToMySelf('id'), usersController.getUser);

//POST
router.post('/data/purchases', globalMiddleware.injectUserId('fk_usuario'), purchasesMiddleware.validateFieldsExtrict, purchasesController.createPurchase); 
router.post('/data/purchases/:id/products', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbMiddleware.validateFieldsExtrict, pbController.createPb);

//PUT
router.put('/data/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), purchasesMiddleware.validateFields ,purchasesController.updatePurchase);
router.put('/data/purchases/:id/products/:id2',globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbMiddleware.validateFields ,pbController.updatePb);
router.put('/data/users/:id', globalMiddleware.setParamsToMySelf('id'), usersMiddleware.validateFields , usersMiddleware.passwordCheck, usersController.updateUser); 

//DELETE
router.delete('/data/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), purchasesController.deletePurchase);
router.delete('/data/purchases/:id/products/:id2', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbController.deletePb);
router.delete('/data/users/:id', globalMiddleware.setParamsToMySelf('id'), usersController.deleteUser); 


//<<<<<<<<<<<<<<<<<<<

// JWT EXTRICT //

router.use(globalMiddleware.verifyAdmin);

//


// USERS STRICT //
router.get('/data/users',usersController.getAllUsers);


// PRODUCTS STRICT//


router.post('/data/products', productsMiddleware.validateFieldsExtrict, productsController.createProduct);
router.delete('/data/products/:id', productsController.deleteProduct);
router.put('/data/products/:id', productsMiddleware.validateFields ,productsController.updateProduct);

// ENTRIES STRICT //
router.get('/data/entries',entriesController.getAllEntries);
router.post('/data/entries', entriesMiddleware.validateFieldsExtrict, entriesController.createEntry);
router.delete('/data/entries/:id', entriesController.deleteEntry);
router.put('/data/entries/:id', entriesMiddleware.validateFields ,entriesController.updateEntry);

// PURCHASES STRICT //
router.get('/data/purchases',purchasesController.getAllPurchases);
router.get('/data/pb',pbController.getAllPb);


// GLOBALS //

router.use((_request, _response, next) => {
    const err = new AppError("A rota não existe.", 404);
    next(err);
    return;
})

router.use(globalMiddleware.showError);


module.exports = router;