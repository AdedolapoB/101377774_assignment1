const mongoose = require('mongoose');

const empSchema = mongoose.Schema({
    first_name: { type: String, required: true, maxlength: 100 },
    last_name: { type: String, required: true, maxlength: 50 },
    email: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message: 'Invalid email format'
        }, maxlength: 50
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], 
        required: true, 
        maxlength: 25
    },
    salary: { 
        type: Number, 
        required: true 
    }
})

const emp = mongoose.model('emp', empSchema);
module.exports = emp;