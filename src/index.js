import './css/reset.scss';
import './css/style.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import header from './js/header';
import nav from './js/nav';
import portfolio from './js/portfolio';
import blog from './js/blog';

document.addEventListener("DOMContentLoaded", () => {
    AOS.init();
    header();
    nav();
    portfolio();
    blog();
});