# USUÁRIO PADRÃO DE TESTES: 
{
     "email": "g@gma3l.com",
    "senha": "TESTEsenha123",
}

//aquivo de  rotas secundário (caso de erro):

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
router.post('/data/users', usersMiddleware.validateFieldsExtrict, usersMiddleware.passwordCheckExtrict, usersController.createUser);
router.post('/login', globalMiddleware.login);
router.get('/data/products',productsController.getAllProducts); 
// JWT // 

router.use(globalMiddleware.verifyToken);
router.use(globalMiddleware.isDeleted);

// 

// PUBLIC-AUTH ENDPOINTS <<<<<<<<<<<<<<<<<<<

router.get('/me', usersController.getMe);
router.put('/me', usersMiddleware.validateFields , usersMiddleware.passwordCheck, usersController.updateMe);
router.get('/me/purchases', purchasesController.getMyPurchases);
router.get('/me/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra', false), purchasesController.getPurchase);
router.get('/me/purchases/:id/products', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra', false), pbController.getAllMyPb);
router.get('/me/purchases/:id/products/:id2',globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra', false), pbController.getPb  )
router.get('/data/products/:id', productsController.getProduct);
router.post('/me/purchases', globalMiddleware.injectUserId('fk_usuario'), purchasesMiddleware.validateFieldsExtrict, purchasesController.createPurchase);
router.post('/me/purchases/:id/products', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra', false), pbMiddleware.validateFieldsExtrict, pbController.createPb);
router.put('/me/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra', false), purchasesMiddleware.validateFields ,purchasesController.updatePurchase);
router.put('/me/purchases/:id/products/:id2', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra', false), pbMiddleware.validateFields ,pbController.updatePb);
router.delete('/me/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra', false), purchasesController.deletePurchase);
router.delete('/me/purchases/:id/products/:id2',  globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbController.deletePb);
router.delete('/me',  usersController.deleteMe);

router.get('/data/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), purchasesController.getPurchase);////////////////////////////////////////
router.get('/data/purchases/:id/products/:id2',globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbController.getPb);////////////////////////////////////
router.get('/data/users/:id', globalMiddleware.verifyParamsToMySelf('id'), usersController.getUser);/////////////////////////////

//POST
router.post('/data/purchases', globalMiddleware.injectUserId('fk_usuario'), purchasesMiddleware.validateFieldsExtrict, purchasesController.createPurchase); ////////////////////////////////////////
router.post('/data/purchases/:id/products', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbMiddleware.validateFieldsExtrict, pbController.createPb); /////////////////////////////

//PUT
router.put('/data/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), purchasesMiddleware.validateFields ,purchasesController.updatePurchase);///////////////////////////////////
router.put('/data/purchases/:id/products/:id2',globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbMiddleware.validateFields ,pbController.updatePb);///////////////////////////////////
router.put('/data/users/:id', globalMiddleware.verifyParamsToMySelf('id'), usersMiddleware.validateFields , usersMiddleware.passwordCheck, usersController.updateUser); ///////////////////////////////////

//DELETE
router.delete('/data/purchases/:id', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), purchasesController.deletePurchase); ///////////////////////////////////
router.delete('/data/purchases/:id/products/:id2', globalMiddleware.injectValidateFk('compra','fk_usuario','id_compra'), pbController.deletePb);
router.delete('/data/users/:id', globalMiddleware.verifyParamsToMySelf('id'), usersController.deleteUser); 


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