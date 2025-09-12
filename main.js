
const ANIMALS_DATA = {
    cat: {
        name: 'القطة الصغيرة المسكينة',
        freeImage: 'https://i.ibb.co/N23tLHxF/cate.png',
        prisonImage: 'https://i.ibb.co/bgCmwdLc/cat-sijn.png',
        messages: [
            '😿 مياو مياو... أنا محبوسة في هذا القفص المظلم منذ 3 أيام!',
            '🏠 أشتاق لمنزلي الدافئ وطعامي المفضل...',
            '🥺 من فضلك ساعدني في الهروب! أنت أملي الوحيد!'
        ],
        clicksRequired: 5,
        encouragements: [
            '💪 ممتاز! القطة تشعر بالأمل!',
            '🔥 رائع! القيود تنكسر!',
            '⚡ تقريباً حررتها!',
            '🎉 أوشكت على النجاح!',
            '🏆 مذهل! القطة حرة الآن!'
        ]
    },
    goat: {
        name: 'الماعز الصغير المظلوم',
        freeImage: 'https://i.ibb.co/dwPQbnn3/ma3iz.png',
        prisonImage: 'https://i.ibb.co/dwPQbnn3/ma3iz.png',
        messages: [
            '🐐 مع مع... أنا ماعز صغير محبوس بالسلاسل!',
            '🌿 أريد الجري في الحقول الخضراء مرة أخرى!',
            '🙏 أرجوك! حررني من هذا العذاب!'
        ],
        clicksRequired: 5,
        encouragements: [
            '🐐 رائع! الماعز يقفز من الفرح!',
            '🔓 السلاسل تنكسر!',
            '💨 أوشك على الحرية!',
            '✨ تقدم ممتاز!',
            '🎊 مبروك! الماعز حر!'
        ]
    },
    hamster: {
        name: 'الهامستر اللطيف المحزون',
        freeImage: 'https://i.ibb.co/0R0NMfhD/rat.png',
        prisonImage: 'https://i.ibb.co/0R0NMfhD/rat.png',
        messages: [
            '🐹 أنا هامستر صغير محبوس في صندوق ضيق!',
            '🎡 أريد الجري في عجلتي المفضلة!',
            '💔 قلبي الصغير حزين... ساعدني!'
        ],
        clicksRequired: 5,
        encouragements: [
            '🐹 الهامستر يتحرك بسرعة!',
            '🔨 الصندوق ينكسر!',
            '🌟 قريب من الحرية!',
            '⭐ استمر! أنت بطل!',
            '🎉 الهامستر حر ويلعب!'
        ]
    },
    panda: {
        name: 'الباندا الصغير الحزين',
        freeImage: 'https://i.ibb.co/j9jsgfCD/panda-sijn.jpg',
        prisonImage: 'https://i.ibb.co/j9jsgfCD/panda-sijn.jpg',
        messages: [
            '🐼 أووه... أنا باندا صغير محبوس في غرفة باردة!',
            '🎋 أشتاق لأكل البامبو في الغابة الجميلة!',
            '💚 هل ستنقذني وتعيدني إلى بيتي؟'
        ],
        clicksRequired: 5,
        encouragements: [
            '🐼 الباندا يلوح لك بفرح!',
            '💪 قوة رائعة!',
            '🔥 الباندا متحمس!',
            '✨ أوشكت على التحرير!',
            '🎊 الباندا حر ويرقص!'
        ]
    },
    dog: {
        name: 'الكلب الوفي المظلوم',
        freeImage: 'https://i.ibb.co/dXWNkNY/dog.png',
        prisonImage: 'https://i.ibb.co/QS28qg7/Picsart-25-09-12-02-07-12-690.jpg',
        messages: [
            '🐕 وووف وووف... أنا كلب مسكين مربوط بسلاسل ثقيلة منذ 5 أيام!',
            '🦴 أريد اللعب والجري في الحديقة مع أصدقائي!',
            '🥺 أرجوك انقذني! سأكون أوفى صديق لك!'
        ],
        clicksRequired: 5,
        encouragements: [
            '🐕 رائع! الكلب يهز ذيله من الفرح!',
            '⛓️ السلاسل الثقيلة تنكسر!',
            '🏃 أوشك على الحرية والجري!',
            '⭐ استمر! الكلب يؤمن بك!',
            '🎉 مبروك! الكلب حر ويلعب!'
        ]
    }
};

