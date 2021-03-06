var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    country: {
        type: String,
        required: true
    },
    active:{
        type: Boolean, default: false
    },
    activation_token:{
      type:String
    },
    activation_token_expiry:{
        type:Date
    },
    password_reset_token:{
        type:String
    },
    password_reset_token_expiry:{
        type:Date
    }
},
{
    timestamps: true
});

UserSchema.pre('save', function (next) {
    var user = this;
    // var currentDate = new Date();
    // this.user.updated_at = currentDate;
    // if (!this.user.created_at)
    //     this.user.created_at = currentDate;

    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);