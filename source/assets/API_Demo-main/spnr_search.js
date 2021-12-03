// let mainLink = "https://api.spoonacular.com/";
let queryLink = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
let apiLink = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
// const apiKey = "&apiKey=c6c6e98c49db4067b8ac5b9fce7703cd";
const apiKey = "126a45f034mshd1de42a24e5a6d2p14ccefjsnd4686ee15764";
let resultSection = document.getElementById("result");
let detail = document.getElementById("detail");
let res = [];

import {Router} from "./Router.js";

window.addEventListener("DOMContentLoaded", init);
async function init() {
  explore();

  // let searchSuccess = false;
  let searchButton = document.getElementById("search");
  searchButton.addEventListener("click", explore);

  // Explore the different recipes.
  async function explore() {
    let typeOfSearch = document.getElementById("selector").value;
    let response = await fetch(
      queryLink + "/" + typeOfSearch + document.getElementById("query").value,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": apiLink,
          "x-rapidapi-key": apiKey,
        },
      }
    );
    let data = await response.json();
    // element name of menu items is "menuItems"
    let results = "results";
    if (typeOfSearch == "food/menuItems/search?query=") {
      results = "menuItems";
    }
    res = data[results];

    // Fill up explore grid
    const recipeElements = document.querySelectorAll(".recipe");
    // const recipeWH = 60;
    var pointer = 0;

    fillGrid();

    async function fillGrid() {
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

        // Add given recipe
        let idNum = res[pointer].id;
        let infoQuery = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${idNum}/information`;
        let source = await fetch(infoQuery,
          {
            method: "GET",
            headers: {
              "x-rapidapi-host": apiLink,
              "x-rapidapi-key": apiKey,
            },
          }
          );
        let sourceJson = await source.json();
        // let originLink = sourceJson.sourceUrl;

        console.log(sourceJson);

        recipeElements[i].textContent = res[pointer]["title"];
        recipeElements[i].setAttribute("href", "viewRecipeExplore.html#" + idNum);
        recipeElements[i].appendChild(recipe);

        // Update pointer
        console.log(sourceJson);
        pointer++;
      }

      pointer = capacity + recipeElements.length;
    }

    const rightButton = document.getElementById("right");
    rightButton.addEventListener("click", (e) => {
      if (pointer < res.length) fillGrid();
    });

    const leftButton = document.getElementById("left");
    leftButton.addEventListener("click", (e) => {
      if (pointer > recipeElements.length) {
        pointer -= recipeElements.length * 2;
        fillGrid();
      }
    });

    // Go back to home page.
    const homeButton = document.querySelector("a");
    homeButton.addEventListener("click", () => {
      window.location = "../index.html";
    });

    // resultSection.innerHTML = "";
    // for (let i = 0; i < res.length; i++) {
    //     let result_pic = document.createElement("img");
    //     result_pic.src = res[i].image;
    //     result_pic.alt = "pic of the element";
    //     result_pic.width = "300";
    //     result_pic.height = "300";
    //     resultSection.appendChild(result_pic);
    //     if (typeOfSearch == "recipes/complexSearch?query=") {
    //         let idNum = res[i].id;
    //         let infoQuery = `https://api.spoonacular.com/recipes/${idNum}/information?apiKey=c6c6e98c49db4067b8ac5b9fce7703cd`;
    //         let source = await fetch (infoQuery);
    //         let sourceJson = await source.json();
    //         let originLink = sourceJson.sourceUrl;
    //         let title_ref = document.createElement("a");
    //         title_ref.href = originLink;
    //         // when the pic is clicked, display info
    //         result_pic.addEventListener("click", async function() {
    //             detail.innerHTML = "";
    //             // display entire json file in detail
    //             for (let i = 0 ; i < sourceJson.extendedIngredients.length; i++) {
    //                 let ingredientsDetail = document.createElement("h4");
    //                 let extIngredient = sourceJson.extendedIngredients[i]
    //                 ingredientsDetail.innerHTML = extIngredient.aisle + " " + extIngredient.measures.metric.amount + extIngredient.measures.metric.unitShort + ",";
    //                 detail.appendChild(ingredientsDetail);
    //             }
    //             resultSection.style.display = "none";
    //             detail.style.display = "block";
    //             console.log(sourceJson);
    //         });
    //         // when esc is pressed, show search results
    //         window.addEventListener("keydown", (event) => {
    //             const keyName = event.key;
    //             if (keyName == "Escape") {
    //               resultSection.style.display = "block";
    //               detail.style.display = "none";
    //             }
    //           });
    //         // ingredients have attribute name instead of title
    //         if (typeOfSearch != "food/ingredients/search?query=") {
    //             title_ref.innerHTML = res[i].title;
    //         }
    //         else {
    //             title_ref.innerHTML = res[i].name;
    //         }
    //         resultSection.appendChild(title_ref);
    //     }
    //     else {
    //         let objTitle = document.createElement("h3");
    //         if (typeOfSearch != "food/ingredients/search?query=") {
    //             objTitle.innerHTML = res[i].title;
    //         }
    //         else {
    //             objTitle.innerHTML = res[i].name;
    //         }
    //         resultSection.appendChild(objTitle);
    //     }

    // }
    // console.log("clicked");
    // searchRecipe(document.getElementById("query").value)
    //     .then(function() {
    //         for (let i = 0; i < res.length; i++) {
    //             let result_pic = document.createElement("img");
    //             result_pic.src = res[i].image;
    //             result_pic.alt = "pic of the recipe";
    //             result_pic.width = "300";
    //             result_pic.height = "300";
    //             resultSection.appendChild(result_pic);
    //             let result_title = document.createElement("h3");
    //             result_title.innerHTML = res[i].title;
    //             resultSection.appendChild(result_title);
    //         }
    //     });

    // console.log(searchSuccess);
    // if (searchSuccess) {
    //     // create element for each recipe fetched

    // }
    // else {
    //     console.log("error fetching recipes");
    //     return ;
    // }
  }
}

// const query = document.getElementById("query").value;

// async function searchRecipe(keyWord) {
//     return new Promise((resolve, reject) => {
//         fetch(mainLink + keyWord + apiKey)
//             .then(response => response.json())
//             .then(data => {
//                 res = data.results;
//                 console.log(res);
//             })
//             // .then(console.log(data))
//             .then(function() {
//                 return resolve();
//             })
//             .catch(error => {
//                 reject(error);
//             });

//     }
// )};
