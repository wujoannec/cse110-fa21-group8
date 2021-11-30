// unit.test.js

const functions = require('../source/assets/scripts/CRUD.js');

// TODO - Part 2
//bandemic
/*
test('testing-1', () => {
    expect(functions.authenticate('jim', '1234', 'login')).toBe(false);
});*/
/*
test('the data is the message from server', () => {
    //frist register should be successful 
    return authenticate('zjliang@ucsd.', '1234', 'register').then(data => {
      expect(data).toBe('register successful');
    });

    //register same credentials should fail 
    return authenticate('jim', '1234', 'register').then(data => {
        expect(data).toBe('user already exists');
    });
  }); 

test('the data is the message from server', () => {
    //should fail becaause user not in db
    return authenticate('terry', '1234', 'login').then(data => {
        expect(data).toBe('user already exists');
    });
    
});
*/

test('testing-1', () => {
    expect(Array.isArray(functions.getRecipe())).toBe(false);
});

/*
test('the data is the message from server', () => {
    //should fail becaause user not in db
    return functions.addRecipeaddRecipe('title','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'author', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('add successful');
    });
});
test('the data is the message from server', () => {
    //should fail becaause user not in db
    return functions.addRecipeaddRecipe('title','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'author', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('add successful');
    });
    return functions.addRecipeaddRecipe('title','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'author', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('recipe already exists');
    });
});
test('the data is the message from server', () => {
    //should fail becaause user not in db
    return functions.addRecipeaddRecipe('title','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'author', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('add successful');
    });
    return functions.deleteRecipe('title').then(data => {
        expect(data).toBe('recipe ${title} deleted');
    });
});

test('the data is the message from server', () => {
    //should fail becaause user not in db
    return functions.addRecipeaddRecipe('title','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'author', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('add successful');
    });
    return functions.deleteRecipe('nottitle').then(data => {
        expect(data).toBe("recipe ${title} doesn't exist, cannot delete");
    });
});


test('the data is the message from server', () => {
    //should fail becaause user not in db
    return functions.addRecipeaddRecipe('title','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'author', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('add successful');
    });
    return functions.addRecipeaddRecipe('titles','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'author', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('recipe already exists');
    });
});
test('the data is the message from server', () => {
    //should fail becaause user not in db
    return functions.addRecipeaddRecipe('title','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'author', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('add successful');
    });
    return functions.updateRecipe('title','https://upload.wikimedia.org/wikipedia/commons/9/99/Black_square.jpg','servings', 'cookTime', 'authors', 'ingredients', 'instructions', 'tags').then(data => {
        expect(data).toBe('recipe ${title} updated');
    }); 
});
*/