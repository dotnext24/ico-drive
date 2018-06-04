var smtpConfig = require('./../config/smtp');
var siteConfig = require('./../config/site');
var nodemailer = require("nodemailer");
var fs = require('fs');



function foo(info) {
    return { success: true, msg: 'Email failed.', info: info };
}

function sendEmail(mailOptions) {

    var smtpTransport = nodemailer.createTransport({
        service: smtpConfig.service,
        host: smtpConfig.host,
        port: smtpConfig.port,
        auth: {
            user: smtpConfig.auth.user,
            pass: smtpConfig.auth.pass
        },
        tls: { rejectUnauthorized: false },
        debug: true
    });

    return smtpTransport.sendMail(mailOptions);
}


function sendAccountActivationEmail(to, link, name) {

    //     var htmlstream = fs.createReadStream('email-templates/account-activation.html');

    //    var content=fs.readFileSync('email-templates/account-activation.html',{encoding: 'utf-8'});
    //    htmlstream=content.replace('<%= token %>','google.com');

    var content = '<h2>Hello, ' + name + '</h2><br /> <h3>Welcome to ' + siteConfig.name + '</h3> <br/> Please click on below link to activate you account. <br /> <a href="' + link + '">Account Activation link.</a>'

    var mailOptions = {
        to: to,
        subject: siteConfig.name + '- Account Activation',

        html: content
    };

    return sendEmail(mailOptions);
}



function sendResetPasswordEmail(to, link, name) {

    //     var htmlstream = fs.createReadStream('email-templates/account-activation.html');

    //    var content=fs.readFileSync('email-templates/account-activation.html',{encoding: 'utf-8'});
    //    htmlstream=content.replace('<%= token %>','google.com');

    var content = '<h2>Hello, ' + name + '</h2><br /> <h3>Welcome to ' + siteConfig.name + '</h3> <br/> Please click on below link to reset your account password. <br /> <a href="' + link + '">Password reset link.</a>'

    var mailOptions = {
        to: to,
        subject: siteConfig.name + '- Reset Password',

        html: content
    };

    return sendEmail(mailOptions);
}




exports.foo = foo;
exports.sendEmail = sendEmail;
exports.sendAccountActivationEmail = sendAccountActivationEmail;
exports.sendResetPasswordEmail = sendResetPasswordEmail;