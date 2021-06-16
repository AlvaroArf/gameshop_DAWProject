const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * FROM usuario');
    res.json(response.rows);
    //console.log(response.rows);
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM usuario WHERE id_usuario = $1', [id]);
    console.log(response);
    res.json(response.rows);
    //res.send('User ID ' + id);
};

const findUser = async (req, res) => {
    const { email } = req.body;
    const response = await pool.query('SELECT id_usuario FROM usuario WHERE email = $1', [email]);

    res.send(response.rows);
};

const setUser = async (req, res) => {
    const { email, password, nombre, apellidos, direccion, admin } = req.body;
    const imagen = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png';
    const response = await pool.query('INSERT INTO usuario (email, password, nombre, apellidos, direccion, imagen, admin) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *', [email, password, nombre, apellidos, direccion, imagen, admin]);
    await pool.query('insert into pedido (comprando, fecha, id_usuario) values (true, current_date, $1) returning *', [response.rows[0].id_usuario]);

    console.log(response.rows);
    res.send('USER CREATED');
};

const updateUser = async (req, res) => {
    const { id_usuario, email, nombre, apellidos, admin } = req.body;
    const response = await pool.query('UPDATE usuario SET nombre = $1, apellidos = $2, email = $3, admin = $4 WHERE id_usuario = $5', [nombre, apellidos, email, admin, id_usuario ]);
    console.log(response);
    res.send('USER '+ id_usuario + ' UPDATED');
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response4 = await pool.query('delete from detalle_pedido where id_pedido in (select id_pedido from pedido where id_usuario = $1)', [id]);
    const response1 = await pool.query('delete from pedido where id_usuario = $1', [id]);
    const response2 = await pool.query('delete from valoracion where id_usuario = $1', [id]);
    const response3 = await pool.query('delete from lista_deseos where id_usuario = $1', [id]);
    const response = await pool.query('DELETE FROM usuario WHERE id_usuario = $1', [id]);

    res.send('USER ' + id + ' DELETED');
};

const changeImage = async (req, res) => {
    const {id_usuario, imagen } = req.body;
    const response = await pool.query('update usuario set imagen = $2 where id_usuario = $1', [id_usuario, imagen]);

    res.send('IMAGE CHANGED');
}

module.exports = {
    getUsers,
    getUserById,
    findUser,
    setUser,
    updateUser,
    deleteUser,
    changeImage
}