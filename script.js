// Bukenzo Venture - Modern JavaScript
gsap.registerPlugin(ScrollTrigger);

// Preloader
window.addEventListener('load', () => {
    updateCounter();
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
// Bukenzo Venture - Modern JavaScript
gsap.registerPlugin(ScrollTrigger);

// Preloader
window.addEventListener('load', () => {
    updateCounter();
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 2200);
});

function updateCounter() {
    const pc = document.getElementById('plc');
    let c = 0;
    const iv = setInterval(() => {
        c += Math.floor(Math.random() * 8) + 1;
        if (c >= 100) { c = 100; clearInterval(iv); }
        if (pc) pc.textContent = c + '%';
    }, 150);
}

// Enhanced Navbar with scroll detection
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    if (window.scrollY > 50) {
        nav.classList.add('s');
    } else {
        nav.classList.remove('s');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Mobile menu with smooth animations
const mmb = document.getElementById('mmb');
const nm = document.getElementById('nm');
let menuOpen = false;

if (mmb && nm) {
    mmb.addEventListener('click', () => {
        menuOpen = !menuOpen;
        nm.classList.toggle('o');
        mmb.classList.toggle('o');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    });

    // Portfolio dropdown toggle - Prevent navigation on mobile
    document.querySelectorAll('.portfolio-link').forEach(btn => {
        const dropdown = btn.parentElement.querySelector('.portfolio-menu');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Only navigate on desktop (non-mobile)
            if (window.innerWidth > 900) {
                window.location.href = 'gallery.html';
            } else {
                dropdown.classList.toggle('open');
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.portfolio-dropdown').forEach(dd => {
            if (!dd.contains(e.target)) {
                dd.querySelector('.portfolio-menu').classList.remove('open');
            }
        });
    });



// Hash-based gallery section navigation & filtering
function applyHashFilter() {
    if (window.location.pathname.includes('gallery.html')) {
        const hash = window.location.hash.slice(1).toLowerCase();
        if (hash) {
            const sections = document.querySelectorAll('.country-section');
            const countryMap = {
                'turkey': 'turkey',
                'egypt': 'egypt',
                'morocco': 'morocco',
                'portugal': 'portugal',
                'northampton': 'northampton',
                'uk': 'northampton'
            };
            const targetKey = countryMap[hash] || hash;
            

            // Show ALL sections if "all", else show target only
            sections.forEach(section => {
                if (hash === 'all') {
                    section.style.display = 'block';
                } else if (section.dataset.country && section.dataset.country.toLowerCase().includes(targetKey)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            
            // Scroll target to middle
            const targetSection = Array.from(sections).find(section => 
                section.dataset.country && section.dataset.country.toLowerCase().includes(targetKey)
            );
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }
    }
}

// Apply on load and hashchange
window.addEventListener('load', applyHashFilter);
window.addEventListener('hashchange', applyHashFilter);

// Country buttons + dropdown - Always go to gallery.html#country
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('country-btn') || e.target.classList.contains('portfolio-item')) {
        const filter = e.target.dataset.filter;
        if (filter) {
            // Close dropdowns
            document.querySelectorAll('.portfolio-menu').forEach(menu => menu.classList.remove('open'));
            
            // Navigate to gallery.html#filter
            window.location.href = 'gallery.html#' + filter.toLowerCase();
        }
    }
});



    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !nm.contains(e.target) && !mmb.contains(e.target)) {
            nm.classList.remove('o');
            mmb.classList.remove('o');
            menuOpen = false;
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            nm.classList.remove('o');
            mmb.classList.remove('o');
            menuOpen = false;
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll progress
window.addEventListener('scroll', () => {
    const sp = document.querySelector('.sc-p');
    const h = document.documentElement.scrollHeight - window.innerHeight;
    sp.style.transform = 'scaleX(' + (window.scrollY / h) + ')';
});

// Intersection Observer for reveals
const ro = new IntersectionObserver((es) => {
    es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('v');
            ro.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.ru, .rl, .rr, .rs').forEach(el => ro.observe(el));

// Testimonials carousel
const tds = document.querySelectorAll('.tdot');
const tcs = document.querySelectorAll('.tcard');
let ti = 0;

function showT(i) {
    tcs.forEach((c, j) => { c.classList.toggle('a', j === i); });
    tds.forEach((d, j) => { d.classList.toggle('a', j === i); });
    ti = i;
}

tds.forEach((d, i) => d.addEventListener('click', () => showT(i)));

// Arrow buttons navigation
const tPrev = document.querySelector('.t-prev');
const tNext = document.querySelector('.t-next');
if (tPrev) tPrev.addEventListener('click', () => showT((ti - 1 + tcs.length) % tcs.length));
if (tNext) tNext.addEventListener('click', () => showT((ti + 1) % tcs.length));
setInterval(() => showT((ti + 1) % tcs.length), 5000);
showT(0);

// Gallery lightbox
document.querySelectorAll('.gi[data-img]').forEach(item => {
    item.addEventListener('click', () => {
        const src = item.dataset.img;
        const lb = document.createElement('div');
        lb.className = 'lb';
        lb.innerHTML = '<div class="lbc"><img src="' + src + '" alt="Gallery"><button class="lbx">&times;</button></div>';
        document.body.appendChild(lb);
        
        lb.addEventListener('click', e => {
            if (e.target === lb || e.target.classList.contains('lbx')) {
                lb.remove();
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') lb.remove();
        });
    });
});

// Contact form
const cf = document.getElementById('cf');
const smsg = document.getElementById('sm');
if (cf) {
    cf.addEventListener('submit', (e) => {
        e.preventDefault();
        cf.style.display = 'none';
        smsg.style.display = 'block';
        smsg.style.opacity = '0';
        gsap.to(smsg, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' });
    });
}

// Hero animations
if (document.querySelector('.hr')) {
    gsap.from('.hr h1', { duration: 1.2, y: 80, opacity: 0, ease: 'power3.out', delay: 0.3 });
    gsap.from('.hsub', { duration: 1.2, y: 60, opacity: 0, ease: 'power3.out', delay: 0.6 });
    gsap.from('.hc', { duration: 1, y: 40, opacity: 0, ease: 'power3.out', delay: 0.9 });
}

// Animated number counters
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.textContent.includes('%') ? '%' : (el.textContent.includes('+') ? '+' : '');
            const duration = 2000;
            const start = performance.now();
            
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(ease * target);
                el.textContent = current + suffix;
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target + suffix;
            }
            
            requestAnimationFrame(update);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.sn[data-target]').forEach(el => countObserver.observe(el));

// Hero parallax for backgrounds
if (document.querySelector('.hr-bg2')) {
    gsap.to('.hr-bg2', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hr",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Video visibility observer (pause off-screen videos)
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) video.play();
        else video.pause();
    });
}, { threshold: 0.1 });

document.querySelectorAll('video').forEach(v => videoObserver.observe(v));
// Bukenzo Venture - Modern JavaScript
gsap.registerPlugin(ScrollTrigger);

// Preloader
window.addEventListener('load', () => {
    updateCounter();
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 2200);
});

function updateCounter() {
    const pc = document.getElementById('plc');
    let c = 0;
    const iv = setInterval(() => {
        c += Math.floor(Math.random() * 8) + 1;
        if (c >= 100) { c = 100; clearInterval(iv); }
        if (pc) pc.textContent = c + '%';
    }, 150);
}

// Enhanced Navbar with scroll detection
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    if (window.scrollY > 50) {
        nav.classList.add('s');
    } else {
        nav.classList.remove('s');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Mobile menu with smooth animations
const mmb = document.getElementById('mmb');
const nm = document.getElementById('nm');
let menuOpen = false;

if (mmb && nm) {
    mmb.addEventListener('click', () => {
        menuOpen = !menuOpen;
        nm.classList.toggle('o');
        mmb.classList.toggle('o');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    });

    // Portfolio dropdown toggle - Prevent navigation on mobile
    document.querySelectorAll('.portfolio-link').forEach(btn => {
        const dropdown = btn.parentElement.querySelector('.portfolio-menu');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Only navigate on desktop (non-mobile)
            if (window.innerWidth > 900) {
                window.location.href = 'gallery.html';
            } else {
                dropdown.classList.toggle('open');
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.portfolio-dropdown').forEach(dd => {
            if (!dd.contains(e.target)) {
                dd.querySelector('.portfolio-menu').classList.remove('open');
            }
        });
    });



// Hash-based gallery section navigation & filtering
function applyHashFilter() {
    if (window.location.pathname.includes('gallery.html')) {
        const hash = window.location.hash.slice(1).toLowerCase();
        if (hash) {
            const sections = document.querySelectorAll('.country-section');
            const countryMap = {
                'turkey': 'turkey',
                'egypt': 'egypt',
                'morocco': 'morocco',
                'portugal': 'portugal',
                'northampton': 'northampton',
                'uk': 'northampton'
            };
            const targetKey = countryMap[hash] || hash;
            

            // Show ALL sections if "all", else show target only
            sections.forEach(section => {
                if (hash === 'all') {
                    section.style.display = 'block';
                } else if (section.dataset.country && section.dataset.country.toLowerCase().includes(targetKey)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            
            // Scroll target to middle
            const targetSection = Array.from(sections).find(section => 
                section.dataset.country && section.dataset.country.toLowerCase().includes(targetKey)
            );
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }
    }
}

// Apply on load and hashchange
window.addEventListener('load', applyHashFilter);
window.addEventListener('hashchange', applyHashFilter);

// Country buttons + dropdown - Always go to gallery.html#country
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('country-btn') || e.target.classList.contains('portfolio-item')) {
        const filter = e.target.dataset.filter;
        if (filter) {
            // Close dropdowns
            document.querySelectorAll('.portfolio-menu').forEach(menu => menu.classList.remove('open'));
            
            // Navigate to gallery.html#filter
            window.location.href = 'gallery.html#' + filter.toLowerCase();
        }
    }
});



    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !nm.contains(e.target) && !mmb.contains(e.target)) {
            nm.classList.remove('o');
            mmb.classList.remove('o');
            menuOpen = false;
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            nm.classList.remove('o');
            mmb.classList.remove('o');
            menuOpen = false;
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll progress
window.addEventListener('scroll', () => {
    const sp = document.querySelector('.sc-p');
    const h = document.documentElement.scrollHeight - window.innerHeight;
    sp.style.transform = 'scaleX(' + (window.scrollY / h) + ')';
});

// Intersection Observer for reveals
const ro = new IntersectionObserver((es) => {
    es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('v');
            ro.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.ru, .rl, .rr, .rs').forEach(el => ro.observe(el));

// Testimonials carousel
const tds = document.querySelectorAll('.tdot');
const tcs = document.querySelectorAll('.tcard');
let ti = 0;

function showT(i) {
    tcs.forEach((c, j) => { c.classList.toggle('a', j === i); });
    tds.forEach((d, j) => { d.classList.toggle('a', j === i); });
    ti = i;
}

tds.forEach((d, i) => d.addEventListener('click', () => showT(i)));

// Arrow buttons navigation
const tPrev = document.querySelector('.t-prev');
const tNext = document.querySelector('.t-next');
if (tPrev) tPrev.addEventListener('click', () => showT((ti - 1 + tcs.length) % tcs.length));
if (tNext) tNext.addEventListener('click', () => showT((ti + 1) % tcs.length));
setInterval(() => showT((ti + 1) % tcs.length), 5000);
showT(0);

// Gallery lightbox
document.querySelectorAll('.gi[data-img]').forEach(item => {
    item.addEventListener('click', () => {
        const src = item.dataset.img;
        const lb = document.createElement('div');
        lb.className = 'lb';
        lb.innerHTML = '<div class="lbc"><img src="' + src + '" alt="Gallery"><button class="lbx">&times;</button></div>';
        document.body.appendChild(lb);
        
        lb.addEventListener('click', e => {
            if (e.target === lb || e.target.classList.contains('lbx')) {
                lb.remove();
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') lb.remove();
        });
    });
});

// Contact form
const cf = document.getElementById('cf');
const smsg = document.getElementById('sm');
if (cf) {
    cf.addEventListener('submit', (e) => {
        e.preventDefault();
        cf.style.display = 'none';
        smsg.style.display = 'block';
        smsg.style.opacity = '0';
        gsap.to(smsg, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' });
    });
}

// Hero animations
if (document.querySelector('.hr')) {
    gsap.from('.hr h1', { duration: 1.2, y: 80, opacity: 0, ease: 'power3.out', delay: 0.3 });
    gsap.from('.hsub', { duration: 1.2, y: 60, opacity: 0, ease: 'power3.out', delay: 0.6 });
    gsap.from('.hc', { duration: 1, y: 40, opacity: 0, ease: 'power3.out', delay: 0.9 });
}

// Animated number counters
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.textContent.includes('%') ? '%' : (el.textContent.includes('+') ? '+' : '');
            const duration = 2000;
            const start = performance.now();
            
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(ease * target);
                el.textContent = current + suffix;
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target + suffix;
            }
            
            requestAnimationFrame(update);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.sn[data-target]').forEach(el => countObserver.observe(el));

// Hero parallax for backgrounds
if (document.querySelector('.hr-bg2')) {
    gsap.to('.hr-bg2', {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hr",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Video visibility observer (pause off-screen videos)
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) video.play();
        else video.pause();
    });
}, { threshold: 0.1 });

document.querySelectorAll('video').forEach(v => videoObserver.observe(v));


// Active link indicator on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.sec');
    const navLinks = document.querySelectorAll('.nl2');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class logic here if needed
        }
    });
});

