import jQuery from "jquery";

import kingfreshfarm from "../img/portfolio/kingfreshfarm.jpg";
import smksteel from "../img/portfolio/smksteel.jpg";
import tgfresh from "../img/portfolio/tgfresh.png";
import danslesgolfs2015 from "../img/portfolio/danslesgolfs_2015.png";
import hippocheeze from "../img/portfolio/hippocheeze.png";
import cmoffice from "../img/portfolio/cmoffice.png";
import ink360 from "../img/portfolio/ink360.jpg";
import inspiringlaos from "../img/portfolio/inspiringlaos.jpg";
import mekongmoments from "../img/portfolio/mekongmoments.jpg";
import mekongmomentsInfo from "../img/portfolio/mekongmoments_info.jpg";
import mongoliaTravel from "../img/portfolio/mongolia_travel.png";
import nogeckospray from "../img/portfolio/nogeckospray.png";
import vananavasky from "../img/portfolio/vananavasky.jpg";
import scglobal from "../img/portfolio/scglobal-2016.png";

const delayStep = 50;

const data = [
  {
    img: kingfreshfarm,
    title: "King Fresh Farm",
    company: "Freelance Job",
    builtWith: `WordPress, Elementor, TranslatePress`,
    link: "https://www.kingfreshfarm.com",
    description: ``,
  },
  {
    img: smksteel,
    title: "SMK Steel",
    company: "Freelance Job",
    builtWith: `Vue.js, Gridsome`,
    link: "https://www.smksteel.com",
    description: ``,
  },
  {
    img: tgfresh,
    title: "Tropical Green",
    company: "Freelance Job",
    builtWith: `WordPress, Elementor`,
    link: "https://www.tgfresh.com",
    description: ``,
  },
  {
    img: mekongmoments,
    title: "Mekong Moments",
    company: "Chameleon Strategies.co, ltd.",
    builtWith: `Angular.js, Node.js, MongoDB`,
    link: "https://www.mekongmoments.com",
    description: ``,
  },
  {
    img: mekongmomentsInfo,
    title: "Mekong Moments Information",
    company: "Chameleon Strategies.co, ltd.",
    builtWith: `Angular.js, Node.js, MongoDB`,
    link: "https://www.mekongmoments.info",
    description: ``,
  },
  {
    img: mongoliaTravel,
    title: "Mongolia.travel",
    company: "Chameleon Strategies.co, ltd.",
    builtWith: `Vue.js, Node.js, MongoDB`,
    link: "https://www.mongolia.travel",
    description: ``,
  },
  {
    img: inspiringlaos,
    title: "Inspiring Laos",
    company: "Chameleon Strategies.co, ltd.",
    builtWith: `React.js, Node.js, MongoDB`,
    link: "https://www.inspiringlaos.com",
    description: ``,
  },
  {
    img: nogeckospray,
    title: "No Gecko Spray",
    company: "Freelance Job",
    builtWith: `WordPress`,
    link: "https://www.nogeckospray.com",
    description: ``,
  },
  {
    img: vananavasky,
    title: "Vana Nava Sky Hua Hin",
    company: "Chameleon Strategies.co, ltd.",
    builtWith: `WordPress`,
    link: "https://www.vananavasky.com",
    description: ``,
  },
  {
    img: danslesgolfs2015,
    title: "Dans les Golfs (2015)",
    company: "Infogammer Limited Partnership",
    builtWith: `ASP.NET MVC 5`,
    description: ``,
  },
  {
    img: scglobal,
    title: "SCGlobal (2016)",
    company: "Freelance Job",
    builtWith: `WordPress`,
    description: ``,
  },
  {
    img: ink360,
    title: "INK360.vn",
    company: "Chameleon Strategies.co, ltd.",
    builtWith: `WordPress, Vue.js, WebGL`,
    description: ``,
  },
  {
    img: hippocheeze,
    title: "Hippo Cheeze",
    company: "Freelance Job",
    builtWith: `WordPress`,
    description: ``,
  },
  {
    img: cmoffice,
    title: "CM Office",
    company: "Freelance Job",
    builtWith: `WordPress`,
    description: ``,
  },
];

export default function init() {
  const portfolio = jQuery("#portfolio-list");
  let delay = 0;
  data.forEach((d) => {
    delay += delayStep;
    jQuery(
      `<div class="portfolio-item${!d.link ? " unavailable" : ""}" data-aos="fade-up" data-aos-delay="${delay}">
      <a href="${
        d.link || "javascript:void(0);"
      }" target="_blank" rel="noreferrer noopener">
      <img src="${d.img}" class="portfolio-item-img" />
      </a>
        <h5 class="portfolio-item-title">${d.title}</h5>
        <div class="portfolio-item-built-with"><strong>Using:</strong> ${
          d.builtWith
        }</div>
        <div class="portfolio-item-link">
        <strong>Link</strong>: 
          <a href="${
            d.link || "javascript:void(0);"
          }" target="_blank" rel="noreferrer noopener">${
        d.link || "Not available"
      }</a>
        </div>
      </div>`
    ).appendTo(portfolio);
  });
}
