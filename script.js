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

// Newsletter form submission with animation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        const submitBtn = this.querySelector('button');
        
        // Show success feedback with animation
        const originalBtnText = submitBtn.textContent;
        submitBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            submitBtn.textContent = '✓ Subscribed!';
            submitBtn.style.background = 'var(--primary-green)';
            submitBtn.style.color = 'var(--primary-black)';
            submitBtn.style.transform = 'scale(1.05)';
            
            // Add confetti effect
            createConfetti(submitBtn);
        }, 100);
        
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
            submitBtn.style.transform = '';
        }, 3000);
    });
}

// Confetti effect for newsletter subscription
function createConfetti(element) {
    const colors = ['#DC143C', '#00ff41', '#ffffff'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = element.offsetLeft + element.offsetWidth / 2 + 'px';
        confetti.style.top = element.offsetTop + element.offsetHeight / 2 + 'px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / confettiCount;
        const velocity = 5 + Math.random() * 5;
        const tx = Math.cos(angle) * velocity * 30;
        const ty = Math.sin(angle) * velocity * 30 - 50;
        
        confetti.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => confetti.remove();
    }
}

// Navbar scroll effect with parallax - combined into single listener
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

// Throttle scroll events for better performance
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            // Navbar effects
            if (currentScroll <= 0) {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.boxShadow = '0 4px 20px rgba(220, 20, 60, 0.3)';
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            }
            
            // Parallax effect for hero section
            const heroContent = document.querySelector('.hero-content');
            const heroBg = document.querySelector('.hero-bg');
            
            if (heroContent && currentScroll < window.innerHeight) {
                heroContent.style.transform = `translateY(${currentScroll * 0.5}px)`;
                heroContent.style.opacity = 1 - (currentScroll / window.innerHeight) * 1.5;
            }
            
            if (heroBg && currentScroll < window.innerHeight) {
                heroBg.style.transform = `translateY(${currentScroll * 0.3}px)`;
            }
            
            lastScroll = currentScroll;
            ticking = false;
        });
        
        ticking = true;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Intersection Observer for fade-in animations with stagger
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation with staggered delays
document.querySelectorAll('.team-card, .news-card, .stat-item, .partner-logo').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Animated counter for stats
const animateCounter = (element, target, hasPlus, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, 16);
};

// Observe stat numbers for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const text = statNumber.textContent;
            const hasPlus = text.includes('+');
            const number = parseInt(text.replace('+', ''));
            
            statNumber.textContent = '0' + (hasPlus ? '+' : '');
            setTimeout(() => {
                animateCounter(statNumber, number, hasPlus);
            }, 300);
            
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// Mouse parallax effect on team cards
document.querySelectorAll('.team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add floating animation to navigation items
document.querySelectorAll('.nav-menu li').forEach((item, index) => {
    item.style.animation = `float 3s ease-in-out ${index * 0.1}s infinite`;
});

// Create CSS for float animation dynamically
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-3px); }
    }
`;
document.head.appendChild(floatStyle);

// Cursor trail effect with throttling
const TRAIL_FADE_DURATION = 600;
let lastTrailTime = 0;
const trailThrottle = 50; // ms between trail particles

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < trailThrottle) return;
    lastTrailTime = now;
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 10);
    
    setTimeout(() => trail.remove(), TRAIL_FADE_DURATION);
});

// Add cursor trail styles
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    .cursor-trail {
        position: absolute;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, rgba(220, 20, 60, 0.8), rgba(0, 255, 65, 0.4));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.6s ease, transform 0.6s ease;
        box-shadow: 0 0 10px rgba(220, 20, 60, 0.5);
    }
`;
document.head.appendChild(trailStyle);

// Console message
console.log('%c🌹 ROSO Esports - Where Talent Blooms 🌹', 'color: #DC143C; font-size: 20px; font-weight: bold;');
console.log('%cCombining STEM Excellence with Competitive Gaming', 'color: #00ff41; font-size: 14px;');
