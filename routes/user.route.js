var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
var express = require('express');
var router = express.Router();
var User = require("./../models/User");

router.get('/usertest', function(req, res, next) {
  res.send('usertest RESTful API');
});

router.get('/user/:username', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);   
    if (token) {
        var uname=req.params.username;
        //res.json(req.params.username)
        User.findOne({$or: [
          {email: uname},
          {username: uname}
      ]},'email username firstname lastname country createdAt',function (err, user) {
        if (err) return next(err);
        res.json(user);
      });
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  });

  //update profile
  router.post('/update-profile', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);   
    if (token) {
        var uname=req.body.username;
        var email=req.body.email;
        var firstname=req.body.firstname;
        var lastname=req.body.lastname;
        var country=req.body.country;

        console.log(uname,email,firstname,lastname);

      User.findOneAndUpdate({$or: [
        {email: req.body.username},
        {username: req.body.username}
    ]}, { active:false, email: email, firstname:firstname,lastname:lastname, country:country }, null, function (err, user) {
        if (!err) {
            console.log('user', user);
            return res.json({ success: true, msg: 'Successful updated profile details' });
        }
        else
        {
          return res.json({ success: false, msg: err });
        }


    });









    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
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

