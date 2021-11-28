import { addRecipe } from "./crudCopy.js"; 


let confirmBtn = document.getElementById('confirmBtn');
confirmBtn.addEventListener("click", async function() {

    //Getting all elements
    let recipeTitle = document.getElementById("title").value;
    let servings = document.getElementById("servings").value;
    let cookTime = document.getElementById("cookTime").value;
    let author = document.getElementById("author").value;
    let img = document.getElementById("recipeImg").src;

    //returns all divs in ingredients article and instructions article
    let ingredients = document.querySelectorAll("#ingredients > div");
    let instructions = document.querySelectorAll("#instructions > div");
    let tags = document.querySelectorAll(".tags > p");

    let ingredientsArray = [];
    ingredients.forEach(ingredient => {
        ingredientsArray.push(ingredient.textContent);
    });

    let instructionsArray = [];
    instructions.forEach(instruction => {
        instructionsArray.push(instruction.textContent);
    });

    let tagsArray = [];
    tags.forEach(tag => {
        if(tag.classList.contains('selected')) {
            tagsArray.push(tag.textContent);
        }
    });

    let result = await addRecipe(recipeTitle, img, servings, cookTime, author, ingredientsArray, instructionsArray, tagsArray)
        .then(resolved => {return resolved});

    console.log("We executed here.")

    console.log(result);

});


// toggle tags based off of selection
let tags = document.querySelectorAll(".tags > *");
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
    window.location = 'homePage.html';
});
// return to view recipe page without making edits
// let confirmBtn = document.getElementById('confirmBtn');
// confirmBtn.addEventListener('click', function () {
//     window.location = 'createRecipe.html';
// });

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