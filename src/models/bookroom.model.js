var mongoose = require('mongoose');

var bookRoomSchema = new mongoose.Schema({
    book_id:{
        type: String,
        require: true,
        default: 'BR' + Date.now() 
    },
    room_code: {
        type: String,
        require: true
    },
    room_type: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        enum: ['avaliable', 'unavaliable', 'reserved'],
        default: 'avaliable'
    },
    adult:{
        type: Number,
        require: true
    },
    children:{
        type: Number,
        require: true
    },
    checkin:{
        type: Date,
        require: true
    },
    checkout:{
        type: Date,
        require: true
    },
    fullname:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    },
    note:{
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
});

module.exports = mongoose.model('_bookroom', bookRoomSchema, 'bookroom');