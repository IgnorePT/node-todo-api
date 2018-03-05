//Todo
var mongoose = require('mongoose');


var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }, 
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};


// var myTodo = new Todo({
//     text: "Workout"
// });

// myTodo.save().then((doc) => {
//     console.log(' Save Successful: \n', doc);
// },(err) => {
//     console.log('Unable to save Todo', err);
// });