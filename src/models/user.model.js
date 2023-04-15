var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['CLIENT_ROLE', 'ADMIN_ROLE'],
        default: 'CLIENT_ROLE'
    },
    email: {
        type: String,
        require: false,
        unique: true
    },
    email_verify: {
        type: Boolean,
        require: false
    },
    phone: {
        type: String,
        require: false
    },
    gender: {
        type: String,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    birthday: {
        type: String,
        require: false
    },
    id_card: {
        type: String,
        require: false
    },
    avatar: {
        type: String,
        require: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

userSchema.methods.comparePassword = function (password) {
    return password === this.password;
};

module.exports = mongoose.model('_user', userSchema, 'user');