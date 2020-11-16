const mysql = require("mysql");

//setting up mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.port || 3306,
    user: "root",
    password: "rootroot",
    database: "seed_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.query("SELECT * FROM department", function (err, result, fields) {
        if (err) throw err;
    })
});

module.exports = connection 