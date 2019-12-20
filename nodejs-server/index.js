const express = require('express')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
app.use(cors());
app.use(bodyParser.json())

var arr = []
app.post('/logindata', function (req, res) {
    console.log(req.body);
    mongoClient.connect(url, function (err, client) {
        if (err) throw err;

        var db = client.db('secretSanta');
        var validEmail = {
            userEmail: req.body.email
        }
        var password = {
            userPassword: req.body.password
        }
        var result = db.collection('users').findOne(validEmail);
        // if(err) throw err;

        result.then(function (userdata) {
            //console.log(password.userPassword)
            if (userdata == null) {
                res.status(200).send("invalid email")
            };
            if (userdata.userPassword == password.userPassword) {
                console.log("user can come");
                res.status(200).send("valid user");
            } else {
                res.status(200).send("invalid user")
            }

            // result.catch(function () {
            //     console.log("catch")
            // })
            //  });




        })
        client.close();
    })

})
app.post('/registerdata', function (req, res) {
    //console.log(mongoclient);
    mongoClient.connect(url, function (err, client) {
        if (err) throw err;

        var db = client.db('secretSanta');
        var registerData = {
            userName: req.body.name,
            userEmail: req.body.email,
            userPassword: req.body.password,
            userNumber: req.body.number,
            role: "player",
            child: "",
            parent: "",
            assignedTask: [{
                taskName: "",
                taskMessage: "",
                status: ""
            }],
            taskassigned: [{
                taskName: "",
                taskMessage: "",
                status: ""
            }]
        }
        // console.log(loginData)
        db.collection('users').insertOne(registerData, function (err, res) {
            if (err) throw err;
            console.log("1 doc inserted");
            client.close();
        })

    })
})
app.get('/playername', function (req, res) {
    //console.log(arr);
    mongoClient.connect(url, function (err, client) {
        if (err) throw err

        var db = client.db('secretSanta')
        var result = db.collection('users').find({}, {
            projection: {
                _id: 0,
                userName: 1
            }
        }).toArray();
        result.then(function (userdata) {
            // console.log(userdata);
            res.send(userdata);
        })
    })
    //res.status(200).json(arr)
})

app.listen(3000);