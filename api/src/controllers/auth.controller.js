const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})

//AUTH
const signIn = async (req, res) => {
    const { email, password} = req.body;
    const response = await pool.query('SELECT * FROM usuario WHERE email = $1 and password = $2', [email, password]);

    console.log(response.rows);
    if(response.rows == ""){
        return res.status(401).send("El correo o la contraseña es incorrecta");
    }

    const token = jwt.sign({id: response.rows.id_usuario}, 'secretKey');
    return res.status(200).json({token});
};

const signUp = async (req, res) => {
    const { email, password, nombre, apellidos, direccion } = req.body;
    const response = await pool.query('INSERT INTO usuario (email, password, nombre, apellidos, direccion) VALUES ($1, $2, $3, $4, $5) returning *', [email, password, nombre, apellidos, direccion]);
    await pool.query('insert into pedido (comprando, fecha, id_usuario) values (true, current_date, $1) returning *', [response.rows[0].id_usuario]);
    //insertRequest(response.rows[0].id_usuario);
    if(response != undefined){
        const token = jwt.sign({id: response.rows[0].id_usuario}, 'secretKey');
        return res.status(200).json({token});
    }
};
/*
const insertRequest = (id_usuario) => {
    const response = pool.query('insert into pedido (comprando, fecha, id_usuario) values (true, current_date, $1)', [id_usuario]);
}
*/
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Autorización fallida');
    }

    const token = req.headers.authorization.split(' ')[1]

    if (token === null) {
        return res.status(401).send('Autorización fallida');
    }

    const payload = jwt.verify(token, 'secretKey');
    console.log(payload);
    req.userId = payload.id_usuario;
    next();
}



module.exports = {
    signIn,
    signUp,
    verifyToken
}