const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    email : {
        type : String ,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    confirm_password: {
       type : String,
        require: true
          }
})

const userData = mongoose.model('User', userSchema);
module.exports = userData;