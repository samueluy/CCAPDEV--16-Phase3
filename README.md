REFERENCES
    For Login and Logout (Passport): 
    1.) https://youtu.be/W5Tb1MIeg-I
    2.) https://youtu.be/-RCnNyD0L-s


INSTALLATION INSTRUCTIONS
    1.) delete current package.json and package-lock.json files 
    2.) delete current node_modules folder
    3.) run the terminal and npm init
    4.) set main as app.js
    4.) install all necessary modules (list below)
    5.) add necessary lines to new package.json (instructions below)

INSTRUCTIONS FOR POPULATING THE DATABASE
    Running the code for the first time will populate the database to avoid duplicate users/posts do the following
    1.) open app.js 
    2.) comment out line 44 to 55 


MODULES TO INSTALL (for step 4)
    ---Base Stuff--- (npm i dotenv express express-handlebars mongodb mongoose nodemon)
    dotenv
    express
    express-handlebars
    mongodb
    mongoose
    nodemon
    ---For Login Stuff--- (npm i bcrypt body-parser express-flash express-session passport passport-local)
    bcrypt
    body-parser
    express-flash
    express-session
    passport
    passport-local
    ---For Image Uplaod-- (npm i multer)
    multer 


STUFF INSIDE PACKAGE.JSON THAT NEEDS TO BE ADDED (for step 5)
    INSIDE SCRIPTS 
        "start":"nodemon app.js"
        (Note: use "npm start" to run it)
    ABOVE DEPENDENCIES 
        "type": "module", 




ACCOUNT AND PASSWORDS ALREADY IN DATABSE
    1.) Username: kawaiiwa 
        Password: password1 
    2.) Username: gadgad 
        Password: password2 
    3.) Username: sambam 
        Password: password3 
    4.) Username: kiels
        Password: password4 
    5.) Useranme: lazyegg 
        Password: password5 "# CCAPDEV--16-Phase3" 