const bim = 'https://smrturl.co/a/s1053e16b67/13409?s1=';

let currentAnimal = null;
let clickCount = 0;
let targetClicks = 5; 
let isRescueMission = false;
let soundEnabled = true;

const mainScreen = document.getElementById('main-screen');
const animalModal = document.getElementById('animal-modal');
const rescueScreen = document.getElementById('rescue-screen');
const successScreen = document.getElementById('success-screen');

document.addEventListener('DOMContentLoaded', function() {
    console.log('🐾 مرحباً بك في مهمة إنقاذ الحيوانات!');
    
    initializeAnimals();
    setupSoundSystem();
    setupInteractionEffects();
    
    trackUserBehavior();
});

function setupSoundSystem() {
    try {
        window.sounds = {
            click: document.getElementById('clickSound'),
            success: createAudioElement('success'),
            progress: createAudioElement('progress')
        };
    } catch (error) {
        console.log('الصوت غير متاح:', error);
        soundEnabled = false;
    }
}

function createAudioElement(type) {
    const audio = new Audio();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    if (type === 'success') {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    } else if (type === 'progress') {
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
    }
    
    return audio;
}

function playSound(type = 'click') {
    if (!soundEnabled) return;
    
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        const frequencies = {
            click: 800,
            success: 1000,
            progress: 600
        };
        
        oscillator.frequency.setValueAtTime(frequencies[type] || 800, audioContext.currentTime);
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('خطأ في تشغيل الصوت:', error);
    }
}


function initializeAnimals() {
    const animalCards = document.querySelectorAll('.animal-card');
    
    animalCards.forEach((card, index) => {
        // تأثير ظهور متدرج
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
        
        // إضافة مستمع النقر
        card.addEventListener('click', function() {
            const animalType = this.getAttribute('data-animal');
            playSound('click');
            showAnimalChat(animalType);
        });
        
        // تأثيرات الهوفر المحسّنة
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
            playSound('progress');
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // تأثير النقر البصري
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-8px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
        });
    });
    
    // تهيئة الأزرار في البطاقات
    setupRescueButtons();
}

/**
 * تهيئة أزرار الإنقاذ الفورية
 */
function setupRescueButtons() {
    const rescueButtons = document.querySelectorAll('.rescue-now-btn');
    
    rescueButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // منع إطلاق حدث البطاقة
            const card = this.closest('.animal-card');
            const animalType = card.getAttribute('data-animal');
            
            playSound('click');
            showAnimalChat(animalType);
        });
    });
}

/**
 * إظهار نافذة الحوار مع الحيوان
 */
function showAnimalChat(animalType) {
    currentAnimal = ANIMALS_DATA[animalType];
    if (!currentAnimal) return;
    
    // تحديث محتوى النافذة
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-animal-image');
    
    modalTitle.textContent = `رسالة من ${currentAnimal.name}`;
    modalImage.src = currentAnimal.prisonImage;
    modalImage.alt = currentAnimal.name;
    
    // إظهار النافذة مع تأثير
    animalModal.classList.remove('hidden');
    animalModal.style.animation = 'modalFadeIn 0.4s ease-out';
    
    // بدء المحادثة السريعة
    startQuickConversation();
    
    // إعداد أدوات التحكم
    setupModalControls();
    
    // تتبع فتح النافذة
    trackEvent('modal_opened', animalType);
}

/**
 * بدء محادثة سريعة ومؤثرة
 */
function startQuickConversation() {
    const chatMessages = document.getElementById('chat-messages');
    const chatActions = document.getElementById('chat-actions');
    
    // مسح المحتوى السابق
    chatMessages.innerHTML = '';
    chatActions.innerHTML = '';
    
    // إظهار الرسائل بسرعة
    currentAnimal.messages.forEach((message, index) => {
        setTimeout(() => {
            addChatMessage(message);
            playSound('progress');
            
            // إظهار أزرار الاختيار بعد الرسالة الأخيرة
            if (index === currentAnimal.messages.length - 1) {
                setTimeout(() => {
                    showUrgentChatActions();
                }, 800);
            }
        }, index * 1000);
    });
}

/**
 * إضافة رسالة إلى الحوار
 */
function addChatMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatMessages.appendChild(messageDiv);
    
    // تمرير تلقائي
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * إظهار أزرار الاختيار العاجلة
 */
