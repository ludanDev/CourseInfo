// ==========================================================
// 1. Smooth Scrolling for Navigation Links
// ==========================================================
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

// ==========================================================
// 2. Intersection Observer Animations (Scroll Reveal)
// ==========================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// ==========================================================
// 3. FAQ Bento-Grid Accordion Functionality
// ==========================================================
document.querySelectorAll('.faq-item').forEach(item => {
    const header = item.querySelector('.flex');
    const content = item.querySelector('p');
    const icon = item.querySelector('.fa-chevron-down');
    
    if (header && content && icon) {
        header.addEventListener('click', () => {
            const isOpen = content.style.display === 'block';
            
            // إغلاق بقية الأسئلة المفتوحة
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                const otherContent = otherItem.querySelector('p');
                const otherIcon = otherItem.querySelector('.fa-chevron-down');
                if (otherContent && otherIcon && otherItem !== item) {
                    otherContent.style.display = 'none';
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // فتح أو إغلاق السؤال الحالي
            content.style.display = isOpen ? 'none' : 'block';
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        });
        
        // الحالات الافتراضية الأولية
        content.style.display = 'none';
        content.style.transition = 'all 0.3s ease';
        icon.style.transition = 'transform 0.3s ease';
    }
});

// إضافة كلاس الـ FAQ للعناصر المتناسقة
document.querySelectorAll('.space-y-4 > div').forEach(item => {
    if (item.querySelector('.fa-chevron-down')) {
        item.classList.add('faq-item');
    }
});

// ==========================================================
// 4. Mobile Navigation Menu Toggle
// ==========================================================
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'md:hidden text-brand-purple focus:outline-none';
mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';

const headerContainer = document.querySelector('header .container .flex');
const mainNav = document.querySelector('header nav');

if (headerContainer && mainNav) {
    headerContainer.insertBefore(mobileMenuButton, mainNav);
    
    mobileMenuButton.addEventListener('click', () => {
        mainNav.classList.toggle('hidden');
        const icon = mobileMenuButton.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// ==========================================================
// 5. Button Ripple Effects Styles & Animation
// ==========================================================
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => { ripple.remove(); }, 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    button { position: relative; overflow: hidden; }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }
`;
document.head.appendChild(rippleStyle);

// ==========================================================
// 6. Dynamic List Features (المحاور الدراسية)
// ==========================================================
const featuresData = [
    { 
        title: "تأسيس كامل في HTML5 & CSS3", 
        desc: "تعلّم هيكلة وتصميم صفحات الويب من الصفر المطلق وبناء واجهات متجاوبة بالكامل مع شاشات الهواتف والـ Desktop." 
    },
    { 
        title: "تفعيل التفاعل الذكي عبر JavaScript", 
        desc: "فهم المنطق البرمجي السليم وكيفية إضافة الحيوية والتحكم في عناصر موقعك لجعل واجهاتك تفاعلية بالكامل." 
    },
    { 
        title: "السرعة والإنتاجية باستخدام Bootstrap", 
        desc: "كيف تبني وتنسق صفحات موقعك بشكل أسرع وأكثر تنظيماً ، لتوفر وقتك وجهدك البرمجي." 
    },
    { 
        title: "بناء معرض أعمال حقيقي متكامل", 
        desc: "لن تكتفي بالنظر؛ ستطبق على مشاريع وصفحات هبوط (Landing Pages) حقيقية تبرز مهاراتك وتجذب العملاء ." 
    }
];

const listContainer = document.getElementById('features-list');
if (listContainer) {
    featuresData.forEach(item => {
        const li = document.createElement('li');
        li.className = "flex items-start gap-5 group";
        li.innerHTML = `
            <div class="flex-shrink-0 mt-1 transition-transform group-hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8 text-slate-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            </div>
            <div>
                <h3 class="text-lg md:text-xl font-bold text-slate-900 tracking-tight transition-colors">${item.title}</h3>
                <p class="text-slate-600 text-xs md:text-base mt-2 leading-relaxed font-light">${item.desc}</p>
            </div>
        `;
        listContainer.appendChild(li);
    });
}

// ==========================================================
// 7. WhatsApp Floating Button (Clean Link & Fixed Tooltip)
// ==========================================================
const whatsappButton = document.createElement('a');
whatsappButton.href = 'https://wa.me/201505607621?text=%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D9%86%D8%B6%D9%85%D8%A7%D9%85%20%D9%84%D9%84%D9%85%D8%B3%D8%A7%D8%B1';
whatsappButton.target = '_blank';
whatsappButton.className = 'whatsapp-float';
whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i><span class="whatsapp-tooltip permanent-show">سجل الآن</span>';
document.body.appendChild(whatsappButton);

function updateWhatsAppButton() {
    if (window.scrollY > 400) {
        whatsappButton.style.opacity = '1';
        whatsappButton.style.pointerEvents = 'auto';
    } else {
        whatsappButton.style.opacity = '0';
        whatsappButton.style.pointerEvents = 'none';
    }
}
window.addEventListener('scroll', updateWhatsAppButton, { passive: true });
updateWhatsAppButton();

// ==========================================================
// 8. Supabase Real-time Simulation Live Social Proof
// ==========================================================
const SUPABASE_URL = "https://aoebgcezznzghxrzilvq.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_sXppAAE3Xe1qTaY2LlqGXA_fyMv34TM"; 

const _0xnames = ["إسماعيل", "مهاد", "إيمان", "حسن", "بدرية", "رانيا", "سليمان", "مصطفى", "مجاهد", "عبد الله", "أسامة", "عبد الرحمن", "أحمد", "مروة", "سبأ", "صفاء", "براءة", "الريح", "عمر", "عزة", "رقية", "حسام", "علي", "لمياء", "ضحى", "سمية", "غفران", "أمجد", "إسراء", "آدم", "تسنيم", "مآب", "الطيب", "إيناس", "خالد", "مها", "سارة", "فاطمة", "عثمان", "ريان"];
const _0xcities = ["مدني", "الخرطوم", "أم درمان", "بورتسودان", "بحري", "الأبيض", "كسلا", "القضارف", "عطبرة", "شندي", "نيالا"];
let shownCombinations = new Set();

function showSocialProof() {
    // تم حذف شرط الـ localStorage تماماً ليظهر الـ Popup دوماً دون حظر للآي بي أو المتصفح
    const popup = document.getElementById('social-proof-popup');
    const textEl = document.getElementById('popup-text');
    const timeEl = document.getElementById('popup-time');
    
    if (!popup || !textEl || !timeEl) return;

    const cleanGetUrl = `${SUPABASE_URL}/rest/v1/bookings?select=*&order=created_at.desc&limit=5`;

    fetch(cleanGetUrl, {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (!data || data.length === 0) return;
        
        let randomName = "";
        let randomCity = "";
        let attempts = 0;
        let combinationKey = "";

        do {
            randomName = _0xnames[Math.floor(Math.random() * _0xnames.length)];
            randomCity = _0xcities[Math.floor(Math.random() * _0xcities.length)];
            combinationKey = `${randomName}-${randomCity}`;
            attempts++;
        } while (shownCombinations.has(combinationKey) && attempts < 150);

        shownCombinations.add(combinationKey);
        
        if (shownCombinations.size >= (_0xnames.length * _0xcities.length) * 0.8) {
            shownCombinations.clear();
        }

        textEl.innerHTML = `سجل <span class="text-brand-purple font-extrabold">${randomName}</span> من <span class="font-semibold">${randomCity}</span> الآن! 🔥`;
        timeEl.textContent = "قبل قليل";
        
        popup.style.opacity = "1";
        popup.style.transform = "translateY(0)";
        popup.style.pointerEvents = "auto";
        
        setTimeout(() => {
            popup.style.opacity = "0";
            popup.style.transform = "translateY(40px)";
            popup.style.pointerEvents = "none";
        }, 4500);
    })
    .catch(err => console.error("خطأ صامت:", err.message));
}

function connectWhatsAppButtons() {
    const cleanPostUrl = `${SUPABASE_URL}/rest/v1/bookings`;

    const sendClickToSupabase = () => {
        // تم مسح كود وضع الـ Item في الـ localStorage لضمان عدم الحظر عند الضغط
        const popup = document.getElementById('social-proof-popup');
        if(popup) {
            popup.style.opacity = "0";
            popup.style.pointerEvents = "none";
        }

        fetch(cleanPostUrl, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({ text: "click_registered" }) 
        })
        .then(() => console.log("🔥"))
        .catch(err => console.error(err));
    };

    const staticBtn = document.getElementById('whatsapp-btn');
    if (staticBtn) staticBtn.addEventListener('click', sendClickToSupabase);

    const floatBtn = document.querySelector('.whatsapp-float');
    if (floatBtn) floatBtn.addEventListener('click', sendClickToSupabase);
}

connectWhatsAppButtons();
setTimeout(showSocialProof, 3000);
setInterval(showSocialProof, 20000);

// ==========================================================
// 9. Fixed Target Countdown Timer
// ==========================================================
function initFixedCountdown() {
    const TARGET_DATE = new Date("2026-06-27T23:59:59").getTime(); 

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const diff = TARGET_DATE - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            const timerContainer = document.getElementById('timer-days').parentElement.parentElement;
            if (timerContainer) {
                timerContainer.innerHTML = "<span class='text-red-500 font-bold font-ibm-plex-sans-arabic text-sm'>عذراً، انتهت مدة الخصم وتم إغلاق باب التسجيل للدفعة الحالية!</span>";
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('timer-days').textContent = String(days).padStart(2, '0');
        document.getElementById('timer-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

document.addEventListener('DOMContentLoaded', initFixedCountdown);
