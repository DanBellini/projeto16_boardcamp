import connection from '../database/db.js';
import gameSchema from '../schemas/games.schema.js';

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
                '$1%';
            `,[name]
        );
        res.send(findGame.rows);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function insertIntoGame (req,res){
    const {
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay
    } = req.body

    const validationSchema = gameSchema.validate(req.body);

    if(validationSchema.error) return res.sendStatus(400);

    try {
        const validationCategory = await connection.query(`
            SELECT * FROM categories WHERE id=$1;
        `, [categoryId]);
        if(!validationCategory.rows.length) return res.sendStatus(400);

        const duplicateName = await connection.query(`
            SELECT * FROM games WHERE name=$1;
        `, [name]);
        if(duplicateName.rows.length) return res.sendStatus(409);

        await connection.query(`
            INSERT INTO games (
                name,
                image,
                "stockTotal",
                "categoryId",
                "pricePerDay"
            ) VALUES ($1,$2,$3,$4,$5);
        `, [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201)
    } catch (error) {
        res.sendStatus(500)
    }
};

export {findGame, insertIntoGame};