function showUrgentChatActions() {
    const chatActions = document.getElementById('chat-actions');
    
    chatActions.innerHTML = `
        <button class="choice-btn" onclick="startQuickRescueMission()" style="animation: urgentPulse 1s ease-in-out infinite;">
            <i class="fas fa-heart"></i>
            نعم! سأنقذك الآن! 🚀
        </button>
        <button class="choice-btn no-btn" onclick="closeAnimalModal()" style="opacity: 0.7;">
            <i class="fas fa-times"></i>
            آسف، لا أستطيع المساعدة
        </button>
    `;
    
    playSound('success');
}

/**
 * بدء مهمة الإنقاذ السريعة
 */
function startQuickRescueMission() {
    playSound('success');
    
    // إغلاق النافذة مع رسالة تشجيعية
    addChatMessage('🎉 شكراً لك بطل! الآن اتبع التعليمات السريعة...');
    
    setTimeout(() => {
        animalModal.classList.add('hidden');
        showQuickRescueScreen();
    }, 1500);
    
    // تتبع بدء المهمة
    trackEvent('rescue_started', currentAnimal.name);
}

/**
 * إظهار شاشة الإنقاذ السريعة
 */
function showQuickRescueScreen() {
    // إخفاء الشاشة الرئيسية
    mainScreen.classList.add('hidden');
    
    // تهيئة شاشة الإنقاذ
    const rescueAnimalImage = document.getElementById('rescue-animal-image');
    const rescueAnimalName = document.getElementById('rescue-animal-name');
    
    rescueAnimalImage.src = currentAnimal.prisonImage;
    rescueAnimalName.textContent = currentAnimal.name;
    
    // إعداد العداد للمهمة السريعة (5 نقرات فقط)
    clickCount = 0;
    targetClicks = currentAnimal.clicksRequired; // 5 نقرات
    updateClickCounter();
    
    // إظهار شاشة الإنقاذ
    rescueScreen.classList.remove('hidden');
    rescueScreen.style.animation = 'rescueScreenAppear 0.6s ease-out';
    isRescueMission = true;
    
    // تهيئة زر الإنقاذ السريع
    setupQuickRescueButton();
}

/**
 * تهيئة زر الإنقاذ السريع
 */
function setupQuickRescueButton() {
    const rescueButton = document.getElementById('rescue-button');
    
    // إزالة مستمعين سابقين
    rescueButton.replaceWith(rescueButton.cloneNode(true));
    const newButton = document.getElementById('rescue-button');
    
    newButton.addEventListener('click', function() {
        if (clickCount < targetClicks) {
            // تأثيرات النقر
            handleRescueClick(this);
        }
    });
    
    // تأثير هوفر محسّن
    newButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.08)';
    });
    
    newButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

/**
 * معالجة النقرة على زر الإنقاذ
 */
function handleRescueClick(button) {
    // زيادة العداد
    clickCount++;
    
    // تشغيل الصوت
    playSound('click');
    
    // تأثيرات بصرية
    createClickRipple(button);
    button.style.animation = 'none';
    setTimeout(() => {
        button.style.animation = '';
    }, 10);
    
    // تحديث العداد والتقدم
    updateClickCounter();
    updateProgressBar();
    updateMotivationMessage();
    
    // تأثير اهتزاز للشاشة عند كل نقرة
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = 'screenShake 0.2s ease-in-out';
    }, 10);
    
    // إذا وصل للهدف (5 نقرات)
    if (clickCount >= targetClicks) {
        setTimeout(() => {
            completeRescueMission();
        }, 500);
    }
    
    // تتبع النقرات
    trackEvent('rescue_click', currentAnimal.name, clickCount);
}

/**
 * إنشاء تأثير الموجة عند النقر
 */
function createClickRipple(element) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.position = 'absolute';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.transform = 'translate(-50%, -50%)';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * تحديث عداد النقرات
 */
function updateClickCounter() {
    const clickCountElement = document.getElementById('click-count');
    const targetClicksElement = document.getElementById('target-clicks');
    
    clickCountElement.textContent = clickCount;
    targetClicksElement.textContent = targetClicks;
    
    // تأثير بصري للعداد
    clickCountElement.style.transform = 'scale(1.3)';
    clickCountElement.style.color = '#00FF00';
    setTimeout(() => {
        clickCountElement.style.transform = 'scale(1)';
        clickCountElement.style.color = '';
    }, 200);
}

/**
 * تحديث شريط التقدم
 */
