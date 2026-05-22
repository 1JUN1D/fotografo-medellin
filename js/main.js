// ============================================
// Esteban Jiménez Fotógrafo — interactividad
// ============================================

(function() {
    'use strict';

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const onScroll = () => {
            if (window.scrollY > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // Mobile menu toggle
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('open');
            document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
        });
        menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            menu.classList.remove('open');
            document.body.style.overflow = '';
        }));
    }

    // Reveal animations on scroll
    const reveals = document.querySelectorAll('.fade-in');
    if (reveals.length && 'IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('in-view'));
    }

    // Form submit -> WhatsApp
    const form = document.querySelector('.contact__form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const nombre = (data.get('nombre') || '').toString();
            const fecha = (data.get('fecha') || '').toString();
            const tipo = (data.get('tipo') || '').toString();
            const mensaje = (data.get('mensaje') || '').toString();
            const text = `Hola Esteban, soy ${nombre}.\nTipo de servicio: ${tipo}\nFecha aprox.: ${fecha}\n\n${mensaje}`;
            const url = `https://wa.me/573000000000?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        });
    }
})();
