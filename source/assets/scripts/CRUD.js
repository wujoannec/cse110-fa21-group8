export {
  addRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
  authenticate,
  getOneRecipe,
  getOneRecipeExplore,
  saveRecipe,
  favTag,
};
// add recipe
const serverUrl = "https://devil-dishes.herokuapp.com/";
// const serverUrl = "http://localhost:3000/";

/**
 * user authentication
 * @param {String} username uername
 * @param {String} password password
 * @param {String} authType type of authentication, either register or login
 * @returns {String} Message from server, you can use this to determine whether succeeded
 */
async function authenticate(username, password, authType) {
  // set mode automatically
  const response = await fetch(serverUrl + authType, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const res = await response.text();
  console.log(res);
  return Promise.resolve(res);
}

/**
 * add to user favorite section
 * @param {String} username username
 * @param {String} _id recipe id
 * @returns {String} Message from server, you can use this to determine whether succeeded
 */
async function saveRecipe(username, _id) {
  const response = await fetch(serverUrl + "addFavorite", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      _id: _id,
    }),
  });
  const res = await response.text();
  console.log(res);
  return Promise.resolve(res);
}

// image: the image file uploaded
async function uploadImg(image, username, title) {
  console.log("image passed into uploadImg: " + image);
  // if image is a string: return the link
  if (typeof image == "string") {
    return Promise.resolve(image);
  }
  // data to upload
  const formData = new FormData();
  let imgName = username + title + ".jpg";
  imgName = imgName.replace(/\ /g,"_");
  // if file is image
  formData.append("image", image,  imgName);
  const response = await fetch(serverUrl + "saveImg", {
    method: "POST",
    body: formData,
  });
  const dir = await response.text();
  console.log(dir);
  return Promise.resolve(dir);
}

// imgDir: img in recipe
// returns {Blob} imagelink to put to src
async function getImg(imgDirRaw) {
  // check if imgDir is at the server
  const imgDir = imgDirRaw.replace(/\ /g,"_");
  if (imgDir.substring(0,9) != "user_img/") {
    console.log(imgDir);
    return Promise.resolve(imgDir);
  }
  const respond = await fetch(serverUrl + "getImg", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      imgDir: imgDir,
    }),
  });
  const blob = await respond.blob();
  const imageObjUrl = URL.createObjectURL(blob);
  console.log(imageObjUrl);
  // convert the file to image
  // .then(response => {
  //   let blobUrl = response.blob();
  //   console.log(blobUrl);
  //   const imageObjUrl = URL.createObjectURL(blobUrl);
  //   return Promise.resolve(imageObjUrl);
  // });
  return Promise.resolve(imageObjUrl);
}

//CRUD
/**
 * add recipe if recipe title DNE
 * @param {String} title
 * @param {File} img
 * @param {Array} ingredients
 * @returns {String} Message from server, you can use this to determine whether succeeded
 */
async function addRecipe(
  username,
  title,
  img,
  servings,
  cookTime,
  author,
  ingredients,
  instructions,
  tags
) {
  let imgDir;
  // if no img is chosen
  if (img == undefined) {
    imgDir = "user_img/def.jpg";
  }
  else {
    // server dir to image
    imgDir = await uploadImg(img, username, title)
      .then(resolved => {return resolved});
  }
  const response = await fetch(serverUrl + "add", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      img: imgDir,
      ingredients: ingredients,
      servings: servings,
      cookTime: cookTime,
      author: author,
      instructions: instructions,
      tags: tags,
    }),
  });
  // add to user specific area
  const res = await response.text();
  await saveRecipe(username, res);
  console.log("in line 101 in CRUD" + res);
  return Promise.resolve(res);
}

/**
 * return all recipes for a user
 * @param {String} username username
 * @returns {Array} an array of java objects contains all recipes
 */
async function getRecipe(username) {
  // set mode automatically
  const response = await fetch(serverUrl + "getAllRecipe", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  });
  const res = await response.text();
  let resObj = JSON.parse(res);
  if(!(resObj.length == 0))
  {

  
    console.log(resObj);

    //if(resObj)
    // traverse each to parse the image link
    resObj.forEach(async function(recipe) {
        // check if the image in recipe is stored in the server(or outside link)
    let imgBlob = await getImg(recipe.img)
                          .then(resolve => {return resolve});
        recipe.img = imgBlob;
    });
    console.log(resObj[0].img);
  }
  return Promise.resolve(resObj);
}

