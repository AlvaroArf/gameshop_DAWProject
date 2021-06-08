const  { Router } = require('express');
const router = Router();


//USERS ROUTES
const { getUsers, getUserById, findUser, setUser, updateUser, deleteUser } = require('../controllers/users.controller');

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.post('/findUser', findUser);
router.post('/user', setUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);


//PRODUCT ROUTES
const { getProducts, getProductsByCategory, getProductById, setProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');

router.get('/products', getProducts);
router.get('/products/:id', getProductsByCategory);
router.get('/product/:id', getProductById);
router.post('/product', setProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);


//CATEGORY ROUTES
const { getCategories, getCategoryById, setCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');

router.get('/categories', getCategories);
router.get('/category/:id', getCategoryById);
router.post('/category', setCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);


//REQUEST ROUTES
const { getRequestDetails, setRequestGame, productExist, updateRequestGame ,newRequest } = require ('../controllers/requests.controller');

router.get('/cart/:id', getRequestDetails);
router.post('/cart', setRequestGame);
router.post('/cartExist', productExist);
router.post('/cartUpdate', updateRequestGame);
router.post('/newRequest', newRequest);


//AUTH ROUTES
const { signIn, signUp, verifyToken } = require ('../controllers/auth.controller');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/verify', verifyToken);


//WISHLIST ROUTES
const { getWishlist } = require ('../controllers/wishlist.controller');

router.get('/wishlist/:id', getWishlist);

module.exports = router;