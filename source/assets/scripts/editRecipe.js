import { updateRecipe } from "./crudCopy.js";

// UPDATE part of CRUD
let confirmBtn = document.getElementById('confirmBtn');
confirmBtn.addEventListener('click', async function () {
    //Getting all elements
    let recipeTitle = document.getElementById("title").value;
    let servings = document.getElementById("servings").value;
    let cookTime = document.getElementById("cookTime").value;
    let author = document.getElementById("author").value;
    let img = document.getElementById("recipeImg").src;

    //returns all divs in ingredients article and instructions article
    let ingredients = document.querySelectorAll("#ingredients > div");
    let instructions = document.querySelectorAll("#instructions > div");
    let tags = document.querySelectorAll(".tags > *");

    let ingredientsArray = [];
    ingredients.forEach(ingredient => {
        if (ingredient.className == 'ingredient') {
            ingredientsArray.push(ingredient.textContent);
        }
    });

    let instructionsArray = [];
    instructions.forEach(instruction => {
        if (instruction.className == 'instruction') {
            instructionsArray.push(instruction.textContent);
        }
    });

    let tagsArray = [];
    tags.forEach(tag => {
        if (tag.classList.contains('selected')) {
            tagsArray.push(tag.textContent);
        }
    });

    let result = await updateRecipe(recipeTitle, img, servings, cookTime, author, ingredientsArray, instructionsArray, tagsArray)
        .then(resolved => { return resolved });
    console.log(result);

    window.location = 'viewRecipe.html';
});

// DELETE part of CRUD
let deleteBtn = document.getElementById('deleteRecipeBtn');
deleteBtn.addEventListener('click', async function () {
    let recipeTitle = document.getElementById('title').value;
    let result = await deleteRecipe(recipeTitle)
        .then(resolved => { return resolved });
    console.log(result);

    window.location = '../index.html';
});

// toggle tags
let tags = document.querySelectorAll('.tags > *');
tags.forEach(tag => {
    tag.addEventListener('click', function () {
        if (tag.classList.contains('selected')) {
            tag.classList.remove('selected');
        } else {
            tag.classList.add('selected');
        }
    });
});

// return to view recipe page without making edits
let backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', function () {
    window.location = 'viewRecipe.html';
});
// return to view recipe page without making edits
let cancelBtn = document.getElementById('cancelBtn');
cancelBtn.addEventListener('click', function () {
    window.location = 'viewRecipe.html';
});

let ingredientBtns = document.getElementById('ingredientBtns');
// add ingredient text field
let addIngredient = document.getElementById('addIngredient');
addIngredient.addEventListener('click', function () {
    let newIngredient = document.createElement('div');
    newIngredient.setAttribute('role', 'textbox');
    newIngredient.setAttribute('contenteditable', 'true');
    newIngredient.setAttribute('id', 'newInstruction');
    ingredientBtns.insertAdjacentElement("beforebegin", newIngredient);
});
// remove ingredient text field
let removeIngredient = document.getElementById('removeIngredient');
removeIngredient.addEventListener('click', function () {
    let toDelete = ingredientBtns.previousElementSibling;
    if (toDelete.nodeName == "DIV") {
        toDelete.remove();
    }
});

let instructionBtns = document.getElementById('instructionBtns');
// add ingredient text field
let addInstruction = document.getElementById('addInstruction');
addInstruction.addEventListener('click', function () {
    let newInstruction = document.createElement('div');
    newInstruction.setAttribute('role', 'textbox');
    newInstruction.setAttribute('contenteditable', 'true');
    newInstruction.setAttribute('id', 'newInstruction');
    instructionBtns.insertAdjacentElement("beforebegin", newInstruction);
});
// remove ingredient text field
let removeInstruction = document.getElementById('removeInstruction');
removeInstruction.addEventListener('click', function () {
    let toDelete = instructionBtns.previousElementSibling;
    if (toDelete.nodeName == "DIV") {
        toDelete.remove();
    }
});

// change recipe image on upload
let recipeImg = document.getElementById('recipeImg');
let uploadImg = document.getElementById('uploadImg');
uploadImg.addEventListener('change', function () {
    let img = uploadImg.files[0];
    if (img) {
        recipeImg.setAttribute('src', URL.createObjectURL(img));
    }
});

async function deleteRecipe() {
    const recipes = [];
    var dataBank;

    async function fetchRecipes() {
        return new Promise((resolve, reject) => {
            fetch("../source/assets/json/data.json")
                .then(response => response.json())
                .then(data => {
                    let ind = 0;
                    delete data['Ice Cream Sundae'];
                    console.log(data);
                    resolve(true);
                })
                .catch(error => reject(false));
        });
    }

    let fetchSuccessful = await fetchRecipes();

    if (!fetchSuccessful) {
        console.log('Recipe fetch unsuccessful');
        return;
    };

    window.location = 'explorePage.html';
}

//on click of delete button, remove ice cream image from fetch data in home.js