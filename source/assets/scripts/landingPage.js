let imgArr = [
  "source/assets/images/sample-recipes/pizza.jpg",
  "source/assets/images/sample-recipes/quesa.jpg",
  "source/assets/images/sample-recipes/sushi.jpg",
  "source/assets/images/sample-recipes/sweet-rice.jpg",
  "source/assets/images/recipeImg.jpg",
];
let counter = 0; // instantiate a counter
let maxImage = imgArr.length; // the total number of images that are available
setInterval(function () {
  document.getElementById("landingImg").setAttribute("src", imgArr[counter]);
  if (counter + 1 == maxImage) {
    counter = 0; // reset to start
  } else {
    ++counter; // iterate to next image
  }
}, 5000);

let dropdownBtn = document.getElementById("dropdownBtn");
let dropdownContent = document.getElementById("dropdownContent");
dropdownBtn.addEventListener("click", function () {
  if (dropdownContent.getAttribute("class") == "hide") {
    dropdownContent.setAttribute("class", "show");
  } else {
    dropdownContent.setAttribute("class", "hide");
  }
});
