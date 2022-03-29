const Pool = require("pg").Pool;

const pool = new Pool({
    user:"postgres",
    password:"abode123",
    database: "teesas",
    host: "localhost",
    port: 5432
}

)


module.exports = pool;