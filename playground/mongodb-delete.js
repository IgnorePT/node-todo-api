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

    // deleteMany
    // db.collection('Todos').deleteMany({text:'Eat Launch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Go out 2'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({competed:false}).then((result) => {
    //     console.log(result);
    // });


    db.collection('Users').deleteMany({name:'Nelson'}).then((result) => {
        console.log(`You remove ${result.CommandResult.result.n}  elements from this collection \n`);
    });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5a9d0ed1585ef439582b909b')}).then((result)=> {
        console.log(result);

    })

     //db.close();
});
