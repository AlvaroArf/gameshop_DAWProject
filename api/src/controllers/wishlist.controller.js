const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})

const getWishlist = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('select * from producto where id_producto in (select id_producto from lista_deseos where id_usuario = $1)', [id]);
    res.json(response.rows);
}

/*
const setWishlist = async (req, res) => {
    const { id_usuario, id_producto } = req.body;
    const response = await pool.query();
    res.json(response.rows);
}
*/

module.exports = {
    getWishlist
}