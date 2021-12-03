import {getOneRecipe, getOneRecipeExplore} from "./CRUD.js";

// READ part of CRUD
const _id = window.location.hash.substring(1);
console.log(_id);

let result = await getOneRecipeExplore(_id).then((resolved) => {
  return resolved;
});

let recipeTitle = document.getElementById("title");
recipeTitle.innerHTML = result.title;

let servings = document.getElementById("servings");
servings.innerHTML = result.servings;

let cookTime = document.getElementById("cookTime");
cookTime.innerHTML = result.readyInMinutes;

let author = document.getElementById("author");
author.innerHTML = result.creditsText;

let img = document.getElementById("recipeImg");
img.src = result.image;

let ingredientCount = 1;
result.extendedIngredients.forEach((ingredient) => {
  fillIngredient(ingredient.name, ingredientCount);
  ingredientCount++;
});

let instructionCount = 1;
let instructs = result.instructions.split(".");
for(let i = 0; i < instructs.length; i++) {
  if(instructs[i].length < 2 || instructs[i].includes("Note:") || instructs[i].includes("Instructions")) continue;
  fillInstruction(instructs[i], instructionCount);
  instructionCount++;
}

let tags = document.getElementById("tags");
result.dishTypes.forEach((tag) => {
  let newTag = document.createElement("p");
  newTag.textContent = tag;
  tags.insertAdjacentElement("beforeend", newTag);
});

function fillIngredient(ingredient, ingredientCount) {
  let ingredients = document.getElementById("ingredients");
  let newIngredient = document.createElement("div");
  let name = "ingredient" + ingredientCount;

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", name);

  let label = document.createElement("label");
  label.setAttribute("for", name);
  label.innerHTML = ingredient;

  newIngredient.appendChild(checkbox);
  newIngredient.appendChild(label);
  ingredients.appendChild(newIngredient);
}

function fillInstruction(instruction, instructionCount) {
  let instructions = document.getElementById("instructions");
  let newInstruction = document.createElement("div");
  let name = "instruction" + instructionCount;

  let checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", name);

  let label = document.createElement("label");
  label.setAttribute("for", name);
  label.innerHTML = instruction;

  newInstruction.appendChild(checkbox);
  newInstruction.appendChild(label);
  instructions.appendChild(newInstruction);
}

// toggle favorites button
let favBtn = document.getElementById("favBtn");
favBtn.addEventListener("click", function () {
  if (favBtn.getAttribute("src") == "../source/assets/images/heartEmpty.png") {
    favBtn.setAttribute("src", "../source/assets/images/heartFull.png");
  } else {
    favBtn.setAttribute("src", "../source/assets/images/heartEmpty.png");
  }
});

// // move to edit recipe page
// let editBtn = document.getElementById("editBtn");
// editBtn.addEventListener("click", function () {
//   // window.location = 'editRecipe.html';
//   window.location.href = "editRecipe.html" + "#" + _id;
// });

let backBtn = document.getElementById("backBtn");
backBtn.addEventListener("click", function () {
  window.location = "explorePage.html";
});

// Add confetti
let instructions = document.querySelectorAll("#instructions > div > input");
let confetti = new JSConfetti();
instructions.forEach(element => {
  element.addEventListener("click", () => {
    if(checkTasks(instructions)) confetti.addConfetti();
  });
});

// Check if all instructions are completed
function checkTasks(instructions) {
  for(let i = 0; i < instructions.length; i++) {
    if(!instructions[i].checked) return false;
  }

  return true;
}