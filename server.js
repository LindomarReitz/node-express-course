const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://mongodb:27017/test", { useNewUrlParser: true });

const userSchema = require("./models/user.js");

const User = mongoose.model("User", userSchema);

const mark = new User({ name: "mark" });
mark.save();

const jill = new User({ name: "jill" });
jill.save();

app.use(bodyParser.json());

app.get("/users", function (req, res) {
    User.find({}, function (err, users) {
        var userData = [];

        users.forEach(function (user) {
            userData.push(user.name);
        });

        res.json({
            success: true,
            message: 'successfully got users. Nice!',
            users: userData
        });
    });
});

app.get("/users/:id", function (req, res) {
    User.find({ name: req.params.id }, function(err, users) {
        var userData = [];

        users.forEach(function (user) {
            userData.push(user.name);
        });

        res.json({
            success: true,
            message: 'got one user',
            user: userData
        });
    });
});

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const mockUsername = "billyTheKid";
    const mockPassword = "superSecret";

    if (username === mockUsername && password === mockPassword) {
        res.json({
            success: true,
            message: 'password and username match!',
            token: 'encrypted token goes here'
        });
    } else {
        res.json({
            success: false,
            message: 'password and username do not match'
        });
    }

});

app.listen(8000, function () {
    console.log("server is running");
});

module.exports = app;