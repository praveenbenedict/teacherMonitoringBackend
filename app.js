//Leander Paul

const nodemailer = require('nodemailer');
const express = require('express');

var app = express();


var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true,//this parameter solved problem for me
    auth: {
        user: 'jbapraveen@hotmail.com',
        pass: 'phoenicorn123'
    }
});


app.get('/', function(req, res){
    res.send("Poda");
});

app.get('/sendMail', function(req, res) {

    var toMail = req.query.mail;
    var eventName = req.query.eventName;
    var lastDate = req.query.lastDate;
    console.log(toMail);
    console.log(eventName);
    console.log(lastDate);

    let mailOptions = {
        from: '"HOD IT Department Student Affairs" <jbapraveen@hotmail.com>', // sender address
        to: toMail, // list of receivers
        subject: "Registration for " + eventName, // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));    
    });

});

app.listen(8080, function() {
    console.log("Server STarted");
});




