const express = require("express")
const { generateComments } = require("./generate-comments");
const { generateUser } = require("./generate-user");


const app = express()

app.get('/user', (req, res) => res.send(generateUser()));
app.get('/comments', (req, res) => res.send(generateComments()));

app.listen(8081, () => console.log('Mock data provider start listening on port 8081'))
