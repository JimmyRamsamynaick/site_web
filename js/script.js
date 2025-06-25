// Variables globales
let particles = [];
let animationId;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

// Fonction principale d'initialisation
function initializePortfolio() {
    initParticles();
    initNavigation();
    initScrollAnimations();
    initProjectFilters();
    initContactForm();
    initCounterAnimations();
    initSmoothScrolling();
    initGlitchEffect();
    initThemeEffects();
}

// === SYSTÈME DE PARTICULES ===
function initParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    if (!bgAnimation) return;

    // Créer les particules initiales
    createParticles();
    
    // Animation continue
    animateParticles();
}

function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    const particleCount = window.innerWidth > 768 ? 50 : 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const bgAnimation = document.getElementById('bgAnimation');
    if (!bgAnimation) return;

    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Position et timing aléatoires
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
    
    // Couleurs aléatoires
    const colors = ['#00ff88', '#ff0080', '#0080ff'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.position = 'absolute';
    particle.style.top = '100%';
    particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
    particle.style.animation = `particleFloat ${particle.style.animationDuration} ${particle.style.animationDelay} infinite linear`;
    
    bgAnimation.appendChild(particle);
    particles.push(particle);
    
    // Supprimer la particule après animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
            particles = particles.filter(p => p !== particle);
        }
    }, parseFloat(particle.style.animationDuration) * 1000 + parseFloat(particle.style.animationDelay) * 1000);
}

function animateParticles() {
    // Créer une nouvelle particule périodiquement
    setInterval(() => {
        if (particles.length < 50) {
            createParticle();
        }
    }, 200);
}

// === NAVIGATION ===
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const burgerMenu = document.getElementById('burgerMenu');
    const navLinksContainer = document.querySelector('.nav-links');

    // Effet de scroll sur la navbar
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100));

    // Menu burger pour mobile
    if (burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            document.body.style.overflow = navLinksContainer.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (burgerMenu) {
                burgerMenu.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Mise à jour du lien actif
    updateActiveNavLink();
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    
    let currentSection = '';
    const scrollPos = window.scrollY + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
        }
    });
}

// === ANIMATIONS AU SCROLL ===
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec classes d'animation
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Ajouter les classes d'animation aux éléments
    addAnimationClasses();
}

function addAnimationClasses() {
    // Cartes de compétences
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Cartes de projets
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Cartes sociales
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach((card, index) => {
        card.classList.add(index % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
        card.style.animationDelay = `${index * 0.3}s`;
    });

    // Cartes de statistiques
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.animationDelay = `${index * 0.15}s`;
    });
}

// === FILTRES DE PROJETS ===
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Mise à jour du bouton actif
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filtrage des projets avec animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
        });
    });
}

// === FORMULAIRE DE CONTACT ===
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleFormSubmit);
    
    // Animation des labels
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Vérifier si les champs ont déjà du contenu
        if (input.value.trim()) {
            input.parentElement.classList.add('focused');
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Validation simple
    if (!name || !email || !message) {
        showNotification('Veuillez remplir tous les champs.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Veuillez entrer un email valide.', 'error');
        return;
    }
    
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Animation de chargement
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    submitBtn.disabled = true;
    
    // Simulation d'envoi (remplacer par vraie logique d'envoi)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
        submitBtn.style.background = '#00ff88';
        
        // Réinitialiser le formulaire
        e.target.reset();
        
        // Supprimer les classes focused
        const formGroups = e.target.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('focused'));
        
        // Remettre le bouton normal
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
        // Notification de succès
        showNotification('Message envoyé avec succès ! 🎮', 'success');
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// === ANIMATIONS DE COMPTEURS ===
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 secondes
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        step++;
        current = Math.min(current + increment, target);
        element.textContent = Math.floor(current);
        
        if (step >= steps || current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, duration / steps);
}

