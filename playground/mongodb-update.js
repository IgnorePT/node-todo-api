// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, (err, db) => {
    if (err){
        console.log('Unable to connect to MongoDb server');
        console.log(err);
        return 
    }
    console.log('Connected to MongoDB server');

    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a9d4d150c1fa909b0bb2ebb')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // },{
    // returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a9d0dc18e40183a7ceca8f7')
    }, {
        $set: {
            name: 'Nelson',
        }, 
        $inc:{
            age: 1
        }
    },{
    returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

     //db.close();
});
