const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})

const getCategories = async (req, res) => {
    const response = await pool.query('SELECT * FROM categoria');
    res.json(response.rows);
    //console.log(response.rows);
};

const getCategoryById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM categoria WHERE id_categoria = $1', [id]);
    console.log(response);
    res.json(response.rows);
    //res.send('User ID ' + id);
};

const setCategory = async (req, res) => {
    const { nombre_categoria, descripcion_categoria } = req.body;
    const response = await pool.query('INSERT INTO categoria (nombre_categoria, descripcion_categoria) VALUES ($1, $2)', [nombre_categoria, descripcion_categoria]);

    console.log(response.row);
    res.send('CATEGORY CREATED');
};

const updateCategory = async (req, res) => {
    const { id_categoria, nombre_categoria, descripcion_categoria } = req.body;
    const response = await pool.query('UPDATE categoria SET nombre_categoria = $1, descripcion_categoria = $2 WHERE id_categoria = $3', [nombre_categoria, descripcion_categoria, id_categoria]);
    res.json('CATEGORY '+ id_categoria + ' UPDATED');
};

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    const response2 = await pool.query('delete from detalle_pedido where id_producto in (select id_producto from producto where id_categoria = $1)', [id]);
    const resposne1 = await pool.query('DELETE FROM producto WHERE id_categoria = $1', [id]);
    const response = await pool.query('DELETE FROM categoria WHERE id_categoria = $1', [id]);

    res.send('CATEGORY ' + id + ' DELETED');
};

module.exports = {
    getCategories,
    getCategoryById,
    setCategory,
    updateCategory,
    deleteCategory
}