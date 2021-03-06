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
        User.findOneAndUpdate({$or: [
            {email: req.body.to},
            {username: req.body.to}
        ]}, { activation_token: activation_token, activation_token_expiry: new Date(new Date().setMinutes(new Date().getMinutes() + 30)) }, null, function (err, user) {
            if (!err) {
                console.log('user', user);
                var name=user.firstname+' '+user.lastname;
                //var port=(req.socket.localPort)?':'+req.socket.localPort:'';
                var port='';
                var link=req.protocol+'://'+req.host+''+port+'/account/activate/'+req.body.to+'/'+activation_token;
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


router.post('/reset-password-email', function (req, res) {

    if (req.body.to) {

        const uuidv4 = require('uuid/v4');
        const password_reset_token = uuidv4();
        User.findOneAndUpdate({$or: [
            {email: req.body.to},
            {username: req.body.to}
        ]}, { password_reset_token: password_reset_token, password_reset_token_expiry: new Date(new Date().setMinutes(new Date().getMinutes() + 30)) }, null, function (err, user) {
            if (!err && user) {
               
                var name=user.firstname+' '+user.lastname;
                //var port=(req.socket.localPort)?':'+req.socket.localPort:'';
                var port='';
                
                var link=req.protocol+'://'+req.host+''+port+'/account/reset-password/'+req.body.to+'/'+password_reset_token;
                
                var result = mailService.sendResetPasswordEmail(req.body.to,link,name);
                result.then(response => {
                    console.log('res', response);
                    return res.json({ success: true, msg: 'Password reset link has been to '+req.body.to+'. Please check your inbox.' });

                }).catch(err => {
                    console.log("error router.post('/reset-password-email'",err);
                    return res.json({ success: false, msg: 'Email failed.', err: error });
                })
            }
            else {
                return res.status(404).send({ success: false, msg: 'Email address not found.' });
            }

        });



    } else {
        return res.status(400).send({ success: false, msg: 'Bad request.' });
    }
});


router.post('/profile-update-confirmation-email', function (req, res) {

    if (req.body.to && req.body.link && req.body.name) {

        const uuidv4 = require('uuid/v4');
        const activation_token = uuidv4();
        User.findOneAndUpdate({$or: [
            {email: req.body.to},
            {username: req.body.to}
        ]}, { active:false, activation_token: activation_token, activation_token_expiry: new Date(new Date().setMinutes(new Date().getMinutes() + 30)) }, null, function (err, user) {
            if (!err) {
                console.log('user', user);
                var name=user.firstname+' '+user.lastname;

                var port='';
                var link=req.protocol+'://'+req.host+''+port+'/account/confirm-profile-update/'+user.username+'/'+activation_token;
                var result = mailService.sendAccountUpdateConfirmationEmail(req.body.to,link,name);
                result.then(response => {
                    console.log('res', response);
                    return res.json({ success: true, msg: 'Successful sent profile update confirmation email' });
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

