/**
 * REALTOR IMRAN KHAN - Official Website Scripts
 * Ultra-fast, responsive, smooth UX and WhatsApp integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Sticky Navbar shadow on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Active Link Highlighter on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-nav-link');

  const highlightNav = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav);

  // Consultation Form Direct to WhatsApp
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const project = document.getElementById('clientProject').value;
      const budget = document.getElementById('clientBudget').value;
      const notes = document.getElementById('clientNotes').value.trim();

      const text = encodeURIComponent(
        `Assalam o Alaikum Realtor Imran Khan,\n` +
        `New Consultation Request from Website:\n\n` +
        `👤 Name: ${name}\n` +
        `📞 Phone: ${phone}\n` +
        `🏢 Preferred Society: ${project}\n` +
        `💰 Budget Bracket: ${budget}\n` +
        `📝 Requirement: ${notes || 'Looking for best investment options.'}`
      );

      const targetURL = `https://wa.me/923179993990?text=${text}`;
      window.open(targetURL, '_blank');
    });
  }

  // Animated Counter for Stats
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsCounted = false;

  const countUp = () => {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 60 && !statsCounted) {
      statsCounted = true;

      statNumbers.forEach(item => {
        const target = parseInt(item.getAttribute('data-count'), 10);
        const prefix = item.getAttribute('data-prefix') || '';
        const suffix = item.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 1200;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            item.textContent = prefix + target + suffix;
            clearInterval(timer);
          } else {
            item.textContent = prefix + Math.floor(count) + suffix;
          }
        }, stepTime);
      });
    }
  };

  window.addEventListener('scroll', countUp);
  countUp();
});
