const express = require("express")
const bodyParser = require("body-parser");

const { generateComments } = require("./generate-comments");
const { generateUser } = require("./generate-user");

const app = express()

var jsonParser = bodyParser.json()



const currentUsers = generateUser(0)
let users = new Array(24).fill('')
    .map((_, id) => id+1)
    .reduce((acc, id) => 
        ({...acc, [id]: generateUser(id)}),
        {
            0: currentUsers,
        }
    );
let comments = generateComments().sort((a,b) => a.date.getTime() > b.date.getTime() ? -1 : 1);


app.get('/user', (req, res) => res.send(currentUsers));

app.get('/user/:id', ({params}, res) => {
    const { id } = params;
    if(users[id]){
        return res.send(users[id])
    }

    users = {...users, [id]: generateUser(id) }
    return res.send(users[id])
});
app.get('/like/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];    
    if(!users[id]){
        res.statusCode(404);
        res.send();
    }
    const newUser = {...user, liked: !user.liked};
    users = {...users, [id]: newUser };
    res.send(newUser);
});
app.get('/comments/:id', (req, res) => {
    const offset = (+req.query.offset);
    if(req.query.hasOwnProperty('offset')) {
        return res.send({
            total: comments.length,
            data: comments.slice(offset, offset+100)
        });
    }
    return res.send({
        total: comments.length,
        data: comments
    }); 
});
app.post('/comments/add',jsonParser, (req,res) => {
    const {text} = req.body;
    if(!text) {
        return res.sendStatus(400)
    }
    const newComment = {
        id: currentUsers.id,
        author: {
            ...currentUsers
        },
        date: new Date(),
        text
    }
    comments = [...comments, newComment];
    return res.send(newComment);
})


app.listen(8081, () => console.log('Mock data provider start listening on port 8081'))
