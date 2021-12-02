import {authenticate} from "./CRUD.js"
const auth_type = "register";

let userName = document.getElementById("username");
let passWord = document.getElementById("password");
let reg = document.getElementById("submit");

reg.addEventListener("click", async function() {
    let res = await authenticate(userName.value, passWord.value, auth_type)
                        .then(resolve => {return resolve})
                        .catch(err => {return err});
    console.log(res);
});

