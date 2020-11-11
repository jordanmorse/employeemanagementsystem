const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    port: process.env.port || 3306,
    user: "root",
    password: "rootroot",
    database: "seed"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();})