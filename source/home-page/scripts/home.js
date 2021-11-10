window.addEventListener('DOMContentLoaded', init);

function init() {
    const recipes = [
        'assets/sample-recipes/burger.jpg',
        'assets/sample-recipes/french-toast.jpg',
        'assets/sample-recipes/fried-ice-cream.jpg',
        'assets/sample-recipes/fries.jpg',
        'assets/sample-recipes/hot-coacoa.jpg',
        'assets/sample-recipes/mochi.jpg',
        'assets/sample-recipes/pizza.jpg',
        'assets/sample-recipes/quesa.jpg',
        'assets/sample-recipes/ravioli.jpg',
        'assets/sample-recipes/sushi.jpg',
        'assets/sample-recipes/sweet-rice.jpg'
    ]
    const recipeGrid = document.querySelector('.recipe-grid');
    const recipeElements = document.querySelectorAll('.recipe');
    const recipeWH = 60;
    var pointer = 0;

    fillGrid();

    function fillGrid() {
        // Remove current recipes on display
        for(let i = 0; i < recipeElements.length; i++) {
            if(recipeElements[i].children.length > 0) {
                if(recipeElements[i].children[0].tagName == 'IMG') {
                    recipeElements[i].removeChild(recipeElements[i].children[0]);
                    recipeElements[i].textContent = "<EMPTY>"
                }
            }
        }

        // Add new recipes to display
        let capacity = pointer;

        for(let i = capacity % recipeElements.length; i < recipeElements.length; i++) {
            if(pointer >= recipes.length) break;
            
            // Create recipe element
            const recipe = document.createElement('img');
            recipe.setAttribute('src', recipes[pointer]);
            recipe.setAttribute('width', recipeWH);
            recipe.setAttribute('height', recipeWH);

            // Add given recipe
            recipeElements[i].textContent = recipes[pointer].substr(22, recipes[pointer].substr(22).length - 4).replace('-', ' ');
            recipeElements[i].appendChild(recipe);

            // Update pointer
            pointer++;
        }

        pointer = capacity + recipeElements.length;
        console.log(pointer);
    }

    const rightButton = document.getElementById('right');
    rightButton.addEventListener('click', e => {
        if (pointer < recipes.length) fillGrid();
    });

    const leftButton = document.getElementById('left');
    leftButton.addEventListener('click', e => {
        if(pointer > recipeElements.length) {
            pointer -= recipeElements.length * 2;
            fillGrid();
        }
    });
}