import connection from "../database/db.js";

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
            res.send(listRentals.rows)
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

};

async function finishRentals (req,res){

};

async function deleteRentals (req,res){

};

export {listRentals, insertIntoRentals, finishRentals, deleteRentals};