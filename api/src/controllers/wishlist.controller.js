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
    const response = await pool.query('select * from producto as prod join lista_deseos as ld on id_usuario = $1 where prod.id_producto = ld.id_producto order by ld.orden', [id]);
    res.json(response.rows);
}

const setWishlist = async (req, res) => {
    const { id_usuario, id_producto } = req.body;

    const consulta = await pool.query('select * from lista_deseos where id_usuario = $1 and id_producto = $2', [id_usuario, id_producto]);
    if(consulta.rows[0] == null){
        const response = await pool.query('INSERT INTO lista_deseos values ($1, $2)', [id_usuario, id_producto]);
        res.send("PRODUCT INSERTED ON WISHLIST");
    } else {
        res.send("PRODUCT ALREADY INSERTED ON WISHLIST");
    }

    
}

const orderWishlist = async (req, res) => {
    const { wishlist, id_usuario } = req.body;
    const borrado = await pool.query('DELETE FROM lista_deseos WHERE id_usuario = $1', [id_usuario]);

    for(let i = 0; i < wishlist.length; i++){
        const insert = await pool.query('INSERT INTO lista_deseos VALUES ($1, $2, $3)', [id_usuario, wishlist[i]['id_producto'], i + 1]);
    }
    res.send("WISHLIST ORDERED");
}

const delWishlist = async (req, res) => {
    const { id_usuario, id_producto } = req.body;
    const response = await pool.query('DELETE FROM lista_deseos WHERE id_usuario = $1 and id_producto = $2', [id_usuario, id_producto]);

    res.send("PRODUCTS DELETED FROM WISHLIST");
}

module.exports = {
    getWishlist,
    setWishlist,
    delWishlist,
    orderWishlist
}