// === SCROLL FLUIDE ===
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// === EFFET GLITCH ===
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // Effet glitch aléatoire
        setInterval(() => {
            element.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff0080,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff88,
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #0080ff
            `;
            
            setTimeout(() => {
                element.style.textShadow = 'none';
            }, 100);
        }, 3000 + Math.random() * 2000);

        // Effet de tremblement
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch 0.3s ease-in-out';
        });

        element.addEventListener('animationend', () => {
            element.style.animation = '';
        });
    });
}

// === EFFETS THÉMATIQUES ===
function initThemeEffects() {
    // Effet de hover sur les boutons CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px) scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Effet de pulse sur les éléments flottants
    const floatingElements = document.querySelectorAll('.floating-controller, .floating-code, .floating-bolt');
    floatingElements.forEach((element, index) => {
        element.style.animation = `float ${3 + index}s ease-in-out infinite`;
    });

    // Effet de rotation sur les icônes de projet
    const projectIcons = document.querySelectorAll('.project-placeholder i');
    projectIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.5s ease';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotate(0deg)';
        });
    });
}

// === NOTIFICATIONS ===
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = type === 'success' ? 'check-circle' : 
                 type === 'error' ? 'exclamation-circle' : 'info-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Styles pour la notification
    const colors = {
        success: '#00ff88',
        error: '#ff0080',
        info: '#0080ff'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Style du bouton de fermeture
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Suppression automatique
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// === EASTER EGG ===
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Effet rainbow sur tout le portfolio
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Ajouter l'animation rainbow au CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        @keyframes glitch {
            0%, 100% { transform: translate(0); }
            10% { transform: translate(-2px, -2px); }
            20% { transform: translate(2px, 2px); }
            30% { transform: translate(-2px, 2px); }
            40% { transform: translate(2px, -2px); }
            50% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            70% { transform: translate(-2px, 2px); }
            80% { transform: translate(2px, -2px); }
            90% { transform: translate(-2px, -2px); }
        }
        @keyframes particleFloat {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    showNotification('🎮 Code Konami activé ! Mode Gaming Ultimate ! 🎮', 'success');
    
    // Créer des particules bonus
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createParticle(), i * 100);
    }
    
    // Supprimer l'effet après 10 secondes
    setTimeout(() => {
        document.body.style.animation = '';
        if (document.head.contains(style)) {
            document.head.removeChild(style);
        }
    }, 10000);
}

// === GESTION DES ERREURS ===
window.addEventListener('error', (e) => {
    console.error('Erreur détectée:', e.error);
    showNotification('Une erreur s\'est produite. Veuillez rafraîchir la page.', 'error');
});

// === PERFORMANCE ===
// Throttle pour les événements de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce pour les événements de redimensionnement
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// === OPTIMISATIONS MOBILE ===
if (window.innerWidth <= 768) {
    // Réduire les particules sur mobile
    particles = particles.slice(0, 15);
    
    // Désactiver certaines animations sur mobile
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        document.body.classList.add('reduce-motion');
    }
}

// === GESTION DU REDIMENSIONNEMENT ===
window.addEventListener('resize', debounce(() => {
    // Recalculer les particules
    if (window.innerWidth <= 768 && particles.length > 25) {
        particles.slice(25).forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        particles = particles.slice(0, 25);
    } else if (window.innerWidth > 768 && particles.length < 50) {
        const diff = 50 - particles.length;
        for (let i = 0; i < diff; i++) {
            createParticle();
        }
    }
    
    // Recalculer les positions de navigation
    updateActiveNavLink();
}, 250));

// === PRÉCHARGEMENT ===
document.addEventListener('DOMContentLoaded', () => {
    // Précharger les icônes Font Awesome
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
    
    // Précharger les icônes brands
    const brandLink = document.createElement('link');
    brandLink.rel = 'preload';
    brandLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2';
    brandLink.as = 'font';
    brandLink.type = 'font/woff2';
    brandLink.crossOrigin = 'anonymous';
    document.head.appendChild(brandLink);
});

// === ACCESSIBILITÉ ===
// Gestion du focus au clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Gestion de l'accessibilité pour les animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}

// === UTILITAIRES ===
// Fonction pour générer des couleurs aléatoires
function getRandomColor() {
    const colors = ['#00ff88', '#ff0080', '#0080ff', '#ffff00', '#ff8000'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Fonction pour détecter si l'utilisateur est sur mobile
function isMobile() {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// === ANALYTICS (optionnel) ===
// Tracking des interactions utilisateur
function trackInteraction(action, element) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'User Interaction',
            event_label: element
        });
    }
}

// Ajouter le tracking aux éléments interactifs
document.addEventListener('click', (e) => {
    if (e.target.matches('.cta-button')) {
        trackInteraction('cta_click', e.target.textContent.trim());
    }
    if (e.target.matches('.social-card')) {
        trackInteraction('social_click', e.target.querySelector('h3').textContent);
    }
});

// === FINALISATION ===
// S'assurer que tout est initialisé correctement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}