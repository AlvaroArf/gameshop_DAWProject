const  { Router } = require('express');
const router = Router();


//USERS ROUTES
const { getUsers, getUserById, findUser, setUser, updateUser, deleteUser, changeImage } = require('../controllers/users.controller');

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.post('/findUser', findUser);
router.post('/user', setUser);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);
router.post('/user/changeImage', changeImage);


//PRODUCT ROUTES
const { getProducts, getProductsByCategory, getProductById, setProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');

router.get('/products', getProducts);
router.get('/products/:id', getProductsByCategory);
router.get('/product/:id', getProductById);
router.post('/product', setProduct);
router.put('/product', updateProduct);
router.delete('/product/:id', deleteProduct);


//CATEGORY ROUTES
const { getCategories, getCategoryById, setCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');

router.get('/categories', getCategories);
router.get('/category/:id', getCategoryById);
router.post('/category', setCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);


//REQUEST ROUTES
const { getRequestDetails, setRequestGame, productExist, updateRequestGame ,newRequest, getHistory } = require ('../controllers/requests.controller');

router.get('/cart/:id', getRequestDetails);
router.post('/cart', setRequestGame);
router.post('/cartExist', productExist);
router.post('/cartUpdate', updateRequestGame);
router.post('/newRequest', newRequest);
router.get('/history/:id',getHistory);


//AUTH ROUTES
const { signIn, signUp, verifyToken } = require ('../controllers/auth.controller');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.get('/verify', verifyToken);


//WISHLIST ROUTES
const { getWishlist, setWishlist, delWishlist, orderWishlist } = require ('../controllers/wishlist.controller');

router.get('/wishlist/:id', getWishlist);
router.post('/wishlist', setWishlist);
router.post('/wishlistDel', delWishlist);
router.post('/wishlistOrder', orderWishlist);


//RATING ROUTES
const { getRating, setRating, userComment } = require ('../controllers/rating.controller');

router.get('/rating/:id', getRating);
router.post('/rating', setRating);
router.post('/rating/check', userComment);


module.exports = router;