// Course data
const courses = {
    basic: {
        name: "Этическое Айкидо: Основы",
        price: "14 950 ₽",
        level: "Уровень 1"
    },
    master: {
        name: "Квантовое Айкидо: Мастер",
        price: "24 950 ₽",
        level: "Уровень 2"
    },
    legend: {
        name: "Космическое Айкидо: Гранд-Мастер",
        price: "49 950 ₽",
        level: "Уровень 3"
    }
};

// Modal functionality
const modal = document.getElementById('purchase-modal');
const buyButtons = document.querySelectorAll('.buy-button');
const closeBtn = document.querySelector('.close');
const selectedCourseDiv = document.getElementById('selected-course');
const purchaseForm = document.getElementById('purchase-form');

let selectedCourse = '';

// Open modal when buy button is clicked
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        selectedCourse = this.getAttribute('data-course');
        const course = courses[selectedCourse];
        
        selectedCourseDiv.innerHTML = `
            <div style="background: rgba(78, 205, 196, 0.2); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                <strong>${course.name}</strong><br>
                ${course.level}<br>
                <span style="font-size: 24px; color: #ffd93d;">${course.price}</span>
            </div>
        `;
        
        modal.classList.remove('hidden');
    });
});

// Close modal
closeBtn.onclick = function() {
    modal.classList.add('hidden');
};

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.add('hidden');
    }
};

// Discord webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1396172141585498122/Njovap_ShNvGI8kRqHc-8gEuL3TU-5BZy2e9Fm_kLi2fyvHQ5YKraVLoNDVILXGvFBM2';

// Handle form submission
purchaseForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(purchaseForm);
    const data = {
        course: courses[selectedCourse].name,
        name: formData.get('name'),
        email: formData.get('email')
    };
    
    // Disable submit button
    const submitBtn = purchaseForm.querySelector('.submit-button');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    try {
        // Send to Discord webhook
        const webhookData = {
            embeds: [{
                title: '🎯 Новая заявка на курс!',
                color: 0x4ecdc4,
                fields: [
                    {
                        name: '📚 Курс',
                        value: data.course,
                        inline: true
                    },
                    {
                        name: '👤 Имя',
                        value: data.name,
                        inline: true
                    },
                    {
                        name: '📧 Email',
                        value: data.email,
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Этическое Айкидо'
                }
            }]
        };
        
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(webhookData)
        });
        
        if (response.ok) {
            // Show success message
            alert(`Спасибо за заявку на курс "${data.course}"!\n\nМы свяжемся с вами по email ${data.email} в ближайшее время.`);
            
            // Close modal and reset form
            modal.classList.add('hidden');
            purchaseForm.reset();
        } else {
            throw new Error('Ошибка отправки');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить заявку';
    }
});

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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all course cards and benefit cards
document.querySelectorAll('.course-card, .benefit-card, .comic-panel').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add hover effect to power bars
document.querySelectorAll('.course-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const powerBar = this.querySelector('.power-bar');
        powerBar.style.transform = 'scaleX(1.1)';
    });
    
    card.addEventListener('mouseleave', function() {
        const powerBar = this.querySelector('.power-bar');
        powerBar.style.transform = 'scaleX(1)';
    });
});

// Add particles effect
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = '#ffd93d';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = Math.random();
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-10px';
    particle.style.zIndex = '-1';
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3000 + 2000;
    const horizontalMovement = (Math.random() - 0.5) * 100;
    
    particle.animate([
        { transform: 'translate(0, 0)' },
        { transform: `translate(${horizontalMovement}px, ${window.innerHeight + 10}px)` }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 300);

// Add countdown timer for special offer
function updateCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    
    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const countdownElements = document.querySelectorAll('.bonus-badge');
    countdownElements.forEach(el => {
        if (el.textContent === 'ХИТЫ' || el.textContent === 'ЛЕГЕНДА') {
            // You could add a countdown here if needed
        }
    });
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
}