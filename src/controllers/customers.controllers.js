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
    const {id} = req.params;

    try {
        const findCustormers = await connection.query(`
        SELECT * FROM custormers WHERE id=$1
        `,[id]);

        if (findCustormers.rows.length){
            return res.status(200).send(findCustormers.rows[0]);
        }
        res.sendStatus(404);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function insertIntoCustormers (req,res){

};

async function updateCustormers (req,res){

};

export {listCustormers, findCustormers, insertIntoCustormers, updateCustormers};