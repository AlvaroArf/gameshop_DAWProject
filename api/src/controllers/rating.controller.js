const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})


const getRating = async (req, res) => {
    const id_producto = req.params.id
    const response = await pool.query('select * from valoracion where id_producto = $1', [id_producto]);

    res.json(response.rows);
}

const setRating = async (req, res) => {
    const { id_producto, id_usuario, comentario, puntuacion } = req.body;
    const response = await pool.query('insert into valoracion values ($1, $2, $3, $4)', [comentario, puntuacion, id_usuario, id_producto]);

    res.send('RATING INSERTED');
}

const userComment = async (req, res) => {
    const { id_usuario, id_producto } = req.body;
    const response = await pool.query('select * from valoracion where id_usuario = $1 and id_producto = $2', [id_usuario, id_producto]);

    res.json(response.rows);
}
module.exports = {
    getRating,
    setRating,
    userComment

}