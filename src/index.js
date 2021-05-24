import "./css/reset.scss";
import "./css/style.scss";
import "font-awesome/css/font-awesome.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import header from "./js/header";
import nav from "./js/nav";
import portfolio from "./js/portfolio";
import blog from "./js/blog";

document.addEventListener("DOMContentLoaded", () => {
  AOS.init();
  header();
  nav();
  portfolio();
  blog();
  contact();
});

function initPortfolio() {
  jQuery("#portfolio-list").slick({
    slidesToShow: 1,
  });
}

function contact() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", sendmail);
}

function sendmail(e) {
  e.preventDefault();

  const { name, email, message } = e.target;

  fetch("/.netlify/functions/sendmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
    }),
  })
    .then(() => {
      alert("Thank you, Your message has been sent!");
      name.value = "";
      email.value = "";
      message.value = "";
    })
    .catch((err) => {
      alert("Woof! there are something wrong. Sorry, please try again later.");
      console.error(err);
    });
}
