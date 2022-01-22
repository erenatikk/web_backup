var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	LocalStrategy = require("passport-local");
	passportLocalMongoose =
		require("passport-local-mongoose");
        let User = require('../../models/user');



mongoose.connect("mongodb+srv://eren_atik:zilean62@cluster0.u8mtu.mongodb.net/proje");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("express-session")({
	secret: "Rusty is a dog",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
	res.render("register");
});

// Showing secret page
app.get("/shop", isLoggedIn, function (req, res) {
	res.render("shop");
});

// Showing register form
app.get("/register", function (req, res) {
	res.render("register");
});

// Handling user signup
app.post("/register", function (req, res) {
	var email = req.body.email
	var password = req.body.password
	User.register(new User({ email: email }),
			password, function (err, user) {
		if (err) {
			console.log(err);
			return res.render("register");
		}

		passport.authenticate("local")(
			req, res, function () {
			res.render("shop");
		});
	});
});

//Showing login form
app.get("/Login", function (req, res) {
	res.render("Login");
});

//Handling user login
app.post("/Login", passport.authenticate("local", {
	successRedirect: "/shop",
	failureRedirect: "/Login"
}), function (req, res) {
});

//Handling user logout
app.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect("/Login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Server Has Started!");
});