// Active link indicator on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.sec');
    const navLinks = document.querySelectorAll('.nl2');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class logic here if needed
        }
    });
});});

function updateCounter() {
    const pc = document.getElementById('plc');
    let c = 0;
    const iv = setInterval(() => {
        c += Math.floor(Math.random() * 8) + 1;
        if (c >= 100) { c = 100; clearInterval(iv); }
        if (pc) pc.textContent = c + '%';
    }, 150);
}

// Enhanced Navbar with scroll detection
const nav = document.getElementById('nav');
let lastScrollY = 0;
let ticking = false;

function updateNavbar() {
    if (window.scrollY > 50) {
        nav.classList.add('s');
    } else {
        nav.classList.remove('s');
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// Mobile menu with smooth animations
const mmb = document.getElementById('mmb');
const nm = document.getElementById('nm');
let menuOpen = false;

if (mmb && nm) {
    mmb.addEventListener('click', () => {
        menuOpen = !menuOpen;
        nm.classList.toggle('o');
        mmb.classList.toggle('o');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    });

    // Portfolio dropdown toggle
    document.querySelectorAll('.portfolio-link').forEach(btn => {
        const dropdown = btn.parentElement.querySelector('.portfolio-menu');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        document.querySelectorAll('.portfolio-dropdown').forEach(dd => {
            if (!dd.contains(e.target)) {
                dd.querySelector('.portfolio-menu').classList.remove('open');
            }
        });
    });



// Hash-based gallery section navigation & filtering
function applyHashFilter() {
    if (window.location.pathname.includes('gallery.html')) {
        const hash = window.location.hash.slice(1).toLowerCase();
        if (hash) {
            const sections = document.querySelectorAll('.country-section');
            const countryMap = {
                'turkey': 'turkey',
                'egypt': 'egypt',
                'morocco': 'morocco',
                'portugal': 'portugal',
                'northampton': 'northampton',
                'uk': 'northampton'
            };
            const targetKey = countryMap[hash] || hash;
            

            // Show ALL sections if "all", else show target only
            sections.forEach(section => {
                if (hash === 'all') {
                    section.style.display = 'block';
                } else if (section.dataset.country && section.dataset.country.toLowerCase().includes(targetKey)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            
            // Scroll target to middle
            const targetSection = Array.from(sections).find(section => 
                section.dataset.country && section.dataset.country.toLowerCase().includes(targetKey)
            );
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }
    }
}

// Apply on load and hashchange
window.addEventListener('load', applyHashFilter);
window.addEventListener('hashchange', applyHashFilter);

// Country buttons + dropdown - Always go to gallery.html#country
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('country-btn') || e.target.classList.contains('portfolio-item')) {
        const filter = e.target.dataset.filter;
        if (filter) {
            // Close dropdowns
            document.querySelectorAll('.portfolio-menu').forEach(menu => menu.classList.remove('open'));
            
            // Navigate to gallery.html#filter
            window.location.href = 'gallery.html#' + filter.toLowerCase();
        }
    }
});



    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuOpen && !nm.contains(e.target) && !mmb.contains(e.target)) {
            nm.classList.remove('o');
            mmb.classList.remove('o');
            menuOpen = false;
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOpen) {
            nm.classList.remove('o');
            mmb.classList.remove('o');
            menuOpen = false;
            document.body.style.overflow = 'auto';
        }
    });
}

