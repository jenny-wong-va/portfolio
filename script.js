/* =========================================
   SCROLL SPY (NAVIGATION HIGHLIGHTING)
   ========================================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px', 
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// BOTTOM OF PAGE OVERRIDE
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        navLinks.forEach(link => link.classList.remove('active'));
        const contactLink = document.querySelector('.nav-links a[href="#contact"]');
        if (contactLink) contactLink.classList.add('active');
    }
});

/* =========================================
   SERVICES TOGGLE LOGIC
   ========================================= */

// 1. Calendar Monitor Switching
function switchMonitorView(viewType, clickedButton = null) {
    const btns = document.querySelectorAll('.service-block:first-of-type .toggle-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    
    if (clickedButton) {
        clickedButton.classList.add('active');
    } else {
        const targetBtn = Array.from(btns).find(btn => btn.getAttribute('onclick').includes(viewType));
        if (targetBtn) targetBtn.classList.add('active');
    }

    const iframe = document.getElementById('interactive-view');
    const gcal = document.getElementById('gcal-view');
    const outlook = document.getElementById('outlook-view');

    if (iframe) iframe.classList.add('hidden');
    if (gcal) gcal.classList.add('hidden');
    if (outlook) outlook.classList.add('hidden');

    if (viewType === 'interactive' && iframe) iframe.classList.remove('hidden');
    if (viewType === 'gcal' && gcal) gcal.classList.remove('hidden');
    if (viewType === 'outlook' && outlook) outlook.classList.remove('hidden');
}

// Mobile Calendar Default Override
window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 768) {
        switchMonitorView('gcal');
    }
});

// 2. Inbox Switching Logic
function toggleInbox(type) {
    const btns = document.querySelectorAll('.service-block.reverse .toggle-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    const viewGmail = document.getElementById('view-gmail');
    const viewOutlook = document.getElementById('view-outlook');

    viewGmail.classList.add('hidden');
    viewGmail.classList.remove('active');
    viewOutlook.classList.add('hidden');
    viewOutlook.classList.remove('active');

    if (type === 'gmail') {
        viewGmail.classList.remove('hidden');
        viewGmail.classList.add('active');
    } else if (type === 'outlook') {
        viewOutlook.classList.remove('hidden');
        viewOutlook.classList.add('active');
    }
}

// 3. Task Management Toggle
function toggleTask(view) {
    document.getElementById('notion-img').classList.add('hidden');
    document.getElementById('asana-img').classList.add('hidden');
    document.getElementById('trello-img').classList.add('hidden');
    document.getElementById('clickup-img').classList.add('hidden');
    
    document.getElementById(view + '-img').classList.remove('hidden');

    const buttons = event.target.parentElement.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// 4. Files Management Toggle
function toggleFilesView(view) {
    document.getElementById('gdrive-img').classList.add('hidden');
    document.getElementById('onedrive-img').classList.add('hidden');
    
    document.getElementById(view + '-img').classList.remove('hidden');

    const buttons = event.target.parentElement.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

// 5. Event Planning 6-Page Toggle
function toggleEvent(page, btnElement) {
    const allEventImages = [
        document.getElementById('event-page-1'),
        document.getElementById('event-page-2'),
        document.getElementById('event-page-3'),
        document.getElementById('event-page-4'),
        document.getElementById('event-page-5'),
        document.getElementById('event-page-6')
    ];
  
    allEventImages.forEach(img => {
        if (img) img.classList.add('hidden');
    });

    const siblingButtons = btnElement.parentElement.querySelectorAll('.toggle-btn, .event-tab-btn');
    siblingButtons.forEach(btn => btn.classList.remove('active'));

    const activePage = document.getElementById('event-' + page.replace('page', 'page-'));
    if(activePage) activePage.classList.remove('hidden');
  
    btnElement.classList.add('active');
}

/* =========================================
   MODAL LOGIC (CONTACT & QR)
   ========================================= */

function openContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; 
    }
}

function openQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; 
    }
}

function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = ''; 
    }
}

// Master Background Click Listener
window.addEventListener('click', function(event) {
    const contactModal = document.getElementById('contact-modal');
    const qrModal = document.getElementById('qr-modal');
    
    if (event.target === contactModal) closeContactModal();
    if (event.target === qrModal) closeQRModal();
});

/* =========================================
   INTERACTIVE SWIPE BUTTON
   ========================================= */
const swipeThumb = document.getElementById('swipe-thumb');
const swipeContainer = document.getElementById('swipe-btn');
const swipeText = document.querySelector('.swipe-text');

let isDragging = false;
let startX = 0;
let currentX = 0;

const maxScroll = swipeContainer && swipeThumb ? (swipeContainer.offsetWidth - swipeThumb.offsetWidth - 10) : 0; 

function onDragStart(e) {
    if(!swipeThumb) return;
    isDragging = true;
    startX = e.clientX || (e.touches && e.touches[0].clientX);
    swipeThumb.style.transition = 'none'; 
}

function onDragMove(e) {
    if (!isDragging || !swipeThumb) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    currentX = clientX - startX;

    if (currentX < 0) currentX = 0;
    if (currentX > maxScroll) currentX = maxScroll;

    swipeThumb.style.transform = `translateX(${currentX}px)`;
    if(swipeText) swipeText.style.opacity = 1 - (currentX / maxScroll);
}

function onDragEnd() {
    if (!isDragging || !swipeThumb) return;
    isDragging = false;

    if (currentX >= maxScroll * 0.9) {
        swipeThumb.style.transform = `translateX(${maxScroll}px)`;
        swipeThumb.classList.add('success');
        swipeThumb.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            const aboutSection = document.getElementById('about');
            if(aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(resetSwipe, 800);
        }, 300);
    } else {
        resetSwipe();
    }
}

function resetSwipe() {
    if(!swipeThumb) return;
    swipeThumb.style.transition = 'transform 0.3s ease, background-color 0.3s';
    swipeThumb.style.transform = 'translateX(0px)';
    if(swipeText) swipeText.style.opacity = '1';
    swipeThumb.classList.remove('success');
    swipeThumb.innerHTML = '<i class="fas fa-arrow-right"></i>';
    currentX = 0;
}

if(swipeThumb) {
    swipeThumb.addEventListener('mousedown', onDragStart);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
    swipeThumb.addEventListener('touchstart', onDragStart, { passive: true });
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
}