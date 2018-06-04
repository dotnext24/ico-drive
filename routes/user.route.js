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
        Person.find({username: uname},function (err, user) {
        if (err) return next(err);
        res.json(user);
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

