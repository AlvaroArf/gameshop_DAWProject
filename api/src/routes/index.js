const  { Router } = require('express');
const router = Router();

//USERS ROUTES
const { getUsers, getUserById, setUser, updateUser, deleteUser } = require('../controllers/users.controller');


router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.post('/user', setUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

//PRODUCT ROUTES
const { getProducts, getProductById, setProduct, updateProduct, deleteProduct } = require('../controllers/products.controller');

router.get('/products', getProducts);
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


module.exports = router;