let favButton = document.getElementById('favBtn');
favButton.addEventListener('click', function () 
{
    if (favButton.getAttribute('src') == 'assets/images/heartEmpty.png')
    {
        favButton.setAttribute('src', 'assets/images/heartFull.png');
    }
    else 
    {
        favButton.setAttribute('src', 'assets/images/heartEmpty.png');
    }
});