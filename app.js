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
        MOUSE_TRAIL_INTERVAL: 50,
        LOADER_DISPLAY_DURATION: 2500,
        LOADER_FADE_DURATION: 600,
        YEAR_THRESHOLD: 2000,
        YEAR_COUNTER_DURATION: 800,
        REVEAL_STAGGER_DELAY: 0.25,
        SCROLL_INDICATOR_TOP_THRESHOLD: 0,
        SCROLL_INDICATOR_BOTTOM_OFFSET: 200
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
                navbar.style.boxShadow = '0 4px 20px rgba(220, 20, 60, 0.3)';
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            }
        });
    };
    
    // Parallax Hero Effect
    const initParallaxEffect = () => {
        const heroContent = document.querySelector('.hero-content');
        const heroBg = document.querySelector('.hero-bg');
        let heroContentReady = false;

        // Wait for the hero content slide-in animation to finish before enabling parallax on it
        if (heroContent) {
            heroContent.addEventListener('animationend', () => {
                heroContentReady = true;
            }, { once: true });
        }
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            
            if (scrollPosition < viewportHeight) {
                if (heroContent && heroContentReady) {
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
                submitButton.style.background = 'var(--primary-red)';
                submitButton.style.color = 'var(--text-primary)';
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
            const celebrationColors = ['#DC143C', '#FF6B6B', '#ffffff'];
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
        
        const elementsToAnimate = document.querySelectorAll('.team-card, .news-card, .partner-logo');
        
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
                    
                    // Skip animation for non-numeric values
                    if (isNaN(targetNumber)) {
                        statObserver.unobserve(entry.target);
                        return;
                    }
                    
                    statElement.textContent = '0' + (hasPlusSign ? '+' : '');
                    
                    setTimeout(() => {
                        animateNumber(statElement, targetNumber, hasPlusSign);
                    }, 300);
                    
                    statObserver.unobserve(entry.target);
                }
            });
        }
        
        function animateNumber(element, target, showPlus, duration = 2000) {
            // Use faster duration for large year-like numbers (e.g. 2025)
            if (target >= CONFIG.YEAR_THRESHOLD && !showPlus) {
                duration = CONFIG.YEAR_COUNTER_DURATION;
            }
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
                background: radial-gradient(circle, rgba(220, 20, 60, 0.8), rgba(139, 0, 0, 0.4));
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: opacity 0.6s ease, transform 0.6s ease;
                box-shadow: 0 0 10px rgba(220, 20, 60, 0.5);
                left: ${x}px;
                top: ${y}px;
            `;
            return particle;
        }
    };
    
    // Site Loading Animation — plays once per browser session on home page
    const initSiteLoader = () => {
        const loader = document.getElementById('siteLoader');
        if (!loader) return;

        // Check if we're on the home page (index.html or root)
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname === '/index.html' ||
                          window.location.pathname.endsWith('/index.html');
        
        // Use sessionStorage so the loader plays once per browser session
        const hasSeenLoader = sessionStorage.getItem('rosoLoaderShown') === 'true';

        // Only show loader on home page and if not shown this session
        if (isHomePage && !hasSeenLoader) {
            const heroContent = document.querySelector('.hero-content');
            const heroVideo = document.querySelector('.hero-bg-video');

            // Pause video during loader, resume after
            if (heroVideo) {
                heroVideo.pause();
            }

            window.addEventListener('load', () => {
                setTimeout(() => {
                    loader.classList.add('loader-hidden');
                    setTimeout(() => loader.remove(), CONFIG.LOADER_FADE_DURATION);
                    // Mark loader as shown for this session
                    sessionStorage.setItem('rosoLoaderShown', 'true');

                    // Start video playback after loader finishes
                    if (heroVideo) {
                        heroVideo.currentTime = 0;
                        heroVideo.play().catch(() => {});
                    }

                    // Show hero content after the video's "ROSO 2026" fades out
                    // (~6.5s after loader finishes to let the video intro play)
                    if (heroContent) {
                        setTimeout(() => {
                            heroContent.classList.add('hero-content-visible');
                        }, 6500);
                    }
                }, CONFIG.LOADER_DISPLAY_DURATION);
            });
        } else {
            // Hide loader immediately if not on home page or already shown
            loader.remove();
            // Show hero content immediately (no loader delay)
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.classList.add('hero-content-visible');
            }
        }
    };

    // Under Development Popup — shows 2 seconds after intro animation finishes (only on home page first visit per session)
    const initDevPopup = () => {
        const overlay = document.getElementById('devPopupOverlay');
        const closeBtn = document.getElementById('devPopupClose');
        if (!overlay || !closeBtn) return;

        // Check if we're on the home page
        const isHomePage = window.location.pathname === '/' || 
                          window.location.pathname === '/index.html' ||
                          window.location.pathname.endsWith('/index.html');
        
        // Use sessionStorage to match loader behavior
        const hasSeenLoader = sessionStorage.getItem('rosoLoaderShown') === 'true';

        // Only show popup on home page and if loader was just shown (first visit this session)
        if (isHomePage && !hasSeenLoader) {
            // Show popup 2s after hero content appears (loader + video intro + hero reveal)
            const popupDelay = CONFIG.LOADER_DISPLAY_DURATION + 6500 + 2000;

            window.addEventListener('load', () => {
                setTimeout(() => {
                    overlay.classList.add('popup-visible');
                }, popupDelay);
            });
        }

        const closePopup = () => {
            overlay.classList.remove('popup-visible');
        };

        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closePopup();
        });
    };

    // About Section Reveal Animation
    const initAboutReveal = () => {
        const revealElements = document.querySelectorAll('.about-reveal');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('about-reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        revealElements.forEach((el, i) => {
            el.style.transitionDelay = (i * CONFIG.REVEAL_STAGGER_DELAY) + 's';
            observer.observe(el);
        });
    };

    // Scroll Indicator (shows "KEEP SCROLLING" until near bottom)
    const initScrollIndicator = () => {
        const indicator = document.getElementById('scrollIndicator');
        if (!indicator) return;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollTop >= CONFIG.SCROLL_INDICATOR_TOP_THRESHOLD && scrollTop < docHeight - CONFIG.SCROLL_INDICATOR_BOTTOM_OFFSET) {
                indicator.classList.add('scroll-indicator-visible');
            } else {
                indicator.classList.remove('scroll-indicator-visible');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
    };

    // Video Fullscreen Overlay — watch hero video with sound
    const initVideoFullscreen = () => {
        const openBtn = document.getElementById('heroVideoFullscreenBtn');
        const overlay = document.getElementById('videoFullscreenOverlay');
        const video = document.getElementById('vfoVideo');
        const closeBtn = document.getElementById('vfoClose');
        const backBtn = document.getElementById('vfoBack');
        const skipBackBtn = document.getElementById('vfoSkipBack');
        const skipForwardBtn = document.getElementById('vfoSkipForward');
        const volumeSlider = document.getElementById('vfoVolume');
        if (!openBtn || !overlay || !video) return;

        const openVideo = () => {
            video.currentTime = 0;
            video.muted = false;
            if (volumeSlider) video.volume = volumeSlider.value;
            overlay.classList.add('vfo-visible');
            video.play();
        };

        const closeVideo = () => {
            overlay.classList.remove('vfo-visible');
            video.pause();
            video.muted = true;
        };

        openBtn.addEventListener('click', openVideo);
        if (closeBtn) closeBtn.addEventListener('click', closeVideo);
        if (backBtn) backBtn.addEventListener('click', () => { video.currentTime = 0; });
        if (skipBackBtn) skipBackBtn.addEventListener('click', () => { video.currentTime = Math.max(0, video.currentTime - 5); });
        if (skipForwardBtn) skipForwardBtn.addEventListener('click', () => { video.currentTime = Math.min(video.duration, video.currentTime + 5); });

        if (volumeSlider) {
            volumeSlider.addEventListener('input', () => {
                video.volume = volumeSlider.value;
            });
        }

        video.addEventListener('ended', closeVideo);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeVideo();
        });

        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('vfo-visible')) return;
            if (e.key === 'Escape') closeVideo();
            if (e.key === 'ArrowRight') video.currentTime = Math.min(video.duration, video.currentTime + 5);
            if (e.key === 'ArrowLeft') video.currentTime = Math.max(0, video.currentTime - 5);
        });
    };

    // Mobile Hamburger Menu
    const initMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (!hamburger || !mobileMenu || !overlay) return;

        const toggleMenu = () => {
            const isActive = mobileMenu.classList.contains('active');
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('menu-open', !isActive);
        };

        const closeMenu = () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        };

        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    };

    // Initialize all features
    const initializeApp = () => {
        initSiteLoader();
        initDevPopup();
        initSmoothNavigation();
        initNavbarScroll();
        initParallaxEffect();
        initNewsletterForm();
        initScrollAnimations();
        initStatCounters();
        init3DTiltCards();
        initMouseTrail();
        initAboutReveal();
        initScrollIndicator();
        initVideoFullscreen();
        initMobileMenu();
        
        console.log('%c🌹 ROSO Esports - Where Talent Blooms 🌹', 'color: #DC143C; font-size: 20px; font-weight: bold;');
        console.log('%cAwarding talent and determination with opportunities', 'color: #FF6B6B; font-size: 14px;');
    };
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
    
})();
