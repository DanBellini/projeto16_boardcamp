import connection from "../database/db.js";

async function listCustomers (req,res){
    const {cpf} = req.query;
    let findCustomers;
    try {
        if(cpf){
            findCustomers = await connection.query(`
            SELECT * FROM 
                customers
            WHERE
                cpf
            LIKE
                $1;
            `, [cpf + '%']);
        } else {
            findCustomers = await connection.query(`
            SELECT * FROM customers;
            `);
        }
        res.sendStatus(findCustomers.rows);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function findCustomers (req,res){
    const {id} = req.params;

    try {
        const findCustomers = await connection.query(`
        SELECT * FROM Customers WHERE id=$1
        `,[id]);

        if (findCustomers.rows.length){
            return res.status(200).send(findCustomers.rows[0]);
        }
        res.sendStatus(404);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function insertIntoCustomers (req,res){
    const {
        name,
        phone,
        cpf,
        birthday
    } = res.locals;

    try {
        const duplicateCpf = await connection.query(`
            SELECT * FROM customers WHERE cpf=$1;
        `,[cpf]);
        if(duplicateCpf.rows[0]) return res.sendStatus(409);

        await connection.query(`
            INSERT INTO customers 
                (name, phone, cpf, birthday)
            VALUES
                ($1, $2, $3, $4);
        `,[name, phone, cpf, birthday]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function updateCustomers (req,res){
    const {id} = req.params;
    const {
        name,
        phone,
        cpf,
        birthday
    } = res.locals;

    try {
        const duplicateCpf = await connection.query(`
            SELECT * FROM customers WHERE cpf=$1;
        `,[cpf]);
            if(duplicateCpf.rows[0].id !== Number(id)) return res.sendStatus(409);

        await connection.query(`
            UPDATE
                customers
            SET
                name=$1,
                phone=$2,
                cpf=$3,
                birthday=$4
            WHERE
                id=$5
        `,[name, phone, cpf, birthday, id]);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
};

export {listCustomers, findCustomers, insertIntoCustomers, updateCustomers};