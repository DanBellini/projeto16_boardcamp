import connection from "../database/db.js";

async function listOfCategories (req,res){
    try {
        const list = await connection.query(
            'SELECT * FROM categories;'
        );

        res.send(list.rows);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function insertIntoCategories (req,res){
    const {name} = req.body;

    if (!name) return res.sendStatus(400);

    try {

        const nameAlreadyResgistered = await connection.query(
            'SELECT * FROM categories WHERE name=$1;', [name]
        );
        if (nameAlreadyResgistered.rows.length) return res.sendStatus(409);

        const insert = await connection.query(
            'INSERT INTO categories (name) VALUES ($1);', [name]
        );
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }

};

export {listOfCategories, insertIntoCategories};