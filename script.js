// Animasi header saat halaman dibuka
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    header.style.opacity = 0;
    setTimeout(() => {
        header.style.transition = 'opacity 1s';
        header.style.opacity = 1;
    }, 300);

    // Hover effect pada project
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.boxShadow = '0 8px 32px #e94560';
        });
        project.addEventListener('mouseleave', () => {
            project.style.boxShadow = '0 4px 16px #0f3460';
        });
    });

    // Scroll to top button
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
        highlightNav();
    };
    scrollBtn.onclick = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Smooth scroll for nav links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Highlight nav menu on scroll
    function highlightNav() {
        const sections = document.querySelectorAll('section');
        let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        let found = false;
        sections.forEach(section => {
            const top = section.offsetTop - 80;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`nav ul li a[href="#${id}"]`);
            if (scrollPos >= top && scrollPos < bottom && navLink) {
                navLink.classList.add('active');
                found = true;
            } else if (navLink) {
                navLink.classList.remove('active');
            }
        });
        // If not found, remove all
        if (!found) {
            document.querySelectorAll('nav ul li a').forEach(link => link.classList.remove('active'));
        }
    }

    // Testimonial carousel (jika lebih dari 1)
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length > 1) {
        let idx = 0;
        setInterval(() => {
            testimonials.forEach((t, i) => {
                t.style.display = (i === idx) ? 'block' : 'none';
            });
            idx = (idx + 1) % testimonials.length;
        }, 4000);
    }

    // Animasi pada skills
    const skills = document.querySelectorAll('.skills-list li');
    skills.forEach((skill, i) => {
        skill.style.opacity = 0;
        setTimeout(() => {
            skill.style.transition = 'opacity 0.7s';
            skill.style.opacity = 1;
        }, 600 + i * 150);
    });
});
