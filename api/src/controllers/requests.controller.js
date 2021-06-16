const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'alvaror',
    password: 'alvaror',
    database: 'gameshop',
    port: '5432'
})

const getRequestDetails = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('select dp.id_pedido, dp.id_producto, dp.cantidad, dp.devuelto, prod.nombre_producto, prod.precio, prod.imagen from producto as prod join pedido as ped on ped.id_usuario = $1 and ped.comprando = true join detalle_pedido as dp on dp.id_pedido = ped.id_pedido where prod.id_producto = dp.id_producto order by prod.nombre_producto;', [id]);
    //const response = await pool.query('select * from producto where id_producto in (select dp.id_producto from detalle_pedido as dp join pedido as ped on ped.id_usuario = $1 where dp.id_pedido = ped.id_pedido', [id_usuario])
    res.json(response.rows);
};

const setRequestGame = async (req, res) => {
    const { id_usuario, id_producto  } = req.body;
    
    console.log("API: " + id_usuario + " " + id_producto);
    const response = await pool.query('insert into detalle_pedido(id_pedido, id_producto, cantidad,devuelto) select ped.id_pedido as id_pedido, $2 as "id_producto", 1 as "cantidad",false from pedido as ped where ped.id_usuario = $1 and ped.comprando = true', [id_usuario, id_producto]);

    //res.json(response.rows);
    res.send('PRODUCT INSERTED ON REQUEST_DETAILS');
};

const productExist = async (req, res) => {
    const { id_usuario, id_producto } = req.body;

    const response = await pool.query('select cantidad from detalle_pedido where id_pedido in (select id_pedido from pedido where comprando = true and id_usuario = $1 and id_producto = $2);', [id_usuario, id_producto]);
     
    res.json(response.rows);
};


const updateRequestGame = async (req, res) => {
    const { cantidad, id_pedido, id_producto, id_usuario } = req.body;
    if(id_usuario == null){
        if (cantidad > 0) {
            const response = await pool.query('update detalle_pedido as dp set cantidad = $1 where id_pedido = $2 and id_producto = $3;', [cantidad, id_pedido, id_producto]);
            res.send('REQUEST_DETAILS UPDATED');
        } else {
            const response = await pool.query('delete from detalle_pedido where id_pedido = $1 and id_producto = $2', [id_pedido, id_producto]);
            res.send('REQUEST_DETAILS DELETED');
        }
    } else {
        const consulta = await pool.query('select id_pedido, cantidad from detalle_pedido where id_pedido in (select id_pedido from pedido where id_usuario = $1 and comprando = true) and id_producto = $2', [id_usuario, id_producto]);
        const cantidad = parseInt(consulta.rows[0]['cantidad']) + 1;
        const id_pedido = consulta.rows[0]['id_pedido'];

        const response = await pool.query('update detalle_pedido as dp set cantidad = $1 where id_pedido = $2 and id_producto = $3;', [cantidad, id_pedido, id_producto]);
        res.send('REQUEST_DETAILS AMOUNT UPDATED');

        //const cantidad = await pool.query('select cantidad from detalle_pedido where id_pedido = $1 and id_producto = $2', [id_pedido, id_producto]);
        //res.json(cantidad.rows[0]['cantidad'])
    }

}

const newRequest = async (req, res) => {
    const { id_pedido, id_usuario } = req.body;

    const resupdate = await pool.query('update pedido set comprando = false where id_pedido = $1', [id_pedido]);
    const resinsert = await pool.query('insert into pedido (comprando, fecha, id_usuario) values (true, current_date, $1)', [id_usuario]);

    res.send('NEW REQUEST CREATED');
}

const getRequest = async (req, res) => {
    const id_usuario = req.params.id;
    const response = await pool.query('select * from pedido where id_usuario = $1 and comprando = false order by id_pedido', [id_usuario])
/*
    for(let i = 0; i < response.rows.length; i++){
        response.rows[i]['fecha'] = response.rows[i]['fecha'].split("T")[0];
    }
*/

    const fecha = response.rows[0]['fecha'];
    console.log("LA FECHA" + fecha)
    res.json(response.rows);
}

const getHistory = async (req, res) => {
    const id_pedido = req.params.id;
    //const response = await pool.query('select p.id_pedido, p.fecha,  dp.id_producto, dp.cantidad, dp.devuelto from pedido as p join detalle_pedido as dp on dp.id_pedido = p.id_pedido where id_usuario = $1 and p.comprando = false order by p.id_pedido', [id_usuario]);
    const response = await pool.query('select dp.id_producto, p.nombre_producto, p.imagen, p.precio, dp.cantidad, dp.devuelto from detalle_pedido as dp join producto as p on p.id_producto = dp.id_producto where id_pedido = $1', [id_pedido]);
    res.json(response.rows);
}

const changeStatus = async (req, res) => {
    const { id_pedido, id_producto, status } = req.body;
    const response = await pool.query('update detalle_pedido set devuelto = $1 where id_pedido = $2 and id_producto = $3', [status, id_pedido, id_producto]);

    res.send("STATUS CHANGED");
}



module.exports = {
    getRequestDetails,
    setRequestGame,
    productExist,
    updateRequestGame,
    newRequest,
    getRequest,
    getHistory,
    changeStatus
}