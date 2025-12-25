// Disable scroll restoration and scroll to top immediately
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Initialize theme
    initializeTheme();

    // Animate status bars
    animateStatusBars();

    // Animate skill progress bars
    animateSkillBars();

    // Animate quest progress bars
    animateQuestBars();

    // Add stat item hover effects with sound-like feedback
    addStatInteractions();

    // Add typing effect to character name (optional)
    // typingEffect();

    // Add particle effects on hover (optional enhancement)
    addParticleEffects();
});

// Theme Toggle Functionality
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');

    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';

    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '🌙';
    }

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        // Update icon and save preference
        if (document.body.classList.contains('light-mode')) {
            themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Animate the HP, MP, and XP bars
function animateStatusBars() {
    const bars = document.querySelectorAll('.bar-fill');

    bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-value');

        // Start from 0 and animate to target
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, 300);
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-progress');

        // Stagger the animations
        setTimeout(() => {
            bar.style.width = targetWidth + '%';
        }, 500 + (index * 100));
    });
}

// Animate quest progress bars
function animateQuestBars() {
    const questBars = document.querySelectorAll('.quest-progress-bar');

    questBars.forEach((bar, index) => {
        const targetWidth = bar.getAttribute('data-progress');

        if (targetWidth) {
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
            }, 700 + (index * 150));
        }
    });
}

// Add interactive feedback to stat items
function addStatInteractions() {
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add a pulse animation on click
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = 'pulse 0.5s ease-in-out';
            }, 10);

            // Remove animation after it completes
            setTimeout(() => {
                item.style.animation = '';
            }, 510);
        });
    });
}

// Add particle effects on hover for equipment items
function addParticleEffects() {
    const equipmentItems = document.querySelectorAll('.equipment-item');

    equipmentItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            createParticles(e.currentTarget);
        });
    });
}

// Create floating particle effect
function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 5;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-gold);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            opacity: 1;
            transition: all 1s ease-out;
        `;

        document.body.appendChild(particle);

        // Animate particle
        setTimeout(() => {
            particle.style.transform = `translateY(-${50 + Math.random() * 50}px)`;
            particle.style.opacity = '0';
        }, 10);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

// Optional: Typing effect for character name
function typingEffect() {
    const nameElement = document.querySelector('.character-name');
    const text = nameElement.textContent;
    nameElement.textContent = '';

    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            nameElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Add level up animation effect (can be triggered on scroll or interaction)
function levelUpEffect() {
    const levelElement = document.querySelector('.level');

    levelElement.style.animation = 'none';
    setTimeout(() => {
        levelElement.style.animation = 'pulse 0.5s ease-in-out 3';
    }, 10);
}

// Add achievement unlock animation
function unlockAchievement(achievementElement) {
    achievementElement.classList.remove('locked');
    achievementElement.classList.add('unlocked');

    // Add a flash effect
    achievementElement.style.animation = 'flash 0.5s ease-in-out 2';

    setTimeout(() => {
        achievementElement.style.animation = '';
    }, 1000);
}

// Add flash animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes flash {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; transform: scale(1.05); }
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Add scroll reveal animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.stats-section, .skills-section, .equipment-section, .achievements-section, .quests-section, .menu-section').forEach(section => {
    section.style.opacity = '1';
    observer.observe(section);
});

// Add stat increment animation on hover
document.querySelectorAll('.stat-value').forEach(statValue => {
    const originalValue = parseInt(statValue.textContent);

    statValue.parentElement.addEventListener('mouseenter', () => {
        let currentValue = originalValue;
        const increment = Math.floor(Math.random() * 3) + 1;
        const tempValue = originalValue + increment;

        // Animate to higher value
        const incrementInterval = setInterval(() => {
            if (currentValue < tempValue) {
                currentValue++;
                statValue.textContent = currentValue;
            } else {
                clearInterval(incrementInterval);
            }
        }, 50);
    });

    statValue.parentElement.addEventListener('mouseleave', () => {
        // Animate back to original
        let currentValue = parseInt(statValue.textContent);
        const decrementInterval = setInterval(() => {
            if (currentValue > originalValue) {
                currentValue--;
                statValue.textContent = currentValue;
            } else {
                clearInterval(decrementInterval);
            }
        }, 50);
    });
});

// Add equipment rarity glow effect
document.querySelectorAll('.equipment-item').forEach(item => {
    item.addEventListener('click', () => {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: inherit;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        item.style.position = 'relative';
        item.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console Easter Egg
console.log('%c<� CHARACTER STATS LOADED <�', 'color: #fbbf24; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 0 #000;');
console.log('%cLevel: 25 | Class: Robotics Engineer', 'color: #06b6d4; font-size: 14px;');
console.log('%cType "levelUp()" to increase your level!', 'color: #10b981; font-size: 12px;');

// Console command for fun
window.levelUp = function() {
    const levelElement = document.querySelector('.level');
    const currentLevel = parseInt(levelElement.textContent.match(/\d+/)[0]);
    const newLevel = currentLevel + 1;

    levelElement.textContent = 'LEVEL ' + newLevel;
    levelUpEffect();

    console.log('%cP LEVEL UP! P', 'color: #fbbf24; font-size: 24px; font-weight: bold;');
    console.log('%cNew Level: ' + newLevel, 'color: #06b6d4; font-size: 16px;');
};
