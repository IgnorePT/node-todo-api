//User Model
var mongoose = require('mongoose');


var User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {User};

// var newUser = new User({
//     email: 'n3ls6n@gmail.com'
// });

// newUser.save().then((doc) => {
//     console.log('User Created! \n');
//     console.log(JSON.stringify(doc, undefined,2));
// }, (err) => {
//     console.log('Unable to create user \n', err);
// });