const toggle = document.querySelector('.toggle'),
  links = document.querySelector('.links');

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}"></i>`;
});

links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  })
);

const reveal = new IntersectionObserver(
  entries =>
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        reveal.unobserve(e.target);
      }
    }),
  { threshold: .12 }
);

document.querySelectorAll('.reveal').forEach(e => reveal.observe(e));

document.querySelector('#form').addEventListener('submit', e => {
  e.preventDefault();

  const f = e.currentTarget,
    n = document.querySelector('#note');

  if (!f.name.value.trim() || !f.email.value.trim() || !f.message.value.trim()) {
    n.textContent = 'Please complete all fields before sending.';
    return;
  }

  if (!f.email.validity.valid) {
    n.textContent = 'Please enter a valid email address.';
    return;
  }

  n.style.color = '#27835d';
  n.textContent = 'Thanks! This static form is ready to connect to a form service.';
});