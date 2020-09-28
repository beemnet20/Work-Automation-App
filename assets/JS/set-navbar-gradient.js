var navbar = document.querySelector(".mynav");
var links = document.querySelectorAll(".nav-link");
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
        for (var j = 0; j < links.length; j++) {
            links[j].classList.remove("active");
        }
        this.classList.add("active");
        setGradient(".active");
    });
    links[i].addEventListener("mouseover", function() {
        for (var j = 0; j < links.length; j++) {
            links[j].classList.remove("show-active");
        }
        this.classList.add("show-active");
        setGradient(".show-active");
    });
    links[i].addEventListener("mouseleave", function() {
        for (var j = 0; j < links.length; j++) {
            links[j].classList.remove("show-active");
        }
        setGradient(".active");
    });

}

setGradient(".active");

window.onresize = function() {
    setGradient();
}

function setGradient(className) {
    var docWidth = window.innerWidth;
    var targetPage = document.querySelector(className);
    var link = targetPage.getBoundingClientRect();
    link.median = link.left + (link.width / 2);
    var percent = (link.median / docWidth) * 100;
    percent = String(Math.floor(percent) - 10);

    var gradient = "linear-gradient(100deg, #30cfd0 0%, #330867 " + percent + "% , #30cfd0  100% )";
    navbar.style.background = gradient;

}