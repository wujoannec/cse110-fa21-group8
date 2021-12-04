import {filter} from "./filter.js";

// let mainLink = "https://api.spoonacular.com/";
let queryLink = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
let apiLink = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
// const apiKey = "&apiKey=c6c6e98c49db4067b8ac5b9fce7703cd";
const apiKey = "126a45f034mshd1de42a24e5a6d2p14ccefjsnd4686ee15764";
let resultSection = document.getElementById("result");
let detail = document.getElementById("detail");
let res = [];

let userName = window.location.hash.replace(/^#/, '');
let loggedIn = false;
// if logged in
if (userName != "") {
  loggedIn = true;
}



window.addEventListener("DOMContentLoaded", init);
async function init() {
  // let Servresponse = await filter([], 50);
  await explore(false);
  
  // let searchSuccess = false;
  let searchButton = document.getElementById("search");
  searchButton.addEventListener("click", async function() {
    await explore(true);
  });

  // Explore the different recipes.
  // queryStatus: true if searching, false if 
  async function explore(search) {
    if(search) {
      let response = await fetch(
        queryLink + "/" + "recipes/complexSearch?query=" + document.getElementById("query").value,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": apiLink,
            "x-rapidapi-key": apiKey,
          },
        }
      );
      let data = await response.json();
      console.log("in spnr_search line 45");
      // element name of menu items is "menuItems"
      res = data["results"];
      var tagBoxes = document.querySelectorAll(".sidenav > input");
      tagBoxes.forEach((element) => {
        element.addEventListener("click", () => {
          // console.log(`tag ${element.value} clicked`)

          let newRecipes = [];
          let recipeLength = res.length;
          let selectedTags = [];

          // Check for no tag selection
          if (noTagSelected(tagBoxes)) {
            pointer = 0;
            fillGrid();
            return;
          }
          else {
            tagBoxes.forEach((tagBox) => {
              if(tagBox.checked) selectedTags.push(tagBox.value.toLowerCase());
            });
          }

          // Check every tag box if it's been selected
          for (let i = 0; i < recipeLength; i++) {
            let names = res[i].tags;
            console.log(res[i].tags);

            // Check every tag on recipe to see if it matches the selected box
            names.forEach((name) => {
              if(selectedTags.includes(name.toLowerCase())) {
                if(!newRecipes.includes(res[i])) newRecipes.push(res[i]);
              }
            });
          }

          res = newRecipes;
          pointer = 0;
          fillGrid();

          // Check if no tags are selected on the left panel
          function noTagSelected(tagBoxes) {
            for (let i = 0; i < tagBoxes.length; i++) {
              if (tagBoxes[i].checked) return false;
            }

            return true;
          }
        });
      });

    }
    else {
      let filterRes = await filter([], 50)
                    .then(filterRes => {return filterRes});
      res = filterRes["recipes"];
        
      // When clicking tags, please filter
      var tagBoxes = document.querySelectorAll(".sidenav > input");
      tagBoxes.forEach((element) => {
        element.addEventListener("click", async function() {
            let selectedTags = [];
            tagBoxes.forEach((tagBox) => {
                if(tagBox.checked) selectedTags.push(tagBox.value.toLowerCase());
            })

            let filterRes = await filter(selectedTags, 50)
                          .then(filterRes => {return filterRes});
            res = filterRes["recipes"];
            pointer = 0;
            fillGridExplore();
        });
      });
    }

    // Fill up explore grid
    const recipeElements = document.querySelectorAll(".recipe");
    // const recipeWH = 60;
    var pointer = 0;

    fillGridExplore();

    const rightButton = document.getElementById("right");
    rightButton.addEventListener("click", (e) => {
      if (pointer < res.length) fillGridExplore();
    });

    const leftButton = document.getElementById("left");
    leftButton.addEventListener("click", (e) => {
      if (pointer > recipeElements.length) {
        pointer -= recipeElements.length * 2;
        fillGridExplore();
      }
    });

    // Go back to home page.
    const homeButton = document.querySelector("a");
    homeButton.addEventListener("click", () => {
      if (loggedIn) {
        window.location.href = "homePage.html" + "#" + userName;
      }
      // if did not login
      else {
        window.location.href = "register.html";
      }

    });


    async function fillGridExplore() {
      // Remove current recipes on display
      for (let i = 0; i < recipeElements.length; i++) {
        if (recipeElements[i].children.length > 0) {
          if (recipeElements[i].children[0].tagName == "IMG") {
            recipeElements[i].removeChild(recipeElements[i].children[0]);
            recipeElements[i].removeAttribute("href");
            recipeElements[i].textContent = "";
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
        if (pointer >= res.length) break;
  
        // Create recipe element
        const recipe = document.createElement("img");
        recipe.setAttribute("src", res[pointer]["image"]);
        // recipe.setAttribute("width", recipeWH);
        // recipe.setAttribute("height", recipeWH);
        
        // recipe id
        let idNum = res[pointer].id;
  
        recipeElements[i].textContent = res[pointer]["title"];
        if (loggedIn) {
          recipeElements[i].setAttribute("href", "viewRecipeExplore.html#" + userName + "&" + idNum);  
        }
        else {
          recipeElements[i].setAttribute("href", "viewRecipeExplore.html#" + idNum);
        }
        recipeElements[i].appendChild(recipe);

        pointer++;
      }
  
      pointer = capacity + recipeElements.length;
    }
  }
}