function updateProgressBar() {
    const progressFill = document.getElementById('progress-fill');
    const percentage = (clickCount / targetClicks) * 100;
    
    progressFill.style.width = `${percentage}%`;
    
    // تأثير وهج عند التقدم
    if (percentage > 0) {
        progressFill.style.boxShadow = `0 0 ${percentage * 0.3}px rgba(0, 255, 0, 0.8)`;
    }
}

/**
 * تحديث رسالة التحفيز
 */
function updateMotivationMessage() {
    const motivationMessage = document.getElementById('motivation-message');
    const encouragements = currentAnimal.encouragements;
    
    const message = encouragements[clickCount - 1] || encouragements[encouragements.length - 1];
    motivationMessage.textContent = message;
    
    // تأثير بصري للرسالة
    motivationMessage.style.transform = 'scale(1.1)';
    motivationMessage.style.color = '#00FF00';
    setTimeout(() => {
        motivationMessage.style.transform = 'scale(1)';
        motivationMessage.style.color = '';
    }, 400);
}

/**
 * إكمال مهمة الإنقاذ
 */
function completeRescueMission() {
    // تشغيل صوت النجاح
    playSound('success');
    
    // إخفاء قسم المهمة
    const quickMission = document.querySelector('.quick-mission');
    quickMission.style.animation = 'fadeOut 0.5s ease-out forwards';
    
    setTimeout(() => {
        // إظهار شاشة النجاح
        showSuccessScreen();
        
        // تأثيرات احتفالية
        createCelebrationEffects();
    }, 500);
    
    // تتبع إكمال المهمة
    trackEvent('rescue_completed', currentAnimal.name);
}

/**
 * إظهار شاشة النجاح
 */
function showSuccessScreen() {
    const successScreenElement = document.getElementById('success-screen');
    const freedAnimalImage = document.getElementById('freed-animal-image');
    
    // تحديث صورة الحيوان المحرر
    freedAnimalImage.src = currentAnimal.freeImage || currentAnimal.prisonImage;
    
    // إظهار الشاشة
    successScreenElement.classList.remove('hidden');
    successScreenElement.style.animation = 'successAppear 1s ease-out';
    
    // تهيئة زر الإنقاذ النهائي
    setupFinalRescueButton();
    
    // تشغيل رسالة تحفيزية صوتية (اختيارية)
    setTimeout(() => {
        playSound('success');
    }, 1000);
}

/**
 * تهيئة زر الإنقاذ النهائي
 */
function setupFinalRescueButton() {
    const completeButton = document.getElementById('complete-rescue');
    
    completeButton.addEventListener('click', function() {
        redirectToSmartLink();
    });
    
    // تأثير وهج للزر
    setInterval(() => {
        completeButton.style.boxShadow = '0 0 30px rgba(0, 255, 0, 0.8)';
        setTimeout(() => {
            completeButton.style.boxShadow = '0 8px 25px rgba(0, 255, 0, 0.4)';
        }, 500);
    }, 2000);
}

/**
 * إنشاء تأثيرات احتفالية
 */
function createCelebrationEffects() {
    // إنشاء كونفيتي
    const confettiContainer = document.getElementById('confetti-container');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer);
        }, i * 50);
    }
    
    // إضافة CSS للكونفيتي إذا لم يكن موجوداً
    if (!document.getElementById('confetti-style')) {
        addConfettiStyles();
    }
}

/**
 * إنشاء قطعة كونفيتي
 */
