const rolly = document.querySelector(".rolly"); 
const icon = document.querySelector(".rolly-icon");
const linksContainer = document.querySelector(".rolly-links")
const links = document.querySelectorAll(".rolly-link")
const list = document.querySelector(".rolly-list-container")

let finalHeight = 0;
links.forEach(() => {finalHeight+=48;})
list.style.height = `${finalHeight}px`
linksContainer.style.height = `${finalHeight}px`

icon.addEventListener('click', () => {
    linksContainer.classList.toggle("active");
})



