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
const buyButtons = document.querySelectorAll('[data-course]');
const selectedCourseDiv = document.getElementById('selected-course');
const purchaseForm = document.getElementById('purchase-form');

let selectedCourse = '';

// Close modal function
function closeModal() {
    modal.classList.add('hidden');
}

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
    const submitBtn = purchaseForm.querySelector('button[type="submit"]');
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