function createConfettiPiece(container) {
    const confetti = document.createElement('div');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA726', '#66BB6A'];
    
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}%;
        border-radius: 50%;
        z-index: 10001;
        pointer-events: none;
        animation: confettiFall 3s linear forwards;
    `;
    
    container.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

/**
 * إضافة أنماط الكونفيتي
 */
function addConfettiStyles() {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes screenShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: scale(0.8);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * إعداد أدوات التحكم في النافذة
 */
function setupModalControls() {
    const closeBtn = document.getElementById('close-modal');
    
    closeBtn.onclick = closeAnimalModal;
    
    // إغلاق عند النقر خارج النافذة
    animalModal.onclick = function(e) {
        if (e.target === animalModal) {
            closeAnimalModal();
        }
    };
}

/**
 * إغلاق نافذة الحيوان
 */
function closeAnimalModal() {
    animalModal.classList.add('hidden');
    currentAnimal = null;
    
    // تتبع إغلاق النافذة
    trackEvent('modal_closed');
}

/**
 * التوجيه إلى SmartLink
 */
function redirectToSmartLink() {
    const completeButton = document.getElementById('complete-rescue');
    
    // تأثير بصري للتحويل
    completeButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحويل للإنقاذ النهائي...';
    completeButton.style.background = 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)';
    
    // تتبع النقر على الرابط النهائي
    trackEvent('smartlink_redirect', currentAnimal.name);
    
    // تأخير قصير لإظهار التأثير ثم التحويل
    setTimeout(() => {
        // حفظ إحصائيات الجلسة
        saveSessionStats();
        
        // التوجيه للرابط
        window.location.href = bim;
    }, 2000);
}

/**
 * تتبع سلوك المستخدم
 */
function trackUserBehavior() {
    // تتبع الوقت المقضي في الصفحة
    const startTime = Date.now();
    
    // تتبع التمرير
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
    });
    
    // تتبع النقر على العناصر
    document.addEventListener('click', (e) => {
        trackEvent('element_click', e.target.tagName);
    });
    
    // حفظ الإحصائيات عند مغادرة الصفحة
    window.addEventListener('beforeunload', () => {
        const timeSpent = Date.now() - startTime;
        localStorage.setItem('session_stats', JSON.stringify({
            timeSpent,
            maxScroll,
            animalInteracted: currentAnimal?.name || null,
            completedMission: clickCount >= targetClicks
        }));
    });
}

/**
 * تتبع الأحداث
 */
function trackEvent(eventName, data1 = null, data2 = null) {
    try {
        // حفظ في localStorage للإحصائيات المحلية
        const events = JSON.parse(localStorage.getItem('user_events') || '[]');
        events.push({
            event: eventName,
            data1,
            data2,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('user_events', JSON.stringify(events.slice(-100))); // احتفاظ بآخر 100 حدث
        
        console.log(`📊 Event: ${eventName}`, data1, data2);
    } catch (error) {
        console.log('خطأ في تتبع الحدث:', error);
    }
}

/**
 * حفظ إحصائيات الجلسة
 */
function saveSessionStats() {
    const sessionData = {
        animal: currentAnimal?.name || 'unknown',
        clicks: clickCount,
        completed: clickCount >= targetClicks,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
    };
    
    try {
        localStorage.setItem('last_session', JSON.stringify(sessionData));
    } catch (error) {
        console.log('خطأ في حفظ الجلسة:', error);
    }
}

/**
 * تهيئة تأثيرات التفاعل
 */
function setupInteractionEffects() {
    // تأثير المؤشر المخصص
    document.addEventListener('mousemove', (e) => {
        // يمكن إضافة تأثير مؤشر مخصص هنا
    });
    
    // تأثيرات لوحة المفاتيح
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!animalModal.classList.contains('hidden')) {
                closeAnimalModal();
            } else if (isRescueMission) {
                // إمكانية العودة للخلف بـ Escape
                goBackToHome();
            }
        }
        
        // اختصار للنقر بالمسطرة
        if (e.code === 'Space' && isRescueMission) {
            e.preventDefault();
            const rescueButton = document.getElementById('rescue-button');
            if (rescueButton && !rescueButton.disabled && clickCount < targetClicks) {
                handleRescueClick(rescueButton);
            }
        }
    });
}

/**
 * العودة للشاشة الرئيسية
 */
function goBackToHome() {
    rescueScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    isRescueMission = false;
    currentAnimal = null;
    clickCount = 0;
    
    trackEvent('returned_to_home');
}

/**
 * تهيئة تحسينات الأداء
 */
function setupPerformanceOptimizations() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    let isProcessingClick = false;
    document.addEventListener('click', function(e) {
        if (isProcessingClick) {
            e.preventDefault();
            return false;
        }
        
        isProcessingClick = true;
        setTimeout(() => {
            isProcessingClick = false;
        }, 200);
    });
}

setupPerformanceOptimizations();

console.log(`
🐾 مرحباً بك في نظام إنقاذ الحيوانات المحسّن!
✨ مُحسّن لأعلى معدل تحويل
🚀 مهمة سريعة: 5 نقرات فقط
🎯 هدف واحد: توجيه المستخدم للـ SmartLink
`);

window.showAnimalChat = showAnimalChat;
window.startQuickRescueMission = startQuickRescueMission;
window.closeAnimalModal = closeAnimalModal;
