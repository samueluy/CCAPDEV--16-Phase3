import User from './models/UserModel.js';
import Post from './models/PostModel.js';
import bcrypt from "bcrypt";

const addEnrty = {

    newUser1: async function () {
        const hashedPassword = await bcrypt.hash("password1", 10);
        var newUser = {
            name: "Kyla dela Cruz",
            username: "kawaiiwa",
            email: "kyla405dc@yahoo.com",
            school: "DE LA SALLE UNIVERSITY, MANILA",
            password: hashedPassword,
            profilePic: 'blank.png',
            bio: "Enter bio here"
        };
        User.create(newUser, err => {
            if (err) console.log(err);
        });
    },

    newUser2: async function () {
        const hashedPassword = await bcrypt.hash("password2", 10);

        var newUser = {
            name: "Gad Pineda",
            username: "gadgad",
            email: "gadguy@gmail.com",
            school: "DE LA SALLE UNIVERSITY, MANILA",
            password: hashedPassword,
            profilePic: 'blank.png',
            bio: "Enter bio here"
        };
        User.create(newUser, err => {
            if (err) console.log(err);
        });
    },

    newUser3: async function () {
        const hashedPassword = await bcrypt.hash("password3", 10);
        var newUser = {
            name: "Samuel Uy",
            username: "sambam",
            email: "samuy@gmail.com",
            school: "ATENEO DE MANILA UNIVERSITY",
            password: hashedPassword,
            profilePic: 'blank.png',
            bio: "Enter bio here"
        };
        User.create(newUser, err => {
            if (err) console.log(err);
        });
    },

    newUser4: async function () {
        const hashedPassword = await bcrypt.hash("password4", 10);
        var newUser = {
            name: "Kielo Mercado",
            username: "kiels",
            email: "kielom@gmail.com",
            school: "UNIVERSITY OF SANTO THOMAS",
            password: hashedPassword,
            profilePic: 'blank.png',
            bio: "Enter bio here"
        };
        User.create(newUser, err => {
            if (err) console.log(err);
        });
    },

    newUser5: async function () {
        const hashedPassword = await bcrypt.hash("password5", 10);
        var newUser = {
            name: "Gudetama",
            username: "lazyegg",
            email: "sanriolover@yahoo.com",
            school: "UNIVERSITY OF THE PHILIPPINES, DILIMAN",
            password: hashedPassword,
            profilePic: 'blank.png',
            bio: "Enter bio here"
        };
        User.create(newUser, err => {
            if (err) console.log(err);
        });
    },

    newUser1Post1: function () { //has picture 
        const dateNow = new Date();
        const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var postInfo = {
            name: "Kyla dela Cruz",
            username: "kawaiiwa",
            school: "DE LA SALLE UNIVERSITY, MANILA",
            content: "This is the first post I'm going to make. Omg I'm so excited! ",
            date: date,
            img: "yakult.jpg",
            profilePic: 'blank.png',
            tempId: "User1Post1",
            bio: "Enter bio here"
        }
        Post.create(postInfo, err => {
            if (err) { console.log(err); }
        });
    },

    newUser1Post2: function () {
        const dateNow = new Date();
        const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var postInfo = {
            name: "Kyla dela Cruz",
            username: "kawaiiwa",
            school: "DE LA SALLE UNIVERSITY, MANILA",
            content: "Second post!!! I love this app already HAHAHAHA",
            date: date,
            profilePic: 'blank.png',
            tempId: "User1Post2",
            bio: "Enter bio here"
        }
        Post.create(postInfo, err => {
            if (err) { console.log(err); }
        });
    },

    newUser1Post3: function () {
        const dateNow = new Date();
        const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var postInfo = {
            name: "Kielo Mercado",
            username: "kiels",
            school: "UNIVERSITY OF SANTO THOMAS",
            content: "Third post like in the saying 3rd times the charm",
            date: date,
            profilePic: 'blank.png',
            tempId: "User1Post3",
            bio: "Enter bio here"
        }
        Post.create(postInfo, err => {
            if (err) { console.log(err); }
        });
    },

    newUser1Post4: function () {
        const dateNow = new Date();
        const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var postInfo = {
            name: "Kielo Mercado",
            username: "kiels",
            school: "UNIVERSITY OF SANTO THOMAS",
            content: "Fourth post!! This app so fine!",
            date: date,
            profilePic: 'blank.png',
            tempId: "User1Post4",
            bio: "Enter bio here"
        }
        Post.create(postInfo, err => {
            if (err) { console.log(err); }
        });
    },

    newUser1Post5: function () {
        const dateNow = new Date();
        const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var postInfo = {
            name: "Gudetama",
            username: "lazyegg",
            school: "UNIVERSITY OF THE PHILIPPINES, DILIMAN",
            content: "My fifth post yet I'm not getting tired of it",
            date: date,
            profilePic: 'blank.png',
            tempId: "User1Post5",
            bio: "Enter bio here"
        }
        Post.create(postInfo, err => {
            if (err) { console.log(err); }
        });
    },

    newUser1Post6: function () {
        const dateNow = new Date();
        const date = dateNow.toDateString() + " " + dateNow.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var postInfo = {
            name: "Gad Pineda",
            username: "gadgad",
            school: "DE LA SALLE UNIVERSITY, MANILA",
            content: "The sixth post!! The next coming of twitter maybe??",
            date: date,
            profilePic: 'blank.png',
            tempId: "User1Post6",
            bio: "Enter bio here"
        }
        Post.create(postInfo, err => {
            if (err) { console.log(err); }
        });
    },



    deleteUser: function (username) {
        User.deleteOne({ username: username }, function (err, result) {
            if (err) { console.log(err) }
        })
    },

    deletePost: function (tempId) {
        Post.deleteOne({ tempId: tempId }, function (err, result) {
            if (err) { console.log(err); }
        })
    },

}

export default addEnrty;