/**
 * @param _id: id of the current recipe
 * return one recipe based on title
 * @returns {Array} an array of java object contains the recipe
 */
async function getOneRecipe(_id) {
  // set mode automatically
  console.log("entered getOneRecipe");
  const response = await fetch(serverUrl + "getRecipe", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      _id: _id,
    }),
  });
  const res = await response.text();
  // change the img attribute to atcual blob link or original link
  let resObj = JSON.parse(res);
  // check if the image in recipe is stored in the server(or outside link)
  let imgBlob = await getImg(resObj.img)
                        .then(resolve => {return resolve});
  resObj.img = imgBlob;
  return Promise.resolve(resObj);
}

async function favTag(_id, favUnfav) {
  const response = await fetch(serverUrl + "favTag", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      _id: _id,
      favUnfav : favUnfav
    }),
  });
  const res = await response.text();
  return Promise.resolve(res);
}

/**
 * @param idNum: id of the current recipe
 * return one recipe based on title
 * @returns {JSON} a json of all recipe info
 */
 async function getOneRecipeExplore(idNum) {
  let apiLink = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";
  // const apiKey = "&apiKey=c6c6e98c49db4067b8ac5b9fce7703cd";
  const apiKey = "126a45f034mshd1de42a24e5a6d2p14ccefjsnd4686ee15764";

  // set mode automatically
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

  return sourceJson;
}

/**
 * update recipe if recipe title exists, even if nothing changed!
 * @param {String} title
 * @param {File} img
 * @param {Array} ingredients
 * @returns {String} Message from server, you can use this to determine whether succeeded
 */
async function updateRecipe(
  _id,
  title,
  img,
  servings,
  cookTime,
  author,
  ingredients,
  instructions,
  tags,
  username
) {
  let imgDir;
  // if user didn't update image
  if (img == undefined) {
    imgDir = "original";
  }
  else {
    imgDir = await uploadImg(img, username, title)
                      .then(resolved => {return resolved});
  }

  // set mode automatically
  const response = await fetch(serverUrl + "update", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      _id: _id,
      title: title,
      img: imgDir,
      ingredients: ingredients,
      servings: servings,
      cookTime: cookTime,
      author: author,
      instructions: instructions,
      tags: tags,
    }),
  });
  const res = await response.text();
  console.log(res);
  return Promise.resolve(res);
}

/**
 * delete recipe if recipe id exists, also delete from user favorites if favorated
 * @param {String} username
 * @param {Array} _id
 * @param {String} title title of the recipe
 * @returns {String} Message from server, you can use this to determine whether succeeded
 */
async function deleteRecipe(username, _id, title) {
  const temp = "user_img" + "/" + username + title;
  const imgDir = temp.replace(/\ /g,"_");
  
  // set mode automatically
  // console.log(_id);
  const response = await fetch(serverUrl + "delete", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      _id: _id,
      username: username,
      imgDir: imgDir,
    }),
  });
  const res = await response.text();
  console.log(res);
  return Promise.resolve(res);
}

// takes in image file from image input
// returns processedUrl (img in base64 String)
// function processImg(image) {
//   const reader = new FileReader();
//   let processedUrl = "";
//   reader.addEventListener("loadend", function() {
//     processedUrl = reader.result;
//   });
//   // if image is passed in
//   if (image) {
//     reader.readAsDataURL(image);
//   }
//   // if no image is here, use the ult
//   else {
//     processedUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";
//   }
//   // when the string is processed
//   if (processedUrl != "") {
//     console.log(processedUrl);
//     return processedUrl;
//   }
// }


// old implementation of deleteimg
// async function removeImg(imgDir) {
//   // check if imgDir is at the server
//   if (imgDir.substring(0,9) != "user_img/") {
//     return Promise.resolve("link is outside");
//   }
//   // if imgDir is on the server
//   const respond = await fetch(serverUrl + "deleteImg", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       imgDir: imgDir,
//     }),
//   });
// }
