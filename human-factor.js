// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add gradient definitions to SVG charts
document.querySelectorAll('.achievement-chart').forEach(chart => {
    const svg = chart.querySelector('svg');
    if (svg && !svg.querySelector('defs')) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#ff6b6b');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#4ecdc4');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);
    }
});

// Animate charts on scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const animateChart = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chart = entry.target.querySelector('.chart-progress');
            if (chart) {
                const currentOffset = chart.style.strokeDashoffset;
                chart.style.strokeDashoffset = currentOffset;
                chart.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            observer.unobserve(entry.target);
        }
    });
};

const chartObserver = new IntersectionObserver(animateChart, observerOptions);

document.querySelectorAll('.achievement-card').forEach(card => {
    chartObserver.observe(card);
});

// Navbar background on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.borderBottomColor = 'rgba(42, 42, 42, 0.8)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.8)';
        nav.style.borderBottomColor = 'rgba(42, 42, 42, 0.5)';
    }
    
    lastScroll = currentScroll;
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Add fade-in animation to elements on scroll
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe service cards, methodology cards, and stat boxes
document.querySelectorAll('.service-card, .methodology-card, .stat-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    fadeInObserver.observe(el);
});

// Animate stat bars on scroll
const statBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.stat-bar-fill');
            if (bar) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
            statBarObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.stat-item').forEach(item => {
    statBarObserver.observe(item);
});

// Animate divider on scroll
const dividerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const lines = entry.target.querySelectorAll('.divider-line');
            lines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.transform = 'scaleX(1)';
                }, index * 200);
            });
            dividerObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

document.querySelectorAll('.section-divider').forEach(divider => {
    const lines = divider.querySelectorAll('.divider-line');
    lines.forEach(line => {
        line.style.transform = 'scaleX(0)';
        line.style.transformOrigin = 'center';
        line.style.transition = 'transform 0.6s ease';
    });
    dividerObserver.observe(divider);
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.hero-shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translate(${scrolled * speed * 0.1}px, ${scrolled * speed * 0.05}px)`;
    });
});

// Add stagger animation to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// Add stagger animation to methodology cards
document.querySelectorAll('.methodology-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});
