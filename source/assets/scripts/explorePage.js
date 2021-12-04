let tags = document.querySelectorAll('.tags > *');
tags.forEach((tag) => {
  tag.addEventListener("click", function () {
    if (tag.classList.contains("selected")) {
      tag.classList.remove("selected");
    } else {
      tag.classList.add("selected");
    }
  });
});