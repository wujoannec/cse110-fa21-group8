window.addEventListener('DOMContentLoaded', init);

function init() {
    let i = 0;
    const addButton = document.querySelector('button');
    const recipeGrid = document.querySelector('.grid-container');
    const recipes = document.querySelectorAll('.main');
    addButton.addEventListener('click', moveButton);

    function moveButton() {
        if(i < recipes.length - 1) {
            const recipe = recipes[i];
            const button = document.querySelector('button');
            const nextRecipe = recipes[++i];

            recipe.removeChild(button);
            nextRecipe.appendChild(button);

            recipe.textContent = "New Recipe #" + i;
        }
    }
}