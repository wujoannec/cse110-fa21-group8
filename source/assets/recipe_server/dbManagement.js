// get the CRUD Mongodb function
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const MongoUrl = "mongodb+srv://software_devils:software_devils@cluster0.uzv91.mongodb.net";
const dbName = "devil_dishes?retryWrites=true&w=majority";

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// connect to MongoDB CRUD system
async function connectdb() {
    await mongoose.connect(MongoUrl + "/" + dbName)
        .catch(error => {
            console.log(error);
        });
    console.log("connected to db");
}
connectdb().catch(err => console.log(err));

// set up express
const express = require("express");
const app = express();
// const port = 3000;
// parst post request body
const bodyParser = require("body-parser");
// allow browser and server to share data
const cors = require("cors");
// allow sharing data
app.use (cors());  
// allow url-encoded bodies
app.use (bodyParser.urlencoded( { extended: true }));
// allow json-encoded bodies
app.use (bodyParser.json());  

// mongoDB Schemas
// userdata
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
// recipedata
const recipeSchema = new mongoose.Schema({
    title: String,
    img: String,
    ingredients: Array,
    servings: String,
    cookTime: String,
    author: String,
    instructions: Array,
    tags: Array
}); 
// Convert Schema to model
const user = mongoose.model("user", userSchema);
const recipe = mongoose.model("recipe", recipeSchema);


// routers
// express operations
app.get("/", (req, res) => {
    res.send("Server is up and running, if you see this in app check fetch request");
});

// login authentication system
// if user DNE, propose to registesr
// if user exists, check password match
// if matches, res = true
app.post("/login", async function(req,res) {
    const username = req.body.username;
    const password = req.body.password;
    // if login successfull
    let authResult = await userLogin(username, password)
        .then(resolved => {return resolved})
        .catch(rejected => {return rejected});
    console.log(authResult);
    if (authResult == true) {
        res.send("login successful");
    }
    else {
        res.send("incorrect password or email");
    }
});

// login authentication process
// if user DNE, propose to registesr
// if user exists, check password match
// if matches, res = true
async function userLogin(username, password) {
    let response = await user.find({username: username, password: password});
    console.log(response);
    // if loggin success
    if (response.length > 0) {
        console.log("resolved promise returned");
        return Promise.resolve(true);
    }
    // if loggin unsuccess
    else {
        console.log("incorrect password")
        return Promise.reject(false);
    }
    
    // old code
    // authentication
    // user.find({username: username, password: password}, function(err, result) {
    //     // if error 
    //     if(err) {
    //         console.error(err);
    //     }
    //     // if password matches (the returned doc is not empty)
    //     if (result) {
    //         console.log("password matches");
    //         loginSuccess = true;
    //         console.log("success is set to true");
    //     }
    //     else {
    //         console.log("incorrect password");
    //     }
    // });

}

// register
app.post("/register", async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    // if user exists
    let exists = await checkUserExist(username)
        .then(resolved => {return resolved})
        .catch(rejected => {return rejected});
    if (exists) {
        res.send("user already exists");
        return;
    }
    // if user DNE, create a new user profile & store in DB
    const newProfile = new user({username: username, password: password});
    await newProfile.save();
    res.send("register successful");
});

// check if user exists
async function checkUserExist(username) {
    const exists = await user.exists({username: username});
    if (exists) {
        console.log(`user exists, ${exists} returned, unable to create user`);
        return Promise.resolve(exists);
    }
    // if use DNE
    else {
        console.log(`user DNE, ${exists} returned, able to create user`);
        return Promise.reject(exists);
    }
}

// get recipe from server, will be added with specific users
// TODO
app.post("/getAllRecipe", async function(req, res) {
    let allRecipe = await recipe.find()
        .then(recipeData => {return recipeData})
        .catch(error => {return error});
    res.send(allRecipe);
});

// get recipe from server, will be added with specific users
// TODO
app.post("/getRecipe", async function(req, res) {
    const title = req.body.title;
    let oneRecipe = await recipe.findOne({title: title})
        .then(recipeData => {return recipeData})
        .catch(error => {return error});
    console.log(title);
    res.send(oneRecipe);
});

// add recipe
app.post("/add", async function(req, res) {
    const title = req.body.title;
    const img = req.body.img;
    const ingredients = req.body.ingredients;
    const servings = req.body.servings;
    const cookTime = req.body.cookTime;
    const author = req.body.author;
    const instructions = req.body.instructions;
    const tags = req.body.tags;
    // if recipe exists
    let exists = await checkRecipeExist(title)
    .then(resolved => {return resolved})
    .catch(rejected => {return rejected});
    if (exists) {
        res.send("recipe already exists");
        return;
    }
    // if recipe DNE, create a new recipe profile & store in DB
    const newProfile = new recipe({title: title, img: img, ingredients: ingredients, servings: servings,
                                    cookTime: cookTime, author: author, instructions: instructions, tags: tags});
    await newProfile.save();
    res.send("add successful");
});

// check if recipe exists
async function checkRecipeExist(recipeTitle) {
    const exists = await recipe.exists({title: recipeTitle});
    if (exists) {
        console.log(`recipe exists, ${exists} returned`);
        return Promise.resolve(exists);
    }
    // if recipe DNE
    else {
        console.log(`recipe DNE, ${exists} returned`);
        return Promise.reject(exists);
    }
}

// delete recipe
app.post("/delete", async function(req, res) {
    const title = req.body.title;
    const img = req.body.img;
    const ingredients = req.body.ingredients;
    // if recipe exists
    let exists = await checkRecipeExist(title)
    .then(resolved => {return resolved})
    .catch(rejected => {return rejected});
    console.log(title);
    if (!exists) {
        res.send(`recipe ${title} doesn't exist, cannot delete`);
        return;
    }
    // if recipe exists, delete from DB
    await recipe.deleteOne({title: title})
        .catch(error => {
            res.send(`delete failed, ${error}`);
            return;
        });
    res.send(`recipe ${title} deleted`);
});

// update recipe
app.post("/update", async function(req, res) {
    const title = req.body.title;
    const img = req.body.img;
    const ingredients = req.body.ingredients;
    const servings = req.body.servings;
    const cookTime = req.body.cookTime;
    const author = req.body.author;
    const instructions = req.body.instructions;
    const tags = req.body.tags;
    // if recipe exists
    let exists = await checkRecipeExist(title)
    .then(resolved => {return resolved})
    .catch(rejected => {return rejected});
    if (!exists) {
        res.send("recipe doesn't exist, cannot update");
        return;
    }
    // if recipe exists, delete from DB
    await recipe.updateOne({title: title, img: img, ingredients: ingredients})
        .catch(error => {
            res.send(`update failed, ${error}`);
            return;
        });
    res.send(`recipe ${title} updated`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`serving on port ${port}`);
});
