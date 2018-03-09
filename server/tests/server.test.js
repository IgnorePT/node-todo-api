const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [
    {
        _id: new ObjectID(),
        text: "First to do"
    }, 
    {
        _id: new ObjectID(),        
        text: "Second to do"
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos, (error, docs) => {
            if(error){
                return done(error);
            }
        });
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test to do text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });

    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
    });
});


describe('GET /todos', () => {

    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
    
});


describe('GET /todos:id', () => {
    it('Should return todo doc ', (done) => {
        var id = todos[0]._id.toHexString();
        request(app)
            .get(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        var id = new ObjectID;
        //Get 404 back
        request(app)
            .get(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-Objects Ids', (done) => {
        var id = 12345;
        //Get 404
        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

  
});


describe('DELTE /todos/:id', () => {
    it('Should remove a todo', (done) => {
        var id = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                //Query DB findById
                Todo.findById(id).then((todo) => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch((err) => done(err));
            })
    });

    it('should return 404 if id not found', (done) => {
        var id = new ObjectID;
        //Get 404 back
        request(app)
            .delete(`/todos/${id.toHexString()}`)
            .expect(404)
            .end(done);

     });

     it('should return 404 if object id is invelid', (done) => {
        var id = 12345;
        //Get 404
        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);

     });

})