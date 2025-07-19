// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
});

// Close mobile menu when clicking on a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            e.preventDefault();
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards, course cards, and testimonial cards
const animatedElements = document.querySelectorAll('.feature-card, .course-card, .testimonial-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Form submission handling
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('.cta-input');
        const email = emailInput.value;
        
        if (email) {
            alert(`Спасибо! Мы отправили бесплатный урок на ${email}`);
            emailInput.value = '';
        }
    });
}

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-menu a[href^="#"]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add scroll effect to navigation
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.boxShadow = 'var(--shadow-sm)';
    } else {
        nav.style.boxShadow = 'var(--shadow-md)';
    }
    
    lastScroll = currentScroll;
});

// Course button click tracking
document.querySelectorAll('.course-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const courseTitle = this.closest('.course-card').querySelector('.course-title').textContent;
        alert(`Спасибо за интерес к курсу "${courseTitle}"! Мы свяжемся с вами в ближайшее время.`);
    });
});

// Music Player
const tracks = [
    {
        name: "Седая Ночь (Remix)",
        artist: "Ласковый Май",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        name: "Крошка Моя",
        artist: "Руки Вверх",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        name: "Владимирский Централ",
        artist: "Михаил Круг",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

let currentTrackIndex = 0;
let isPlaying = false;

const audioPlayer = document.getElementById('audioPlayer');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const trackName = document.getElementById('trackName');
const trackArtist = document.getElementById('trackArtist');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeElem = document.getElementById('currentTime');
const durationElem = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const visualizerBars = document.querySelectorAll('.visualizer .bar');

// Initialize player
function initPlayer() {
    loadTrack(currentTrackIndex);
    audioPlayer.volume = 0.7;
}

// Load track
function loadTrack(index) {
    const track = tracks[index];
    audioPlayer.src = track.url;
    trackName.textContent = track.name;
    trackArtist.textContent = track.artist;
    updateProgress();
}

// Play/Pause functionality
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

function playTrack() {
    audioPlayer.play();
    isPlaying = true;
    playBtn.querySelector('.play-icon').style.display = 'none';
    playBtn.querySelector('.pause-icon').style.display = 'block';
    animateVisualizer();
}

function pauseTrack() {
    audioPlayer.pause();
    isPlaying = false;
    playBtn.querySelector('.play-icon').style.display = 'block';
    playBtn.querySelector('.pause-icon').style.display = 'none';
}

// Previous/Next track
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
});

nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    if (isPlaying) playTrack();
});

// Update progress
audioPlayer.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = progress + '%';
    
    currentTimeElem.textContent = formatTime(audioPlayer.currentTime);
    durationElem.textContent = formatTime(audioPlayer.duration);
}

// Format time
function formatTime(time) {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Progress bar click
progressBar.addEventListener('click', (e) => {
    const clickX = e.offsetX;
    const width = progressBar.offsetWidth;
    const progress = clickX / width;
    audioPlayer.currentTime = progress * audioPlayer.duration;
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    audioPlayer.volume = e.target.value / 100;
});

// Visualizer animation
function animateVisualizer() {
    if (!isPlaying) return;
    
    visualizerBars.forEach((bar, index) => {
        const height = Math.random() * 80 + 20;
        bar.style.height = height + '%';
        bar.style.animationDelay = `${index * 0.1}s`;
    });
    
    requestAnimationFrame(animateVisualizer);
}

// Track ended
audioPlayer.addEventListener('ended', () => {
    nextBtn.click();
});

// Initialize player on load
initPlayer();