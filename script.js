
    
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

        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });

        // FAQ Accordion functionality
        document.querySelectorAll('.faq-item').forEach(item => {
            const header = item.querySelector('.flex');
            const content = item.querySelector('p');
            const icon = item.querySelector('.fa-chevron-down');
            
            if (header && content && icon) {
                header.addEventListener('click', () => {
                    const isOpen = content.style.display === 'block';
                    
                    // Close all other FAQs
                    document.querySelectorAll('.faq-item').forEach(otherItem => {
                        const otherContent = otherItem.querySelector('p');
                        const otherIcon = otherItem.querySelector('.fa-chevron-down');
                        if (otherContent && otherIcon && otherItem !== item) {
                            otherContent.style.display = 'none';
                            otherIcon.style.transform = 'rotate(0deg)';
                        }
                    });
                    
                    // Toggle current FAQ
                    content.style.display = isOpen ? 'none' : 'block';
                    icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                });
                
                // Initially hide content
                content.style.display = 'none';
                content.style.transition = 'all 0.3s ease';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        // Add FAQ class to items
        document.querySelectorAll('.space-y-4 > div').forEach(item => {
            if (item.querySelector('.fa-chevron-down')) {
                item.classList.add('faq-item');
            }
        });

        // Mobile menu toggle
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'md:hidden text-brand-purple focus:outline-none';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        
        const header = document.querySelector('header .container .flex');
        const nav = document.querySelector('header nav');
        
        if (header && nav) {
            header.insertBefore(mobileMenuButton, nav);
            
            mobileMenuButton.addEventListener('click', () => {
                nav.classList.toggle('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            });
        }

        // Add loading animation for counter statistics
        function animateCounter(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (element.textContent.includes('+')) {
                    element.textContent = Math.floor(current).toLocaleString() + '+';
                } else if (element.textContent.includes('%')) {
                    element.textContent = Math.floor(current) + '%';
                } else if (element.textContent.includes('/')) {
                    element.textContent = (current / 10).toFixed(1) + '/5';
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }

        // Observe statistics for counter animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    const statElement = entry.target.querySelector('.text-4xl');
                    if (statElement) {
                        const text = statElement.textContent;
                        let target = parseInt(text.replace(/\D/g, ''));
                        
                        if (text.includes('4.9')) {
                            target = 49;
                        }
                        
                        animateCounter(statElement, target);
                        entry.target.classList.add('animated');
                    }
                }
            });
        }, { threshold: 0.5 });

        // Observe statistics cards
        document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4 > div').forEach(card => {
            if (card.querySelector('.text-4xl')) {
                statsObserver.observe(card);
            }
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroIllustration = document.querySelector('.float-animation');
            
            if (heroIllustration && scrolled < 800) {
                heroIllustration.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Add hover effect for partner logos
        document.querySelectorAll('.grid.grid-cols-2.md\\:grid-cols-4.lg\\:grid-cols-6 > div').forEach(partner => {
            partner.addEventListener('mouseenter', () => {
                partner.style.transform = 'scale(1.1)';
                partner.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            });
            
            partner.addEventListener('mouseleave', () => {
                partner.style.transform = 'scale(1)';
                partner.style.boxShadow = 'none';
            });
        });

        // Add button click feedback
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
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple effect styles
        const style = document.createElement('style');
        style.textContent = `
            button {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // WhatsApp Floating Button - Show/Hide based on scroll position
        const whatsappButton = document.createElement('a');
        whatsappButton.href = 'https://wa.me/201505607621?text=اريد%20الالتحاق%20بالمسار';
        whatsappButton.target = '_blank';
        whatsappButton.className = 'whatsapp-float';
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
        document.body.appendChild(whatsappButton);

        // Find sections by their heading text
        const allSections = document.querySelectorAll('section');
        let learnSection = null;
        let ctaSection = null;
        
        allSections.forEach(section => {
            const heading = section.querySelector('h2');
            if (heading) {
                const text = heading.textContent.trim();
                if (text.includes('ماذا ستتعلم في هذه الدفعة')) {
                    learnSection = section;
                }
                if (text.includes('هل تريد ان تكمل مسارك')) {
                    ctaSection = section;
                }
            }
        });

        function updateWhatsAppButton() {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            let showButton = false;
            
            if (learnSection && ctaSection) {
                const learnRect = learnSection.getBoundingClientRect();
                const ctaRect = ctaSection.getBoundingClientRect();
                
                // Show when "ماذا ستتعلم" section is visible or above
                const learnVisible = learnRect.top <= windowHeight * 0.8;
                
                // Hide when "هل تريد ان تكمل مسارك" section starts appearing
                const ctaNotYetVisible = ctaRect.top > windowHeight * 0.8;
                
                showButton = learnVisible && ctaNotYetVisible;
            }
            
            if (showButton) {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.pointerEvents = 'auto';
            } else {
                whatsappButton.style.opacity = '0';
                whatsappButton.style.pointerEvents = 'none';
            }
        }

        window.addEventListener('scroll', updateWhatsAppButton, { passive: true });
        updateWhatsAppButton();

        // Form submission handling (for contact forms)
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                successMessage.textContent = 'Thank you for your submission! We\'ll get back to you soon.';
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
                
                form.reset();
            });
        });

        // Add smooth reveal for testimonial cards
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 > div').forEach((card, index) => {
            if (card.querySelector('.fa-star')) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                testimonialObserver.observe(card);
            }
        });

         const data = [
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

       data.forEach(item => {
    const li = document.createElement('li');
    li.className = "flex items-start gap-5 group";
    li.innerHTML = `
        <div class="flex-shrink-0 mt-1 transition-transform group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 md:w-8 md:h-8 text-slate-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
        </div>
        <div>
            <!-- هنا تم تصغير الخط ليصبح متجاوباً text-lg على الجوال و md:text-xl على الشاشة الكبيرة -->
            <h3 class="text-lg md:text-xl font-bold text-slate-900 tracking-tight transition-colors">${item.title}</h3>
            <p class="text-slate-600 text-xs md:text-base mt-2 leading-relaxed font-light">${item.desc}</p>
        </div>
    `;
    listContainer.appendChild(li);
});

        console.log('Ludan webpage loaded successfully with all interactive features!');
// ==========================================================
// كود سوبابيز المطور والمخفي عبر الـ Unicode (آمن وسليم 100%)
// ==========================================================
const SUPABASE_URL = "https://aoebgcezznzghxrzilvq.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_sXppAAE3Xe1qTaY2LlqGXA_fyMv34TM"; 

// الأسماء السودانية مخفية تماماً في الـ Inspect على هيئة رموز Unicode
const _0xnames = [
    "\u0625\u0633\u0645\u0627\u0639\u064a\u0644", "\u0645\u0647\u0627\u062f", "\u0625\u064a\u0645\u0627\u0646", "\u062d\u0633\u0646", "\u0628\u062f\u0631\u064a\u0629", 
    "\u0631\u0627\u0646\u064a\u0627", "\u0633\u0644\u064a\u0645\u0627\u0646", "\u0645\u0635\u0637\u0641\u064a", "\u0645\u062c\u0627\u0647\u062f", "\u0639\u0628\u062f \u0627\u0644\u0644\u0647", 
    "\u0623\u0633\u0627\u0645\u0629", "\u0639\u0628\u062f \u0627\u0644\u0631\u062d\u0645\u0646", "\u0623\u062d\u0645\u062f", "\u0645\u0631\u0648\u0629", "\u0633\u0628\u0623", 
    "\u0635\u0641\u0627\u0621", "\u0628\u0631\u0627\u0621\u0629", "\u0627\u0644\u0631\u064a\u062d", "\u0639\u0645\u0631", "\u0639\u0632\u0629", 
    "\u0631\u0642\u064a\u0629", "\u062d\u0633\u0627\u0645", "\u0639\u0644\u064a", "\u0644\u0645\u064a\u0627\u0621", "\u0636\u062d\u0649", 
    "\u0633\u0645\u064a\u0629", "\u063a\u0641\u0631\u0627\u0646", "\u0623\u0645\u062c\u062f", "\u0625\u0633\u0631\u0627\u0621", "\u0622\u062f\u0645",
    "\u062a\u0633\u0646\u064a\u0645", "\u0645\u0622\u0628", "\u0627\u0644\u0637\u064a\u0628", "\u0625\u064a\u0646\u0627\u0633", "\u062e\u0627\u0644\u062f", 
    "\u0645\u0647\u0627", "\u0633\u0627\u0631\u0629", "\u0641\u0627\u0637\u0645\u0629", "\u0639\u062b\u0645\u0627\u0646", "\u0631\u064a\u0627\u0646"
];

// المدن السودانية مخفية أيضاً بالـ Unicode
const _0xcities = [
    "\u0645\u062f\u0646\u064a", "\u0627\u0644\u062e\u0631\u0637\u0648\u0645", "\u0623\u0645 \u062f\u0631\u0645\u0627\u0646", "\u0628\u0648\u0631\u062a\u0633\u0648\u062f\u0627\u0646", 
    "\u0628\u062d\u0631\u064a", "\u0627\u0644\u0623\u0628\u064a\u0636", "\u0643\u0633\u0644\u064a", "\u0627\u0644\u0642\u0636\u0627\u0631\u0641", 
    "\u0639\u0637\u0628\u0631\u0629", "\u0634\u0646\u062f\u064a", "\u0646\u064a\u0627\u0644\u0627"
];

let shownCombinations = new Set();

function showSocialProof() {
    const blockUntil = localStorage.getItem('block_social_proof_until');
    if (blockUntil && Date.now() < parseInt(blockUntil)) return;

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

        // اختيار توليفة فريدة لمنع التكرار
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

        // تظهر باللغة العربية النظيفة تلقائياً في الـ DOM دون أي دالة فك تشفير معقدة
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
        const fortyEightHours = 2 * 24 * 60 * 60 * 1000;
        localStorage.setItem('block_social_proof_until', (Date.now() + fortyEightHours).toString());
        
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
setInterval(showSocialProof, 30000);


// Fixed Target Countdown Timer
function initFixedCountdown() {
    // اضبطي هنا تاريخ ووقت إغلاق التسجيل الحقيقي للدفعة بتاعتك بدقة
    // الصيغة: "Year-Month-DayTHour:Minute:Second"
    const TARGET_DATE = new Date("2026-06-27T23:59:59").getTime(); 

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const diff = TARGET_DATE - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            // اختياري: ماذا يحدث لو انتهى الوقت؟ يمكن كتابة جملة "انتهى التسجيل"
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

// تشغيل العداد
document.addEventListener('DOMContentLoaded', initFixedCountdown);
