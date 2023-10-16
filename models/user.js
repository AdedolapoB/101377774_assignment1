const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, maxlength: 100 },
    email: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: 'Invalid email format'
        },
        maxlength: 50
    },
    password: { type: String, required: true, maxlength: 50}
})

const user = mongoose.model('user', userSchema);
module.exports = user;
