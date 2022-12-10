import connection from "../database/db.js";

async function findGame (req,res){
    const {name} = req.query;

    try {
        const findGame = await connection.query(`
            SELECT
                games.*, 
                categories.name AS "categoriesName"
            FROM
                games
            JOIN
                categories
            ON
                games."categoryId" = categories.id
            WHERE
                name
            LIKE 
                '$1%'
            `,[name]
        );
        res.send(findGame.rows);
    } catch (error) {
        res.sendStatus(500);
    }

};

async function insertIntoGame (req,res){

};

export {findGame, insertIntoGame};