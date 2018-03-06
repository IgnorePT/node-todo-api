const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = "5a9e6e1915ede547f03d83ac11";

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo By ID', todo);
// }).catch((e) => console.log(e));

//Query Users Collection
//Load User Model
//User User.findByID
//Handle the cases:
//  Query works
//  User not found
//  Handle any errors

var userID = "5a9d6e81a704b74694304df2";

User.findById(userID).then((user) => {
    if (!user){
        return console.log('User not found');
    }
    console.log('User: \n', user);
}).catch((e) => console.log('Unable to fetch user data. \n',e));

