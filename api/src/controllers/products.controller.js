const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})

const getProducts = async (req, res) => {
    const response = await pool.query('SELECT * FROM producto ORDER BY nombre_producto');
    res.json(response.rows);
    //console.log(response.rows);
};

const getProductsByCategory = async (req,res) => {
    const id_categoria = req.params.id;
    const response = await pool.query('select prod.id_producto, prod.nombre_producto, prod.precio, prod.imagen from producto as prod where prod.id_categoria = $1;', [id_categoria]);
    res.json(response.rows);
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM producto WHERE id_producto = $1', [id]);
    console.log(response);
    res.json(response.rows);
    //res.send('User ID ' + id);
};

const setProduct = async (req, res) => {
    const { name, desc, price, stock, image, id_category } = req.body;
    const response = await pool.query('INSERT INTO producto (nombre_producto, descripcion, precio, stock, imagen, id_categoria) VALUES ($1, $2, $3, $4, $5, $6)',[name, desc, price, stock, image, id_category]);
    console.log(response.row);
    res.send('PRODUCT CREATED');
};

const updateProduct = async (req, res) => {
    const { id_producto, stock, precio } = req.body;
    const response = await pool.query('UPDATE producto SET stock = $1, precio = $2 WHERE id_producto = $3', [stock, precio, id_producto]);
    console.log(response);
    res.json('PRODUCT '+ id + ' UPDATED');
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const response3 = await pool.query('DELETE FROM lista_deseos where id_producto = $1', [id]);
    const response2 = await pool.query('DELETE FROM valoracion where id_producto = $1', [id]);
    const response1 = await pool.query('DELETE FROM detalle_pedido where id_producto = $1', [id]);
    const response = await pool.query('DELETE FROM producto WHERE id_producto = $1', [id]);

    res.send('PRODUCT ' + id + ' DELETED');
};

const searchProduct = async (req, res)=> {

    const busqueda = req.body;
    const response = await pool.query("select * from producto where nombre_producto ilike concat('%', $1::varchar(255), '%')", [busqueda['busqueda']]);

    res.json(response.rows);
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductById,
    setProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}