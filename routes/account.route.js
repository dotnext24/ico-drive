var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("./../models/User");
var Book = require("./../models/Book");

/* GET home page. */
router.get('/accounttest', function (req, res, next) {
  res.send('accounttest RESTful API');
});


router.post('/signup', function (req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({ success: false, msg: 'Please pass username and password.' });
  } else {

    const uuidv4 = require('uuid/v4');
    const activation_token = uuidv4();
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      country: req.body.country,
      activation_token: activation_token,
      activation_token_expiry: new Date(new Date().setMinutes(new Date().getMinutes() + 30))

    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.', error: err });
      }
      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
});


router.post('/activate-account', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
     
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      console.log(user);
      if(!user.active)
      {
      if (user.activation_token == req.body.token) {
        if (new Date() < user.activation_token_expiry) {
          user.active = true;
          user.save(function (err, updatedTank) {
            console.log('updatedTank ',updatedTank);
          })
          res.status(200).send({ success: true, msg: 'You account is activated successfully. You can log into your account' });
        }
        else {
          res.status(200).send({ success: false, msg: 'Account activation link has been expired.' });
        }
      }
      else {
        res.status(200).send({ success: false, msg: 'Account activation link is incorrect' });
      }
    }
      else
      {
        res.status(200).send({ success: true, msg: 'Your account is acready activated. You can log into your account' });
      }
    }
  });
});


//reset password

router.post('/reset-password', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
     
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      console.log(user);
      if(!user.active)
      {
      if (user.password_reset_token == req.body.token) {
        if (new Date() < user.password_reset_token_expiry) {
          
          user.password=req.body.password;

          user.save(function (err, updatedUser) {
            console.log('updatedTank ',updatedUser);
          })
          res.status(200).send({ success: true, msg: 'Your account password has reset successfully. You can log into your account' });
        }
        else {
          res.status(200).send({ success: false, msg: 'Password reset link has been expired.' });
        }
      }
      else {
        res.status(200).send({ success: false, msg: 'Password reset link is incorrect' });
      }
    }
      else
      {
        res.status(200).send({ success: true, msg: 'Your account is acready activated. You can log into your account' });
      }
    }
  });
});


router.post('/signin', function (req, res) {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      if(user.active)
      {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
      
    }
    else
    {
      res.json({ success: false, msg: 'Please activate your account. Activation email has been sent to '+user.username });
    }

    }
  });
});

//helpers
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;