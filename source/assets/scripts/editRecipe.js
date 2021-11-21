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

var maxLength = 20;

let author = document.getElementById("author");
console.log(author.innerHTML);
author.addEventListener('keydown', function(event){
    console.log(author.innerHTML);
    if (author.innerHTML.length > maxLength && event.keyCode != 8){
        event.preventDefault();
    }
});