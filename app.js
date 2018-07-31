//Leander Paul

const nodemailer = require('nodemailer');
const express = require('express');

var app = express();
var port = process.env.PORT || 8080;

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


    var mailText = `Registration: \n Event Name: ${eventName} 
                        \n Last Date: ${lastDate}\n
                        Make sure you collect the event details from me by tomorrow`; 
    var mailHtml = `<h2>Registration: </h2><br/>
                    <h4> Event Name: ${eventName} </h4> 
                    <h4> Last Date: ${lastDate} </h4>
                    <h4><b>Make sure you collect the event details from me by tomorrow</b></h4>`; 

    let mailOptions = {
        from: '"HOD IT Department Student Affairs" <jbapraveen@hotmail.com>', // sender address
        to: toMail, // list of receivers
        subject: "Registration for " + eventName, // Subject line
        text: mailText, // plain text body
        html: mailHtml // html body
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

app.listen(port, function() {
    console.log("Server STarted");
});




