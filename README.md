# ***Inter Schola***


### AUTHORS:
- *Kyla Reese Jhulan Dela Cruz*
- *Kielo Bash Mercado*
- *Gad Lyndon Pineda*
- *Samuel Jedidah Uy*

### ABOUT
> Spurred on by current issues relating to students, their privacy, and the online environment,
> the creators decided to take matters into their own hands. This led to the conceptualization 
> and later creation of InterSchola: the interschool yet fully curated online interaction platform. 
> Think twitter but if twitter was specifically made to cater to a user's particular sub group 
> (ie. School and specifc student body).
> Here in InterSchola you can be sure that everything you get up to stays on a need to know, in-school-only, basis

---

## NPM PACKAGES
    1.) dotenv
    2.) express
    3.) express-handlebars
    4.) mongodb
    5.) mongoose
    6.) nodemon
    7.) bcrypt
    8.) body-parser
    9.) express-flash
    10.) express-session
    11.) passport
    12.) passport-local
    
.
.
.
.
# Read me:
---


## SECTION 1: References and Instructions
### References
    For Login and Logout (Passport): 
        1.) https://youtu.be/W5Tb1MIeg-I
        2.) https://youtu.be/-RCnNyD0L-s


### Installation Instructions
    1.) delete current package.json and package-lock.json files 
    2.) delete current node_modules folder
    3.) run the terminal and npm init
    4.) set main as app.js
    4.) install all necessary modules (list below)
    5.) add necessary lines to new package.json (instructions below)

### Instructions for Populating the Database
    Running the code for the first time will populate the database to avoid duplicate users/posts do the following
    1.) open app.js 
    2.) comment out line 44 to 55  

.
.
---

## SECTION 2: Modules to install (for step 4 of installtion instructions)

### Base  
    dotenv
    express
    express-handlebars
    mongodb
    mongoose
    nodemon
**(npm i dotenv express express-handlebars mongodb mongoose nodemon)** 

### For Login 
    bcrypt
    body-parser
    express-flash
    express-session
    passport
    passport-local
**(npm i bcrypt body-parser express-flash express-session passport passport-local)** 

### For Image Uplaod 
    multer 
**(npm i multer)** 

.
.
--- 

## SECTION 3: Other Important Information 

### Inside package.json That Needs to Be Added (For Step 5 in Installation Instructions)
    INSIDE SCRIPTS 
        "start":"nodemon app.js"
        (Note: use "npm start" to run it)
    ABOVE DEPENDENCIES 
        "type": "module", 

### Account and Passwords Already in Database
    1.) Username: kawaiiwa 
        Password: password1 
    2.) Username: gadgad 
        Password: password2 
    3.) Username: sambam 
        Password: password3 
    4.) Username: kiels
        Password: password4 
    5.) Useranme: lazyegg 
        Password: password5 
        
### Note
    1) Profile pictures with spaces in their filenames produces an error
