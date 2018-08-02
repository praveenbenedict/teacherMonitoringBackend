//Leander Paul

const nodemailer = require('nodemailer');
const express = require('express');
const cron = require('node-cron');
// var $ = require('jQuery');
var app = express();
var port = process.env.PORT || 8080;

// var admin = require('firebase-admin');
var firebase = require('firebase');
var serviceAccount = require('./config/serviceAccountKey.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://teacher-monitoring-syste-2a943.firebaseio.com'
// });

var config = {
    apiKey: "AIzaSyCd52jgPUaWnYQ52g4EOHFgAk5F-_gajBg",
    authDomain: "teacher-monitoring-syste-2a943.firebaseapp.com",
    databaseURL: "https://teacher-monitoring-syste-2a943.firebaseio.com",
    projectId: "teacher-monitoring-syste-2a943",
    storageBucket: "teacher-monitoring-syste-2a943.appspot.com",
    messagingSenderId: "397902686650"
};
firebase.initializeApp(config);

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

cron.schedule('0 24 13 * * *', function() {
    console.log('Poda');
    var database = firebase.database();
    database.ref('/currentlyAssigned/').once('value', function(data) {
        data = data.val();
        console.log('Poda');
        console.log(data);
        for(key in data) {
            var lastDate = new Date(data[key].lastDate);
            var currentDate = new Date();
            var timeDifference = Math.abs(lastDate.getTime() - currentDate.getTime());
            var dateDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            console.log(dateDifference);
            if(dateDifference === 2) {
                console.log(data[key].eventName);
                console.log(key);
                var subject = 'Sumbit final report';
                var bodyText = `Submition: \n Event Name: ${data[key].eventName} 
                    \n Last Date: ${data[key].lastDate}\n
                    Make sure you submit the event details to me by tomorrow`; 
                var bodyHtml = `<h2>Submition: </h2><br/>
                    <h4> Event Name: ${data[key].eventName} </h4> 
                    <h4> Last Date: ${data[key].lastDate} </h4>
                    <h4><b>Make sure you submit the event details to me by tomorrow</b></h4>`; 
                sendMail(data[key].eventName,data[key].lastDate, data[key].mailId, bodyText, bodyHtml);
            }
        }
    });
});

app.get('/', function(req, res){
    res.send("Poda");
});

app.get('/sendMail', function(req, res) {
    var toMail = req.query.mail;
    var eventName = req.query.eventName;
    var lastDate = req.query.lastDate;
    console.log('Request Accepted');

    var mailText = `Registration: \n Event Name: ${eventName} 
                        \n Last Date: ${lastDate}\n
                        Make sure you collect the event details from me by tomorrow`; 
    var mailHtml = `<h2>Registration: </h2><br/>
                    <h4> Event Name: ${eventName} </h4> 
                    <h4> Last Date: ${lastDate} </h4>
                    <h4><b>Make sure you collect the event details from me by tomorrow</b></h4>`; 

    sendMail(eventName, lastDate, toMail, mailText, mailHtml);

});

function sendMail(eventName, lastDate, toMail,bodyText, bodyHtml ) {
    console.log('Sending mail');
    let mailOptions = {
        from: '"HOD IT Department Student Affairs" <jbapraveen@hotmail.com>', // sender address
        to: toMail, // list of receivers
        subject: "Registration for " + eventName, // Subject line
        text: bodyText, // plain text body
        html: bodyHtml // html body
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));    
    });
}

app.listen(port, function() {
    console.log("Server Started");
});