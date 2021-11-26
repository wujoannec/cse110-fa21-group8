window.addEventListener("DOMContentLoaded", init);
import { addRecipe, updateRecipe, deleteRecipe, getRecipe, authenticate} from "./CRUD.js"; 
const serverUrl = "https://devil-dishes.herokuapp.com/";
async function init(){ 
    // get input variables
    let loggedIn = false;
    let userName = document.getElementById("username");
    let passWord = document.getElementById("password");
    let select = document.getElementById("selector");
    let button = document.getElementById("submit");
    let svResponse = document.getElementById("svResponse");
    let recipeTitle = document.getElementById("recipetitle");
    let img = document.getElementById("img");
    let ingredients = document.getElementById("ingredients");
    let crudSelection = document.getElementById("testcrud");
    let addbutton = document.getElementById("add");
    let getRecipes = document.getElementById("getall");
    select.addEventListener("change", async function(event) {
        button.innerHTML = select.value;
    });
    crudSelection.addEventListener("change", function(event) {
        addbutton.innerHTML = crudSelection.value;
    });
    button.addEventListener("click", async function() {
        let username = userName.value;
        let password = passWord.value;
        let response = await authenticate(username, password, select.value)
            .then(resolved => {return resolved});
        svResponse.innerHTML = response;
    });
    addbutton.addEventListener("click", async function() {
        let title = recipeTitle.value;
        let image = img.value;
        if (crudSelection.value == "add") {
            let ingredientsArray = [];
            // set mode automatically 
            ingredientsArray.push(ingredients.value);
            let result = await addRecipe(title, image, ingredientsArray)
                .then(resolved => {return resolved});
            svResponse.innerHTML = result;
        }
        if (crudSelection.value == "update") {
            let ingredientsArray = [];
            // set mode automatically 
            ingredientsArray.push(ingredients.value);
            let result = await updateRecipe(title, image, ingredientsArray)
                .then(resolved => {return resolved});
            svResponse.innerHTML = result;
        }
        if (crudSelection.value == "delete") {
            let ingredientsArray = [];
            // set mode automatically 
            ingredientsArray.push(ingredients.value);
            let result = await deleteRecipe(title, image, ingredientsArray)
                .then(resolved => {return resolved});
            svResponse.innerHTML = result;
        }
    });
    getRecipes.addEventListener("click", async function() {
        let result = await getRecipe()
            .then(resolved => {return resolved});
        svResponse.innerHTML = "";
        for(let i = 0; i < result.length; i++) {
            let currRecipe = document.createElement("img");
            currRecipe.src = result[i].img;
            currRecipe.height = 300;
            currRecipe.width = 300;
            svResponse.appendChild(currRecipe);
            let currname = document.createElement("h4");
            currname.innerHTML = result[i].title;
            svResponse.appendChild(currname);
        }
    });
}