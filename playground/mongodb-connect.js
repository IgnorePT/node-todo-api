// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

// var user = {name:'Nelson', age:25};
// var {name} = user;
// console.log(name);

var url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
    if (err){
        console.log('Unable to connect to MongoDb server');
        console.log(err);
        return 
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     competed: false
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // Insert new Doc into USERS (name, age, location)

    // db.collection('Users').insertOne({
    //     name: 'Nelson',
    //     age: 29,
    //     location: 'Porto'
    // }, (err, result) => {
    //     if (err){
    //         return console.log('Unable to insert user', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     console.log(result.ops[0]._id.getTimestamp());
        
    // })

     db.close();
});
