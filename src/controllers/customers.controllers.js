import connection from "../database/db.js";

async function listCustormers (req,res){
    const {cpf} = req.query;
    let findCustormers;
    try {
        if(cpf){
            findCustormers = await connection.query(`
            SELECT * FROM 
                customers
            WHERE
                cpf
            LIKE
                $1;
            `, [cpf + '%']);
        } else {
            findCustormers = await connection.query(`
            SELECT * FROM customers;
            `);
        }
        res.sendStatus(findCustormers.rows);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function findCustormers (req,res){

};

async function insertIntoCustormers (req,res){

};

async function updateCustormers (req,res){

};

export {listCustormers, findCustormers, insertIntoCustormers, updateCustormers};