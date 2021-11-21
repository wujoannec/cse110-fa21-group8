// Allow each tag to be toggled to selected class or not
let tags = document.querySelectorAll(".tags > *");

tags.forEach(tag => {
    tag.addEventListener('click', function(){
        console.log('click');
        
        if(tag.classList.contains('selected')){
            tag.classList.remove('selected');
        } else {
            tag.classList.add('selected');
        }
    });
});


// Limit user character input to author
var maxLength = 10;
let author = document.getElementById("author");
console.log(author.innerHTML);
author.addEventListener('keydown', function(event){
    console.log(author.innerHTML);
    if (author.innerHTML.length > maxLength && event.keycode != 8){
        e.preventDefault();
    }
});