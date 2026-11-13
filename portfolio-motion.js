(() => {
  const controls = document.querySelector('.project-controls');
  const image = document.querySelector('#featured-image');
  const name = document.querySelector('#featured-name');
  const frame = document.querySelector('.project-image');
  if (!controls || !image || !name || !frame) return;

  const projects = {
    mongolia: { name: 'Mongolia.travel', image: '/img/work/mongolia_travel.webp' },
    smk: { name: 'SMK Steel', image: '/img/work/smksteel.webp' },
    mekong: { name: 'Mekong Moments', image: '/img/work/mekongmoments.webp' },
  };
  const buttons = [...controls.querySelectorAll('button[data-project]')];
  controls.hidden = false;
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const project = projects[button.dataset.project];
      if (!project || button.getAttribute('aria-pressed') === 'true') return;
      image.src = project.image;
      image.alt = `Earlier homepage of ${project.name}`;
      name.textContent = project.name;
      buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      frame.classList.remove('is-changing');
      void frame.offsetWidth;
      frame.classList.add('is-changing');
    });
  });
})();
