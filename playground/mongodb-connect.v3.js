const MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/TodoApp";

MongoClient.connect(url, (err, client) => {
    if (err){
        console.log('Unable to connect to MongoDb server');
        console.log(err);
        return 
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        competed: false
    }, (err, result) => {
        if (err){
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    })

    client.close();
});
