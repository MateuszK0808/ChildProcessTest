const express = require('express');
const app = express();
const con = require('./controller');

app.get("/", (req, res) => {
    console.log("get /")
    res.json("OoOoOoOoOoOoOoOo")
});

app.get("/k", (req, res) => {
    console.log("/k");
    con.shortCalculation().then(m => res.json(m));
});

app.get("/d", (req, res) => {
    console.log("/d");
    con.longCalculation().then(m => res.json(m));
});




app.listen(3000, () => console.log("server listening on port ", 3000))