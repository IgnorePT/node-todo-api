var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//Save todos
app.post('/todos', (req, res) => {
    console.log();

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

//GET /Todos

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

//GET /todos/123456
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    //validate ID (ObjectID);
        // 404 - Not Found Empty Body
    if(!ObjectID.isValid(id)){
        console.log('Todo id is not valid');
        return  res.status(404).send();
    }
    
    //findByID
        //Success
            //If todo - send it back
            //If no todo - send back 404 - empty body

        Todo.findById(id).then((todo) => {
            if(!todo){
                console.log('Todo not found');
                return  res.status(404).send();
            }
            res.send(todo);
        }), (err) => {
            console.log('Unable to fetch todos');            
            res.status(404).send();
        }
        //Error
            //400 - Sendo Nothing


});

app.listen(3000, () => {
    console.log('Started on Port 3000');
});

module.exports = {app};
