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