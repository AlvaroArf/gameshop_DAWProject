const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const emailer = require('../config/emailer');


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
    const { name, surname, email, address, password} = req.body;
    const imagen = 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png';

    const response = await pool.query('INSERT INTO usuario (email, password, nombre, apellidos, direccion, admin, imagen) VALUES ($1, $2, $3, $4, $5, false, $6) returning *', [email, password, name, surname, address, imagen]);
    await pool.query('insert into pedido (comprando, fecha, id_usuario) values (true, current_date, $1) returning *', [response.rows[0].id_usuario]);

    res.json(response.rows[0].id_usuario);
    /*
    if(response != undefined){
        const token = jwt.sign({id: response.rows[0].id_usuario}, 'secretKey');
        return res.status(200).json({token});
    }
    */
};

const sendEmail = async (req, res) => {
    try {
        const body = req.body;
        console.log("sendEmail: " + body['email'])
        emailer.sendMail(body['email'], body['id_usuario']);
        res.send("Correo de verificacion enviado: " + body['email']);
    } catch (e) {
        console.log(e);
        res.send("Error en el envio del correo de verificación");
    }
}

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
    sendEmail,
    verifyToken
}