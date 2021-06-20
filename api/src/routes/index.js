const  { Router } = require('express');
const router = Router();


//USERS ROUTES
const { getUsers, getUserById, findUser, setUser, updateUser, deleteUser, changeImage, updateConfirm, checkConfirm } = require('../controllers/users.controller');

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/userCheck/:id', checkConfirm);
router.get('/user/verify/:id', updateConfirm);
router.post('/findUser', findUser);
router.post('/user', setUser);
router.post('/user/changeImage', changeImage);
router.put('/user', updateUser);
router.delete('/user/:id', deleteUser);


//PRODUCT ROUTES
const { getProducts, getProductsByCategory, getProductById, setProduct, updateStock, updateProduct, deleteProduct, searchProduct } = require('../controllers/products.controller');

router.get('/products', getProducts);
router.get('/products/:id', getProductsByCategory);
router.get('/product/:id', getProductById);
router.post('/product', setProduct);
router.post('/product/search', searchProduct)
router.post('/product/stock', updateStock)
router.put('/product', updateProduct);
router.delete('/product/:id', deleteProduct);


//CATEGORY ROUTES
const { getCategories, getCategoryById, setCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller');

router.get('/categories', getCategories);
router.get('/category/:id', getCategoryById);
router.post('/category', setCategory);
router.put('/category', updateCategory);
router.delete('/category/:id', deleteCategory);


//REQUEST ROUTES
const { getRequestDetails, setRequestGame, productExist, updateRequestGame, getAmount, newRequest, getRequest, getHistory, changeStatus } = require ('../controllers/requests.controller');

router.get('/cart/:id', getRequestDetails);
router.post('/cart', setRequestGame);
router.post('/cartExist', productExist);
router.post('/cartUpdate', updateRequestGame);
router.post('/newRequest', newRequest);
router.post('/request/amount', getAmount);
router.post('/request/change', changeStatus);
router.get('/request/:id', getRequest);
router.get('/history/:id',getHistory);

//AUTH ROUTES
const { signIn, signUp, sendEmail, verifyToken } = require ('../controllers/auth.controller');

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/auth/email', sendEmail);
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