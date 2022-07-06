import "dotenv/config";
import express from "express"; 
import session from "express-session"; 
import exphbs from "express-handlebars"; 
import mongoose from "mongoose"; 
import passport from "passport";
import routes from './routes/routes.js';
import addEnrty from "./dbEntries.js"; 

const url = "mongodb+srv://ccapdev-16:ccapdev16@cluster0.hut9tv3.mongodb.net/?retryWrites=true&w=majority";
const secret = process.env.SESSION_SECRET; 
const app = express(); 

mongoose.connect(url, 
    function(error) {
        if(error) throw error;
        console.log('>>>   CONNECTED TO: ' + url);
    }
);

//MIDDLE WARE SECTION 
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs"); 
app.set("views", "./views");
app.use(express.static(`public`));
app.use(express.static(`uploads`));
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true
})); 
app.use(express.urlencoded({ extended:false })); 
app.use(express.json()); 


//PASSPORT.JS STUFF 
app.use(passport.initialize()); 
app.use(passport.session()); 

//This is the part to comment out after running once 
// addEnrty.newUser1(); 
// addEnrty.newUser2();
// addEnrty.newUser3(); 
// addEnrty.newUser4();
// addEnrty.newUser5(); 

// addEnrty.newUser1Post1(); 
// addEnrty.newUser1Post2();
// addEnrty.newUser1Post3(); 
// addEnrty.newUser1Post4(); 
// addEnrty.newUser1Post5();
// addEnrty.newUser1Post6(); 

// END 

app.use(`/`, routes);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });