const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})

const getRequestDetails = async (req, res) => {
    const { id_usuario } = req.body;
    const response = await pool.query('select dp.id_pedido, dp.id_producto, dp.cantidad, dp.devuelto from detalle_pedido as dp join pedido as ped on ped.id_usuario = $1 where dp.id_pedido = ped.id_pedido', [id_usuario]);
    res.json(response.rows);
    //console.log(response.rows);
};

const setRequestGame = async (req, res) => {
    const { user, product  } = req.params;
    console.log("API: " + user + " " + product);
    const response = await pool.query('insert into detalle_pedido (id_producto, cantidad, devuelto) values' +
                                      'select distinct prod.id_producto, 1 as "cantidad", false as "devuelto"' +
                                      'from producto as prod, detalle_pedido as dp' +
                                      'join pedido as ped on ped.id_pedido = dp.id_pedido' + 
                                      'where ped.id_usuario = $1' +
                                      'and prod.id_producto = $2', [user, product]);

    console.log(response.row);
    res.send('PRODUCT INSERTED ON REQUEST_DETAILS');
};


module.exports = {
    getRequestDetails,
    setRequestGame
}