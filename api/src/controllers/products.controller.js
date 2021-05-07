const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})

const getProducts = async (req, res) => {
    const response = await pool.query('SELECT * FROM producto');
    res.json(response.rows);
    //console.log(response.rows);
};

const getProductById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM producto WHERE id_producto = $1', [id]);
    console.log(response);
    res.json(response.rows);
    //res.send('User ID ' + id);
};

const setProduct = async (req, res) => {
    const { name, desc, price, stock, image, id_category } = req.body;
    const response = await pool.query('INSERT INTO producto (nombre_producto, descricion, precio, stock, imagen, id_categoria) VALUES ($1, $2, $3, $4, $5, $6)',[name, desc, price, stock, image, id_category]);
    console.log(response.row);
    res.send('PRODUCT CREATED');
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { stock, precio } = req.body;
    const response = await pool.query('UPDATE producto SET stock = $1, precio = $2 WHERE id_producto = $3', [stock, precio, id]);
    console.log(response);
    res.json('PRODUCT '+ id + ' UPDATED');
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM producto WHERE id_producto = $1', [id]);

    res.send('PRODUCT ' + id + ' DELETED');
};

module.exports = {
    getProducts,
    getProductById,
    setProduct,
    updateProduct,
    deleteProduct
}