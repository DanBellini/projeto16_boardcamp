import connection from "../database/db.js";
import dayjs from "dayjs";

async function listRentals (req,res){
    const {customersId, gameId} = req.query;

    try {
        if(customersId){
            const listRentals = connection.query(`
                SELECT
                    rentals.*,
                    customers.id
                        AS
                       "customersId",
                    customers.name
                        AS
                        "customersName",
                    games.id
                        AS
                        "gameId",
                    games.name
                        AS
                        "gameName",
                    games."categoryId",
                    categories.name
                        AS
                        "categoryName"
                FROM rentals
                JOIN customers
                    ON rentals."customerId" = customers.id
                JOIN games
                    ON rentals."gameId" = games.id
                JOIN categories
                    ON games."categoryId" = categories.id
                    WHERE
                    rentals."customersId" = $1;
            `, [customersId]);
            res.send(listRentals.rows);
        }
        if(gameId){
            const listRentals = connection.query(`
                SELECT
                    rentals.*,
                    customers.id
                        AS
                        "customersId",
                    customers.name
                        AS
                        "customersName",
                    games.id
                        AS
                        "gameId",
                    games.name
                        AS
                        "gameName",
                    games."categoryId",
                    categories.name
                        AS
                        "categoryName"
                FROM rentals
                JOIN customers
                    ON rentals."customerId" = customers.id
                JOIN games
                    ON rentals."gameId" = games.id
                JOIN categories
                    ON games."categoryId" = categories.id
                    WHERE
                    rentals."gameId" = $1;
            `, [gameId]);
            res.send(listRentals.rows);
        };
        const listRentals = connection.query(`
            SELECT
                rentals.*,
                customers.id
                    AS
                   "customersId",
                customers.name
                    AS
                    "customersName",
                games.id
                    AS
                    "gameId",
                games.name
                    AS
                    "gameName",
                games."categoryId",
                categories.name
                    AS
                    "categoryName"
            FROM rentals
            JOIN customers
                ON rentals."customerId" = customers.id
            JOIN games
                ON rentals."gameId" = games.id
            JOIN categories
                ON games."categoryId" = categories.id;
            `);
        res.send(listRentals.rows);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function insertIntoRentals (req,res){
    const {customersId, gameId, daysRented} = req.body;

    try {
        const idCustomers = await connection.query(`
            SELECT * FROM customers WHERE id = $1;
        `,[customersId]);

        const idGame = await connection.query(`
            SELECT * FROM customers WHERE id = $1;
        `, [gameId]);

        const rentDate = dayjs().format(YYYY-MM-DD)
        
        if(!idCustomers.rows.length || !idGame.rows.length || daysRented<=0) return res.sendStatus(400); 

        const returnDate = null;

        const pricePerDayGame = idGame.rows[0].pricePerDay * daysRented;

        const delayfee = null;

        await connection.query(`
            INSERT INTO rentals (
                "customersId",
                "gameId",
                "rentDate",
                "daysRented",
                "returnDate",
                "originalPrice",
                "delayFee")
            VALUES ($1,$2,$3,$4,$5,$6,$7);
        `,[customersId, gameId, rentDate, daysRented, returnDate, pricePerDayGame, delayfee]);

        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
};

async function finishRentals (req,res){

};

async function deleteRentals (req,res){

};

export {listRentals, insertIntoRentals, finishRentals, deleteRentals};