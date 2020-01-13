let siteNav, toggle, ul, li;
export default function init() {
    siteNav = document.querySelector("#site-nav");
    toggle = document.querySelector("#site-nav .toggle");
    ul = document.querySelector("#site-nav ul");
    li = document.querySelectorAll("#site-nav li");

    updateNavPosition();

    window.addEventListener("resize", () => {
        updateNavPosition();
    })

    window.addEventListener("scroll", ev => {
        updateNavPosition();
    })

    toggle.addEventListener("click", ev => {
        ev.preventDefault();
        ul.classList.toggle("visible");
    })

    li.forEach(it => {
        it.addEventListener("click", ev => {
            ul.classList.remove("visible");
        })
    })
}

function updateNavPosition() {
    if (window.innerWidth < 992 || isOverHeader()) {
        siteNav.classList.add("fixed");
    } else {
        siteNav.classList.remove("fixed");
    }
}

function isOverHeader() {
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const siteNavHeight = siteNav.offsetHeight || 0;
    return scrollTop > (windowHeight + siteNavHeight);
}