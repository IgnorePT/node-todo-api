const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

//Save Todos
app.post('/todos', (req, res) => {

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
    
    if(!ObjectID.isValid(id)){
        return  res.status(404).send();
    }

        Todo.findById(id).then((todo) => {
            if(!todo){
               
                return  res.status(404).send();
            }
            res.send({todo});
        }), (err) => {
            console.log('Unable to fetch todos');            
            res.status(404).send();
        }

});


//DELETE /Todos

app.delete('/todos/:id', (req, res) =>{
    //Get the ID
    var id = req.params.id;

    //Validate ID - 404
    if(!ObjectID.isValid(id)){
   
        return  res.status(404).send();
    }

     Todo.findByIdAndRemove(id).then((todo) => {

        if(!todo){
            return  res.status(404).send();             
         }
            res.send({todo});

     }).catch((err) => {

        return  res.status(404).send();             
        
     });    
});

//UPDATE /Todos
    app.patch('/todos/:id', (req, res) => {
        var id = req.params.id;
        var body = _.pick(req.body,['text', 'completed']);

        if(!ObjectID.isValid(id)){
   
            return  res.status(404).send();
        }

        if(_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
            if(!todo){
                return res.status(404).send();
            }

            res.send({todo});

        }).catch((err) => {
            res.status(404).send();
        });

    });


app.listen(port, () => {
    console.log('Started on Port 3000');
});

module.exports = {app};
