import { getRecipe } from "./crudCopy.js";

// READ part of CRUD
let result = await getRecipe(title)
    .then(resolved => { return resolved });

let recipeTitle = document.getElementById("title");
recipeTitle.innerHTML = result.title;

let servings = document.getElementById("servings");
servings.innerHTML = result.servings;

let cookTime = document.getElementById("cookTime");
cookTime.innerHTML = result.cookTime;

let author = document.getElementById("author");
author.innerHTML = result.author;

let img = document.getElementById("recipeImg");
img.src = result.src;

ingredientCount = 1;
result.ingredients.forEach(ingredient => {
    fillIngredient(ingredient, ingredientCount);
    ingredientCount++;
});

instructionCount = 1;
result.instructions.forEach(instruction => {
    fillInstruction(instruction, instructionCount);
    instructionCount++;
});

let tags = document.getElementsByClassName('tags');
result.tags.forEach(tag => {
    let newTag = document.createElement('p');
    newTag.textContent = tag;
    tags.insertAdjacentElement('beforeend', newTag);
});

function fillIngredient(ingredient, ingredientCount) {
    let ingredients = document.getElementById('ingredients');
    let newIngredient = document.createElement('div');
    let name = 'ingredient' + ingredientCount;

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', name);

    let label = documnet.createElement('label');
    label.setAttribute('for', name);
    newIngredient.textContent = ingredient;

    newIngredient.appendChild(checkbox);
    newIngredient.appendChild(label);
    ingredients.appendChild(newIngredient);
}

function fillInstruction(instruction, instructionCount) {
    let instructions = document.getElementById('instructions');
    let newInstruction = document.createElement('div');
    let name = 'instruction' + instructionCount;

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('id', name);

    let label = documnet.createElement('label');
    label.setAttribute('for', name);
    newIngredient.textContent = instruction;

    newInstruction.appendChild(checkbox);
    newInstruction.appendChild(label);
    instructions.appendChild(newIngredient);
}

// toggle favorites button
let favBtn = document.getElementById('favBtn');
favBtn.addEventListener('click', function () {
    if (favBtn.getAttribute('src') == '../source/assets/images/heartEmpty.png') {
        favBtn.setAttribute('src', '../source/assets/images/heartFull.png');
    }
    else {
        favBtn.setAttribute('src', '../source/assets/images/heartEmpty.png');
    }
});

// move to edit recipe page
let editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click', function () {
    window.location = 'editRecipe.html';
});

let backBtn = document.getElementById('backBtn');
backBtn.addEventListener('click', function () {
    window.location = '../index.html';
});