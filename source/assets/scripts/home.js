import {getRecipe} from "./CRUD.js";
window.addEventListener("DOMContentLoaded", init);
const userName = window.location.hash.replace(/^#/, '');

let tags = document.querySelectorAll('.tags > *');
tags.forEach((tag) => {
  tag.addEventListener("click", function () {
    if (tag.classList.contains("selected")) {
      tag.classList.remove("selected");
    } else {
      tag.classList.add("selected");
    }
  });
});

async function init() {
  // Create Recipes (took some code from Lab 5)
  let recipes = [];
  var dataBank;

  // async function fetchRecipes() {
  //     return new Promise((resolve, reject) => {
  //         let json = window.location['pathname'].includes("/views/explorePage.html") ? "../source/assets/json/dataDel.json" : "./source/assets/json/data.json";
  //         fetch(json)
  //             .then(response => response.json())
  //             .then(data => {
  //                 let ind = 0;
  //                 for(let recipe in data) {
  //                     recipes[ind] = data[recipe];
  //                     ind++;
  //                 }
  //                 console.log(data);
  //                 resolve(true);
  //             })
  //             .catch(error => reject(false));
  //     });
  // }

  async function fetchRecipes(username) {
    let result = await getRecipe(username).then((resolved) => {
      return resolved;
    });
    recipes = result;
    return Promise.resolve(true);
    // return new Promise((resolve, reject) => {
    //     let json = window.location['pathname'].includes("/views/explorePage.html") ? "../source/assets/json/dataDel.json" : "./source/assets/json/data.json";
    //     fetch(json)
    //         .then(response => response.json())
    //         .then(data => {
    //             let ind = 0;
    //             for(let recipe in data) {
    //                 recipes[ind] = data[recipe];
    //                 ind++;
    //             }
    //             console.log(data);
    //             resolve(true);
    //         })
    //         .catch(error => reject(false));
    // });
  }

  let fetchSuccessful = await fetchRecipes(userName);

  if (!fetchSuccessful) {
    console.log("Recipe fetch unsuccessful");
    return;
  }

  const recipeGrid = document.querySelector(".recipe-grid");
  const recipeElements = document.querySelectorAll(".recipe");
  const recipeWH = "170vw";
  var pointer = 0;

  console.log(recipes);

  setTimeout(fillGrid, 500);

  function fillGrid() {
    // Remove current recipes on display
    for (let i = 0; i < recipeElements.length; i++) {
      if (recipeElements[i].children.length > 0) {
        if (recipeElements[i].children[0].tagName == "IMG") {
          recipeElements[i].removeChild(recipeElements[i].children[0]);
          recipeElements[i].textContent = "";
          recipeElements[i].removeAttribute("href");
        }
      }
    }

    // Add new recipes to display
    let capacity = pointer;

    for (
      let i = capacity % recipeElements.length;
      i < recipeElements.length;
      i++
    ) {
      if (pointer >= recipes.length) break;

      // Create recipe element
      const recipe = document.createElement("img");
      console.log(recipes[i].img);
      recipe.setAttribute("src", recipes[i].img);
      console.log("src for recipe img at line 92 in home.js: " + recipes[i].img); 
      recipe.setAttribute("width", recipeWH);
      recipe.setAttribute("height", recipeWH);
      // recipe.style.position = "absolute";
      // recipe.style.marginTop = "-7em";
      // recipe.style.marginLeft = "-5em";

      // recipe.style.xIndex = "200px"
      //    'viewRecipe/recipes[i]._id'

      // Add given recipe
      // recipeElements[i].textContent = '\r\n' +  recipes[pointer].slice(32, recipes[pointer].length - 4) + '\r\n\n';
      //recipeElements[i].textContent = '\r\n' + recipes[pointer].substr(32, recipes[pointer].substr(22).length - 4).replace('-', ' ')+'\r\n\n';
      recipeElements[i].textContent = recipes[i].title;
      recipeElements[i].setAttribute(
        "href",
        "viewRecipe.html#" + userName + "&" + recipes[i]._id
      );
      recipeElements[i].appendChild(recipe);

      // Update pointer
      pointer++;
    }

    pointer = capacity + recipeElements.length;
  }

  const rightButton = document.getElementById("right");
  rightButton.addEventListener("click", (e) => {
    if (pointer < recipes.length) fillGrid();
  });

  const leftButton = document.getElementById("left");
  leftButton.addEventListener("click", (e) => {
    if (pointer > recipeElements.length) {
      pointer -= recipeElements.length * 2;
      fillGrid();
    }
  });

  const createButton = document.getElementById("createButton");
  createButton.addEventListener("click", function () {
    window.location.href = "createRecipe.html" + "#" + userName;
  });

  // Go to explore page.
  const exploreButton = document.querySelector(".b");
  exploreButton.addEventListener("click", () => {
    window.location = "explorePage.html" + "#" + userName;
  });

  // Filter for search
  const searchButton = document.querySelector(".search-button");
  const searchBar = document.querySelector(".search");
  searchButton.addEventListener("click", querySearch);
  // window.addEventListener("keydown", querySearch);

  function querySearch() {
    fetchRecipes(userName);

    let recipeLength = recipes.length;
    let newRecipes = [];
    for (let i = 0; i < recipeLength; i++) {
      let name =
        recipes[i].title != undefined ? recipes[i].title.toString().toLowerCase() : "";
      let tags = recipes[i].tags;

      // Filter by name
      if (
        name.includes(searchBar.value.toLowerCase())
      )
        newRecipes.push(recipes[i]);

      // Filter by tag
      tags.forEach((element) => {
        if (
          element.toLowerCase().includes(searchBar.value) &&
          !newRecipes.includes(recipes[i])
        )
          newRecipes.push(recipes[i]);
      });
    }
    recipes = newRecipes;
    pointer = 0;

    fillGrid();
  }

  var tagBoxes = document.querySelectorAll(".tags > p");
  tagBoxes.forEach((element) => {
    element.addEventListener("click", () => {
      fetchRecipes(userName);

      let newRecipes = [];
      let recipeLength = recipes.length;
      let selectedTags = document.querySelectorAll(".tags > .selected");

      // Check for no tag selection
      if (selectedTags.length == 0) {
        pointer = 0;
        fillGrid();
        return;
      }

      // Check every tag box if it's been selected
      for (let i = 0; i < recipeLength; i++) {
        let names = recipes[i].tags;
        console.log(recipes[i].tags);

        // Check every tag on recipe to see if it matches the selected box
        names.forEach((name) => {
          selectedTags.forEach((tag) => {
            if(name.toLowerCase().includes(tag.textContent.toLowerCase())) {
              if(!newRecipes.includes(recipes[i])) newRecipes.push(recipes[i]);
            }
          })
        });
      }

      recipes = newRecipes;
      pointer = 0;
      fillGrid();
    });
  });
}