// Scroll progress
window.addEventListener('scroll', () => {
    const sp = document.querySelector('.sc-p');
    const h = document.documentElement.scrollHeight - window.innerHeight;
    sp.style.transform = 'scaleX(' + (window.scrollY / h) + ')';
});

// Intersection Observer for reveals
const ro = new IntersectionObserver((es) => {
    es.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('v');
            ro.unobserve(e.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.ru, .rl, .rr, .rs').forEach(el => ro.observe(el));

// Testimonials carousel
const tds = document.querySelectorAll('.tdot');
const tcs = document.querySelectorAll('.tcard');
let ti = 0;

function showT(i) {
    tcs.forEach((c, j) => { c.classList.toggle('a', j === i); });
    tds.forEach((d, j) => { d.classList.toggle('a', j === i); });
    ti = i;
}

tds.forEach((d, i) => d.addEventListener('click', () => showT(i)));

// Arrow buttons navigation
const tPrev = document.querySelector('.t-prev');
const tNext = document.querySelector('.t-next');
if (tPrev) tPrev.addEventListener('click', () => showT((ti - 1 + tcs.length) % tcs.length));
if (tNext) tNext.addEventListener('click', () => showT((ti + 1) % tcs.length));
setInterval(() => showT((ti + 1) % tcs.length), 5000);
showT(0);

// Gallery lightbox
document.querySelectorAll('.gi[data-img]').forEach(item => {
    item.addEventListener('click', () => {
        const src = item.dataset.img;
        const lb = document.createElement('div');
        lb.className = 'lb';
        lb.innerHTML = '<div class="lbc"><img src="' + src + '" alt="Gallery"><button class="lbx">&times;</button></div>';
        document.body.appendChild(lb);
        
        lb.addEventListener('click', e => {
            if (e.target === lb || e.target.classList.contains('lbx')) {
                lb.remove();
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') lb.remove();
        });
    });
});

// Contact form
const cf = document.getElementById('cf');
const smsg = document.getElementById('sm');
if (cf) {
    cf.addEventListener('submit', (e) => {
        e.preventDefault();
        cf.style.display = 'none';
        smsg.style.display = 'block';
        smsg.style.opacity = '0';
        gsap.to(smsg, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' });
    });
}

// Hero animations
if (document.querySelector('.hr')) {
    gsap.from('.hr h1', { duration: 1.2, y: 80, opacity: 0, ease: 'power3.out', delay: 0.3 });
    gsap.from('.hsub', { duration: 1.2, y: 60, opacity: 0, ease: 'power3.out', delay: 0.6 });
    gsap.from('.hc', { duration: 1, y: 40, opacity: 0, ease: 'power3.out', delay: 0.9 });
}

// Animated number counters
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.textContent.includes('%') ? '%' : (el.textContent.includes('+') ? '+' : '');
            const duration = 2000;
            const start = performance.now();
            
            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(ease * target);
                el.textContent = current + suffix;
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = target + suffix;
            }
            
            requestAnimationFrame(update);
            countObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.sn[data-target]').forEach(el => countObserver.observe(el));

// Video visibility observer (pause off-screen videos)
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) video.play();
        else video.pause();
    });
}, { threshold: 0.1 });

document.querySelectorAll('video').forEach(v => videoObserver.observe(v));

// Active link indicator on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.sec');
    const navLinks = document.querySelectorAll('.nl2');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class logic here if needed
        }
    });
});
