// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


var url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
    if (err){
        console.log('Unable to connect to MongoDb server');
        console.log(err);
        return 
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5a9d0c011f35ae23bc225e25')
    // }).toArray().then((docs)=>{

    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined,2));

    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count)=>{

    //     console.log(`Todos count: ${count}`);

    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name:'Nelson'}).count().then((count)=>{

        console.log(`Todos count: ${count}`);

    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Users').find({name:'Nelson'}).toArray().then((docs)=>{

        console.log(`Users:`);
        console.log(JSON.stringify(docs,undefined,2));

    }, (err) => {
        console.log('Unable to fetch todos', err);
    });


     //db.close();
});
