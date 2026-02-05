// ROSO Esports - NRG-Inspired Interactive Features
// Custom implementation with unique patterns

(function() {
    'use strict';
    
    // Configuration constants
    const CONFIG = {
        PARTICLE_MIN_VELOCITY: 5,
        PARTICLE_SPREAD_MULTIPLIER: 30,
        PARTICLE_UPWARD_BIAS: -50,
        CARD_TILT_SENSITIVITY: 20,
        MOUSE_TRAIL_INTERVAL: 50
    };
    
    // Smooth Navigation System
    const initSmoothNavigation = () => {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavClick);
        });
        
        function handleNavClick(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop;
                window.scrollTo({
                    top: offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    };
    
    // Enhanced Navbar Scroll Behavior
    const initNavbarScroll = () => {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const currentScrollPos = window.pageYOffset;
            
            if (currentScrollPos <= 0) {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.boxShadow = '0 4px 20px rgba(174, 129, 46, 0.3)';
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            }
        });
    };
    
    // Parallax Hero Effect
    const initParallaxEffect = () => {
        const heroContent = document.querySelector('.hero-content');
        const heroBg = document.querySelector('.hero-bg');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            
            if (scrollPosition < viewportHeight) {
                if (heroContent) {
                    const contentOffset = scrollPosition * 0.5;
                    const contentOpacity = Math.max(0, 1 - (scrollPosition / viewportHeight) * 1.5);
                    heroContent.style.transform = `translateY(${contentOffset}px)`;
                    heroContent.style.opacity = contentOpacity;
                }
                
                if (heroBg) {
                    const bgOffset = scrollPosition * 0.3;
                    heroBg.style.transform = `translateY(${bgOffset}px)`;
                }
            }
        });
    };
    
    // Newsletter Form Handler
    const initNewsletterForm = () => {
        const form = document.querySelector('.newsletter-form');
        
        if (!form) return;
        
        form.addEventListener('submit', handleFormSubmit);
        
        function handleFormSubmit(event) {
            event.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button');
            
            if (!emailInput || !submitButton) return;
            
            const originalButtonText = submitButton.textContent;
            
            // Visual feedback
            submitButton.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                submitButton.textContent = '✓ Subscribed!';
                submitButton.style.background = 'var(--nrg-orange-vibrant)';
                submitButton.style.color = 'var(--surface-darkest)';
                submitButton.style.transform = 'scale(1.05)';
                
                // Celebration effect
                triggerCelebration(submitButton);
            }, 100);
            
            this.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitButton.textContent = originalButtonText;
                submitButton.style.background = '';
                submitButton.style.color = '';
                submitButton.style.transform = '';
            }, 3000);
        }
        
        function triggerCelebration(element) {
            const celebrationColors = ['#AE812E', '#FF6B35', '#ffffff'];
            const particleCount = 30;
            const elementRect = element.getBoundingClientRect();
            const centerX = elementRect.left + elementRect.width / 2;
            const centerY = elementRect.top + elementRect.height / 2;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = createParticle();
                particle.style.backgroundColor = celebrationColors[i % celebrationColors.length];
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                document.body.appendChild(particle);
                
                animateParticle(particle, i, particleCount);
            }
        }
        
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            return particle;
        }
        
        function animateParticle(particle, index, total) {
            const angleStep = (Math.PI * 2 * index) / total;
            const velocity = CONFIG.PARTICLE_MIN_VELOCITY + Math.random() * 5;
            const translateX = Math.cos(angleStep) * velocity * CONFIG.PARTICLE_SPREAD_MULTIPLIER;
            const translateY = Math.sin(angleStep) * velocity * CONFIG.PARTICLE_SPREAD_MULTIPLIER + CONFIG.PARTICLE_UPWARD_BIAS;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${translateX}px, ${translateY}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            }).onfinish = () => particle.remove();
        }
    };
    
    // Intersection Observer for Fade-In Animations
    const initScrollAnimations = () => {
        const observerConfig = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const animationObserver = new IntersectionObserver(handleIntersection, observerConfig);
        
        const elementsToAnimate = document.querySelectorAll('.team-card, .news-card, .stat-item, .partner-logo');
        
        elementsToAnimate.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.dataset.animationDelay = index;
            animationObserver.observe(element);
        });
        
        function handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delayIndex = parseInt(entry.target.dataset.animationDelay) || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delayIndex * 100);
                    animationObserver.unobserve(entry.target);
                }
            });
        }
    };
    
    // Animated Counter for Statistics
    const initStatCounters = () => {
        const statObserverConfig = {
            threshold: 0.5
        };
        
        const statObserver = new IntersectionObserver(handleStatIntersection, statObserverConfig);
        
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => statObserver.observe(stat));
        
        function handleStatIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const originalText = statElement.textContent;
                    const hasPlusSign = originalText.includes('+');
                    const targetNumber = parseInt(originalText.replace('+', ''));
                    
                    statElement.textContent = '0' + (hasPlusSign ? '+' : '');
                    
                    setTimeout(() => {
                        animateNumber(statElement, targetNumber, hasPlusSign);
                    }, 300);
                    
                    statObserver.unobserve(entry.target);
                }
            });
        }
        
        function animateNumber(element, target, showPlus, duration = 2000) {
            const startValue = 0;
            const incrementStep = target / (duration / 16);
            let currentValue = startValue;
            
            const counterInterval = setInterval(() => {
                currentValue += incrementStep;
                if (currentValue >= target) {
                    element.textContent = target + (showPlus ? '+' : '');
                    clearInterval(counterInterval);
                } else {
                    element.textContent = Math.floor(currentValue) + (showPlus ? '+' : '');
                }
            }, 16);
        }
    };
    
    // 3D Tilt Effect for Team Cards
    const init3DTiltCards = () => {
        const teamCards = document.querySelectorAll('.team-card');
        
        teamCards.forEach(card => {
            card.addEventListener('mousemove', handleCardMouseMove);
            card.addEventListener('mouseleave', handleCardMouseLeave);
        });
        
        function handleCardMouseMove(event) {
            const card = this;
            const cardRect = card.getBoundingClientRect();
            const mouseX = event.clientX - cardRect.left;
            const mouseY = event.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateXValue = (mouseY - centerY) / CONFIG.CARD_TILT_SENSITIVITY;
            const rotateYValue = (centerX - mouseX) / CONFIG.CARD_TILT_SENSITIVITY;
            
            card.style.transform = `translateY(-15px) rotateX(${rotateXValue}deg) rotateY(${rotateYValue}deg)`;
        }
        
        function handleCardMouseLeave() {
            this.style.transform = '';
        }
    };
    
    // Mouse Trail Effect
    const initMouseTrail = () => {
        let lastTrailTimestamp = 0;
        
        document.addEventListener('mousemove', handleMouseMove);
        
        function handleMouseMove(event) {
            const currentTime = Date.now();
            if (currentTime - lastTrailTimestamp < CONFIG.MOUSE_TRAIL_INTERVAL) return;
            lastTrailTimestamp = currentTime;
            
            const trailParticle = createTrailParticle(event.pageX, event.pageY);
            document.body.appendChild(trailParticle);
            
            setTimeout(() => {
                trailParticle.style.opacity = '0';
                trailParticle.style.transform = 'scale(0)';
            }, 10);
            
            setTimeout(() => trailParticle.remove(), 600);
        }
        
        function createTrailParticle(x, y) {
            const particle = document.createElement('div');
            particle.className = 'mouse-trail-particle';
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(174, 129, 46, 0.8), rgba(255, 107, 53, 0.4));
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: opacity 0.6s ease, transform 0.6s ease;
                box-shadow: 0 0 10px rgba(174, 129, 46, 0.5);
                left: ${x}px;
                top: ${y}px;
            `;
            return particle;
        }
    };
    
    // Initialize all features
    const initializeApp = () => {
        initSmoothNavigation();
        initNavbarScroll();
        initParallaxEffect();
        initNewsletterForm();
        initScrollAnimations();
        initStatCounters();
        init3DTiltCards();
        initMouseTrail();
        
        console.log('%c🌹 ROSO Esports - Where Talent Blooms 🌹', 'color: #AE812E; font-size: 20px; font-weight: bold;');
        console.log('%cCombining STEM Excellence with Competitive Gaming', 'color: #FF6B35; font-size: 14px;');
    };
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
    
})();
