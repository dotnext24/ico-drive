var mongoose = require('mongoose');
var passport = require('passport');
var smtpConfig = require('../config/smtp');
var express = require('express');
var router = express.Router();
var User = require("./../models/User");
var nodemailer = require("nodemailer");
var mailService = require("./../services/mail.service");


router.get('/mailtest', function (req, res, next) {
    res.send('mailtest RESTful API');
});


router.post('/activation-email', function (req, res) {

    if (req.body.to && req.body.link && req.body.name) {

        const uuidv4 = require('uuid/v4');
        const activation_token = uuidv4();
        User.findOneAndUpdate({ username: req.body.to }, { activation_token_expiry: activation_token, activation_token_expiry: new Date(new Date().setMinutes(new Date().getMinutes() + 30)) }, null, function (err, user) {
            if (!err) {
                console.log('user', user);
                var name=user.firstname+' '+user.lastname;
                //var port=(req.socket.localPort)?':'+req.socket.localPort:'';
                var port='';
                var link=req.protocol+'://'+req.host+''+port+'/account/activate/'+req.body.to+'/'+user.activation_token;
                var result = mailService.sendAccountActivationEmail(req.body.to,link,name);
                result.then(response => {
                    console.log('res', response);
                    return res.json({ success: true, msg: 'Successful sent activation email.' });

                }).catch(err => {
                    console.log("error router.post('/activation-email'",err);
                    return res.json({ success: false, msg: 'Email failed.', err: error });
                })
            }


        });



    } else {
        return res.status(400).send({ success: false, msg: 'Bad request.' });
    }
});

module.exports = router;

