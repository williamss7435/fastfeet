const { Router } = require('express');
const Multer = require('multer');
const Auth = require('./app/middleware/Auth');
const MulterConfig = require('./config/multer');

const UserController = require('./app/controllers/UserController');
const AuthenticationController = require('./app/controllers/AuthenticationController');
const RecipientController = require('./app/controllers/RecipientController');
const DeliveryPeopleController = require('./app/controllers/DeliveryPeopleController');
const DeliveryManController = require('./app/controllers/DeliveryManController');
const PhotoFileController = require('./app/controllers/PhotoFileController');
const SignatureFileController = require('./app/controllers/SignatureFileController');
const OrderController = require('./app/controllers/OrderController');
const OrderProblemController = require('./app/controllers/OrderProblemController');

const upload = Multer(MulterConfig);

const routers = new Router();

// Init Routers

routers.post('/login', AuthenticationController.login);
routers.post('/users', UserController.store);
// Deliveryman Routers (No Auth)
routers.get('/deliveryman/orders/:deliveryman_id', DeliveryManController.index);
routers.put('/deliveryman/orders/:order_id/withdrawal', DeliveryManController.withdrawal);
routers.put('/deliveryman/orders/:order_id/finish', DeliveryManController.finish);

routers.post('/deliveryman/orders/:order_id/problems', OrderProblemController.store);
routers.get('/deliverypeople/:deliveryman_id', DeliveryPeopleController.index);

routers.get('/deliveryman/problems/order/:order_id', OrderProblemController.indexById);

routers.post('/signatures', upload.single('file'), SignatureFileController.store);

// Token Validation
routers.use(Auth);

routers.get('/recipients', RecipientController.index);
routers.get('/recipients/:recipient_id', RecipientController.index);
routers.post('/recipients', RecipientController.store);
routers.put('/recipients/:recipient_id', RecipientController.update);

routers.get('/deliverypeople/', DeliveryPeopleController.index);
routers.post('/deliverypeople', DeliveryPeopleController.store);
routers.put('/deliverypeople/:deliveryman_id', DeliveryPeopleController.update);
routers.delete('/deliverypeople/:id', DeliveryPeopleController.delete);

routers.get('/orders', OrderController.index);
routers.get('/orders/:order_id', OrderController.index);
routers.post('/orders', OrderController.store);
routers.put('/orders/:order_id', OrderController.update);
routers.delete('/orders/:order_id', OrderController.delete);

routers.get('/problems/orders', OrderProblemController.index);
routers.delete('/problems/orders/:problem_id/cancel', OrderProblemController.delete);

routers.post('/photos', upload.single('photo'), PhotoFileController.store);

module.exports = routers;
