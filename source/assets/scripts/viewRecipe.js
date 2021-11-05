let favButton = document.getElementById('favBtn');
favButton.addEventListener('click', function () 
{
    if (favButton.getAttribute('src') == 'assets/images/heart-empty.png')
    {
        favButton.setAttribute('src', 'assets/images/heart-full.png');
    }
    else 
    {
        favButton.setAttribute('src', 'assets/images/heart-empty.png');
    }
});