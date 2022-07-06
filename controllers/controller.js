import bcrypt from "bcrypt";
import User from '../models/UserModel.js';
import Post from '../models/PostModel.js';
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import fs from 'fs';

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

//this is what is used when we login 
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Username does not exist.' });

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) return done(err);
            if (res === false) return done(null, false, { message: 'Password is incorrect.' })

            return done(null, user);
        });
    });
}));

const controller = {

    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    },

    isLoggedOut(req, res, next) {
        if (!req.isAuthenticated()) return next();
        res.redirect('/');
    },

    getSchoolPage: function (req, res) {
        var dlsu = false;
        var admu = false;
        var ust = false;
        var up = false;
        if (req.user.school == "DE LA SALLE UNIVERSITY, MANILA") {
            dlsu = true;
        } else if (req.user.school == "ATENEO DE MANILA UNIVERSITY") {
            admu = true;
        } else if (req.user.school == "UNIVERSITY OF SANTO THOMAS") {
            ust = true;
        } else if (req.user.school == "UNIVERSITY OF THE PHILIPPINES") {
            up = true;
        }
        Post.find({ school: req.user.school }, function (err, posts) {
            if (err) {
                console.log(err);
            }
            for (let x = 0; x < posts.length; x++) {
                if (posts[x].username == req.user.username) {
                    posts[x].isLoggedIn = true;
                } else {
                    posts[x].isLoggedIn = false;
                }
            }
            res.render("SchoolPage", { title: "School Page", list: posts, school: req.user.school, dlsu, admu, ust, up , profilePic: req.user.profilePic});        }).lean();
    },

    getUserPage: function (req, res) {
        Post.find({ school: req.user.school, username: req.user.username }, function (err, posts) {
            if (err) {
                console.log(err);
            }
            for (let x = 0; x < posts.length; x++) {
                if (posts[x].username == req.user.username) {
                    posts[x].isLoggedIn = true;
                } else {
                    posts[x].isLoggedIn = false;
                }
            }

            res.render("UserPage", {title: "Profile", list: posts, school: req.user.school, name: req.user.name, username: req.user.username, bio: req.user.bio, profilePic: req.user.profilePic});
        }).lean();

    },

    getSearch: function (req, res) {
        var keyword = req.query.keyword;
        if (keyword.charAt(0) == '@') {
            var searchedUsername = keyword.substring(1);
            Post.find({ school: req.user.school, username: searchedUsername }, function (err, posts) {
                if (err) {
                    console.log(err);
                }
                for (let x = 0; x < posts.length; x++) {
                    if (posts[x].username == req.user.username) {
                        posts[x].isLoggedIn = true;
                    } else {
                        posts[x].isLoggedIn = false;
                    }
                }
                res.render("search", { title: "Search", list: posts, keyword: req.query.keyword, school: req.user.school, profilePic: req.user.profilePic });            }).lean();

        } else {
            Post.find({ school: req.user.school, content: new RegExp(keyword, 'i') }, function (err, posts) {
                if (err) {
                    console.log(err);
                }
                for (let x = 0; x < posts.length; x++) {
                    if (posts[x].username == req.user.username) {
                        posts[x].isLoggedIn = true;
                    } else {
                        posts[x].isLoggedIn = false;
                    }
                }
                res.render("search", { title: "Search", list: posts, keyword: req.query.keyword, school: req.user.school,profilePic: req.user.profilePic });            }).lean();
        }
    },

    getLogin: function (req, res) {
        const response = {
            layout: 'reglog.hbs',
            title: "Login",
            error: req.query.error
        }
        res.render("login", response);
    },

    getRegister: function (req, res) {
        res.render("register", { layout: 'reglog.hbs', title: "Register" });
    },

    postRegister: async function (req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            var name = req.body.name;
            var username = req.body.username;
            var email = req.body.email;
            var school = req.body.school;
            var password = hashedPassword;
            var profilePic = 'blank.png';
            var newUser = {
                name: name,
                username: username,
                email: email,
                school: school,
                password: password,
                profilePic: profilePic,
                bio: "Enter bio here"
            }
            User.create(newUser, err => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(">>>   postRegister: Successfully added to DB");
            })
            res.redirect('/login');
        } catch {
            res.redirect('/register');
        }
    },

    postLogin: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?error=true',
    }),

    getLogout: function (req, res) {
        req.logout(function (err) {
            if (err) return next(err);
            res.redirect('/');
        });
    },

    getCheckEmailReg: function (req, res) {
        var email = "";
        User.find({ email: req.query.email }, (error, data) => {
            if (error) {
                console.log(error)
            } else {
                if (data.length === 0) {
                    email = req.query.email;
                }
                res.send({ email });
            }
        });
    },

    getCheckUsernameReg: function (req, res) {
        var username = "";
        User.find({ username: req.query.username }, (error, data) => {
            if (error) {
                console.log(error)
            } else {
                if (data.length === 0) {
                    username = req.query.username;
                }
                res.send({ username });
            }
        });
    },

    postUpdatePic: function(req,res){
        var updatePic = req.file.filename;

        User.updateOne({username: req.user.username}, {profilePic: updatePic}, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(updatePic);
                // console.log(req.user.username);
                console.log("Successfully updated Pic");
            }
        })

        Post.updateMany({username: req.user.username}, { profilePic: updatePic}, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Successfully updated");
            }
        })
        res.redirect('/user');
    },

    postAddPost: function (req, res) {
        const dateNow = new Date();
        const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (req.file) {
            var postInfo = {
                name: req.user.name,
                username: req.user.username,
                school: req.user.school,
                content: req.body.content,
                date: date,
                img: req.file.filename,
                profilePic: req.user.profilePic
            }
        } else {
            var postInfo = {
                name: req.user.name,
                username: req.user.username,
                school: req.user.school,
                content: req.body.content,
                date: date,
                profilePic: req.user.profilePic
            }
        }

        Post.create(postInfo, err => {
            if (err) {
                console.log(err);
                return;
            }
            else {
                console.log(">>>   postAddPost: Successfully added to DB with image");
            }
        });
        res.redirect('/home');
    },

    getDeletePost: function (req, res) {
        Post.deleteOne({ _id: req.query.id }, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(">>>   getDeletePost: Successfully deleted entry from DB");
            }
        })
    },

    postEditPost: function (req, res) {
        const dateNow = new Date();
        const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        Post.updateMany({ _id: req.query.id }, { content: req.query.content, date: date + " (edited)"}, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Successfully updated");
            }
        })
    },

    postEditBio: function (req, res) {
        User.updateOne({username: req.query.username}, { bio: req.query.bio}, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Successfully updated");
            }
        })
    },
    getBio : function(req, res){
        User.findOne({username: req.query.username}, {bio : 1, _id : 0}, function (err, result){
            console.log(req.query.username);
            if (err) {
                console.log(err);
            }
            else{
                console.log(result.bio);
                return res.send(result.bio);
            }
        })
    },
    getPfp : function(req, res){
        User.findOne({username: req.query.username}, {profilePic : 1, _id : 0}, function (err, result){
            console.log(req.query.username);
            if (err) {
                console.log(err);
            }
            else{
                console.log(result.profilePic);
                return res.send(result.profilePic);
            }
        })
    },

    getAnyUserPage: function (req, res) {
        Post.find({ username: req.query.username }, function (err, posts) {
            if (err) {
                console.log(err);
            }
            for (let x = 0; x < posts.length; x++) {
                if (posts[x].username == req.query.username && req.query.username == req.user.username) {
                    posts[x].isLoggedIn = true;
                } else {
                    posts[x].isLoggedIn = false;
                }
            }
            console.log(req.user.profilePic);
            if (req.query.username == req.user.username)
                res.render("UserPage", { title: "Profile", list: posts, school: req.user.school, name: req.query.name, username: req.query.username, bio : req.user.bio, profilePic : req.user.profilePic});
            else {
                res.render("AnyUserPage", { title: "Profile", list: posts, school: req.user.school, name: req.query.name, username: req.query.username,bio : req.query.bio, profilePic: req.query.profilePic  });
            }
        }).lean();
    },

   

}

export default controller;