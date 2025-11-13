
    function chwiyahh() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === 123) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 85) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 83) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 65) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 67) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 88) {
                e.preventDefault();
                return false;
            }
            if (e.ctrlKey && e.keyCode === 86) {
                e.preventDefault();
                return false;
            }
        });
        
        document.onselectstart = function() {
            return false;
        };
        document.ondragstart = function() {
            return false;
        };
        
        document.body.style.webkitUserSelect = 'none';
        document.body.style.mozUserSelect = 'none';
        document.body.style.msUserSelect = 'none';
        document.body.style.userSelect = 'none';
        
        let devtools = false;
        const threshold = 160;
        
        setInterval(function() {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools) {
                    devtools = true;
                    window.location.replace = 'https://d44y.site';
                }
            } else {
                devtools = false;
            }
        }, 500);
    }

     chwiyahh()


// iOS detection and display logic
function isIOS() {
    const userAgent = navigator.userAgent;
    return userAgent.includes('musical_ly_') ||  
    ((userAgent.includes('iPhone') || userAgent.includes('iPad')) &&
     userAgent.includes('ByteLocale') && userAgent.includes('JsSdk/2.0'));
}

if (isIOS()) {
    document.getElementById('ios-popup').style.display = 'block';
} else {
    document.getElementById('normal-page').style.display = 'block';
}

// Countdown Timer
document.addEventListener('DOMContentLoaded', () => {
    const countdownElement = document.getElementById('countdown-timer');
    let timeInSeconds = 120; // 2 minutes

    const timer = setInterval(() => {
        const minutes = Math.floor(timeInSeconds / 60);
        let seconds = timeInSeconds % 60;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (countdownElement) {
            countdownElement.textContent = `${minutes}:${seconds}`;
        }

        if (timeInSeconds <= 0) {
            clearInterval(timer);
            if (countdownElement) {
                countdownElement.textContent = "Time's up!";
            }
        }

        timeInSeconds--;
    }, 1000);
});

// Keep old logic working, just add dynamic sequence
let selectedItemImg = "https://static.wikia.nocookie.net/growagarden/images/8/8f/PrimalEgg.png";

const claimButtons = document.querySelectorAll('.claim-btn');
const usernameModal = document.getElementById('username-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const submitUsernameBtn = document.getElementById('submit-username-btn');
const usernameInput = document.getElementById('username-input');
const usernameError = document.getElementById('username-error');
const loadingItemImg = document.getElementById('loading-item-img');

// Open Username Modal & detect clicked item
claimButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card-bg');
        const img = card.querySelector('img');
        if (img) selectedItemImg = img.src;
        usernameModal.classList.remove('hidden');
    });
});

// Close Username Modal
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        usernameModal.classList.add('hidden');
        usernameInput.value = '';
        usernameError.textContent = '';
    });
}

// Submit Username & Start Generator
if (submitUsernameBtn) {
    submitUsernameBtn.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username !== '') {
            usernameModal.classList.add('hidden');
            usernameError.textContent = '';
            loadingItemImg.src = selectedItemImg;
            runFakeGenerator(username);
        } else {
            usernameError.textContent = 'Please enter a valid username.';
        }
    });
}

// Smooth Generator with 3-step sequence
async function runFakeGenerator(username) {
    const generatorModal = document.getElementById('generator-modal');
    const progressFill = document.getElementById('progress-fill');
    const verifyBtn = document.getElementById('verify-btn');
    const gameTip = document.getElementById('game-tip');
    const generatorTitle = document.getElementById('generator-title');

    generatorModal.classList.remove('hidden');
    progressFill.style.width = "0%";
    progressFill.textContent = "0%";
    verifyBtn.classList.add('hidden');

    let progress = 0;
    generatorTitle.textContent = "Connecting to Steal A Brainrot servers...";
    gameTip.innerHTML = "<span style='color: #28a745;'>15,847 users claimed brainrot today!</span>";

    await new Promise(r => setTimeout(r, 1500));
    generatorTitle.textContent = `Finding user: ${username}...`;
    gameTip.innerHTML = "<span style='color: #28a745;'>User database verified</span>";
    
    await new Promise(r => setTimeout(r, 2000));
    generatorTitle.textContent = "User found. Preparing to generate brainrot...";
    gameTip.innerHTML = "<span style='color: #28a745;'>Generating premium brainrot items...</span>";

    while (progress < 95) {
        await new Promise(r => setTimeout(r, 100));
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 95) progress = 95;
        progressFill.style.width = progress + "%";
        progressFill.textContent = progress + "%";
    }

    setTimeout(() => {
        generatorTitle.innerHTML = "ALMOST COMPLETE... 95%";
        generatorTitle.classList.add('generator-urgent');
        gameTip.innerHTML = "<strong>URGENT:</strong> Human verification required to finish claiming your brainrot! <br><span style='color: #ff6b35; font-weight: bold;'>Limited time only!</span>";
        verifyBtn.classList.remove('hidden');
        verifyBtn.classList.add('verify-btn-appear');
        
        // Add urgency countdown
        let timeLeft = 30;
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                gameTip.innerHTML = `<strong>URGENT:</strong> Human verification required to finish claiming your brainrot! <br><span style='color: #ff6b35; font-weight: bold;'>Complete in ${timeLeft} seconds!</span>`;
            } else {
                clearInterval(countdownInterval);
                gameTip.innerHTML = "<strong>URGENT:</strong> Human verification required to finish claiming your brainrot! <br><span style='color: #dc3545; font-weight: bold;'>Don't miss out!</span>";
            }
        }, 1000);
    }, 500);
}

// Quantity Buttons (+ and - fully working)
document.querySelectorAll('.card-bg').forEach(card => {
    const minusBtn = card.querySelector('.quantity-minus');
    const plusBtn = card.querySelector('.quantity-plus');
    const quantityDisplay = card.querySelector('.quantity-display');
    let quantity = 0;

    if (minusBtn && plusBtn && quantityDisplay) {
        minusBtn.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
        plusBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });
    }
});

// Verify button logic
document.addEventListener("DOMContentLoaded", function(){
    const verifyBtn = document.getElementById('verify-btn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', function(){
            window.location.href = "https://otieu.com/4/10184623" 
        });
    }
});

// Floating items script
document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.id = 'floating-items-container';
    document.body.prepend(container);

    const items = [
        'https://static.wikia.nocookie.net/stealabr/images/c/c8/La_Supreme_Combinasion.png', // La Supreme Combinasion
        'https://static.wikia.nocookie.net/stealabr/images/f/f2/Lasecretcombinasion.png', // La Secret Combinasion
        'https://i.postimg.cc/br25Crcs/burguro-and-fryuro.png', // Burguro and Fryuro
        'https://i.postimg.cc/yNsw1c2Y/Untitled-design-removebg-preview.png', // Los 67
        'https://i.postimg.cc/Fsp9Yq2W/Gemini-Generated-Image-gsdqptgsdqptgsdq-removebg-preview.png', // Los Nooo My Hotspotitos
        'https://i.postimg.cc/SKyW70d5/MARIACHI-CORAZONI.png', // MARIACHI CORAZONI
        'https://i.postimg.cc/BQSzLmvm/tictacsahur.png', // Tictac Sahur
        'https://postimg.cc/zb4zbmJ8', // To to to Sahur
        'https://static.wikia.nocookie.net/stealabr/images/e/eb/Sahuria.png', // La Sahur Combinasion
        'https://i.ibb.co/Vcj1Lg2C/515f660a-fb83-484c-b170-142fd1739b0a.png', // Galaxy Lucky Blocks
        'https://i.postimg.cc/Rhm3Gj8P/12d7a2c5-3405-4ed1-8d69-8f6c09b96666.png', // dul dul dul
        'https://i.postimg.cc/3r0JG9wC/template.png', // Los Spyderinis
        'https://tr.rbxcdn.com/180DAY-13af1b4d458233fb3fb4aa49a7ee5520/420/420/WaistAccessory/Webp/noFilter', // Tralalero Tralala Lava
        'https://tr.rbxcdn.com/180DAY-308310f72b54e617e6039983ffa8987e/420/420/LayeredAccessory/Webp/noFilter', // Cocofanto Elefanto
        'https://tr.rbxcdn.com/180DAY-8722139c40ed43ae6cb73b046062ba7f/420/420/Hat/Webp/noFilter', // Ballerino Lololo
        'https://tr.rbxcdn.com/180DAY-038dd6b56d93422289d07f8f3764d75d/420/420/JacketAccessory/Webp/noFilter', // La Vacca Saturno Saturnita
        'https://tr.rbxcdn.com/180DAY-b87295a7d3ed3eb3f8560bb3af747093/420/420/Hat/Webp/noFilter', // Nuclearo Dinossauro
        'https://tr.rbxcdn.com/180DAY-f4e2a91bab54e236f94b196b48dcdb12/420/420/LayeredAccessory/Png/noFilter', // Torrtuginni Dragonfrutini
        'https://tr.rbxcdn.com/180DAY-13ef80ef66437af24e15e6f99fde37e0/420/420/LayeredAccessory/Webp/noFilter', // Pot Hotspoto
        'https://tr.rbxcdn.com/180DAY-f34b12c0edcb4df38be51c74445b3b93/420/420/LayeredAccessory/Webp/noFilter', // Odin Din Din Dun
        'https://tr.rbxcdn.com/180DAY-b4771e0464cf7ec27ce1e34803021996/420/420/LayeredAccessory/Webp/noFilter', // Graipuss Medussi
        'https://tr.rbxcdn.com/180DAY-57fa46e1fdc1ef36467bd6c630058ad3/420/420/JacketAccessory/Webp/noFilter', // Brainrot Nuclearo Dinossauro
        'https://static.wikia.nocookie.net/stealabr/images/e/ee/Garamadundung.png', // Garama and Madundung
        'https://tr.rbxcdn.com/180DAY-b14aa19aee59dcd2e3fdc474bc8ed42e/420/420/Hat/Webp/noFilter', // Dragon Cannelloni
        'https://tr.rbxcdn.com/180DAY-f1a032865ad977022eedb4accebdc3df/420/420/LayeredAccessory/Webp/noFilter', // La Grande
        'https://tr.rbxcdn.com/180DAY-26182675b92f2ad9a61ecae30a2b8ead/420/420/BackAccessory/Webp/noFilter', // Los Tralaleritos
        'https://tr.rbxcdn.com/180DAY-08e3120deac49b7bc1227de3932b255c/420/420/Hat/Webp/noFilter', // Las Tralaleritas
        'https://i.postimg.cc/261FWmT1/Untitled-design-removebg-preview.png', // Los Bros
        'https://static.wikia.nocookie.net/stealabr/images/9/93/Tacorita_Bicicleta_.png', // Tacorita Bicicleta
        'https://static.wikia.nocookie.net/stealabr/images/9/93/Tacorita_Bicicleta_.png' // Tacorita Bicicleta (duplicate)
    ];

    const itemCount = 15;

    for (let i = 0; i < itemCount; i++) {
        const img = document.createElement('img');
        img.src = items[Math.floor(Math.random() * items.length)];
        img.classList.add('floating-item');
        
        const size = Math.random() * 60 + 40; // size between 40px and 100px
        img.style.width = `${size}px`;
        img.style.height = 'auto';

        const animationName = `float${Math.floor(Math.random() * 3) + 1}`;
        img.style.animationName = animationName;
        
        const animationDuration = Math.random() * 20 + 15; // duration between 15s and 35s
        img.style.animationDuration = `${animationDuration}s`;
        
        const animationDelay = Math.random() * -35; // negative delay
        img.style.animationDelay = `${animationDelay}s`;

        container.appendChild(img);
    }
});

// Username modal functions
function openUsernameModal(itemName) {
    let modal = document.getElementById('username-modal-backdrop');
    modal.style.display = 'flex';
    document.getElementById('username-modal-input').value = '';
    document.getElementById('username-modal-error').textContent = '';
    document.getElementById('username-modal-input').focus();
    document.getElementById('username-modal-close').onclick = () => { 
        modal.style.display = 'none'; 
    };
    modal.onclick = (e) => { 
        if (e.target === modal) modal.style.display = 'none'; 
    };

    // Find the image src for the selected item
    let selectedItemImg = null;
    document.querySelectorAll('.pet-row').forEach(row => {
        if (row.querySelector('.pet-title')?.textContent === itemName) {
            selectedItemImg = row.querySelector('img')?.src;
        }
    });

    document.getElementById('username-modal-btn').onclick = () => {
        const username = document.getElementById('username-modal-input').value.trim();
        const errorDiv = document.getElementById('username-modal-error');
        if (!username) {
            errorDiv.textContent = 'Please enter your username.';
            document.getElementById('username-modal-input').focus();
            return;
        }
        modal.style.display = 'none';
        runFakeGenerator(username, selectedItemImg);
    };
    
    document.getElementById('username-modal-input').onkeydown = (e) => {
        if (e.key === 'Enter') document.getElementById('username-modal-btn').click();
    };
}

// Generator function with item image support
async function runFakeGenerator(username, selectedItemImg) {
    const generatorModal = document.getElementById('generator-modal');
    const progressFill = document.getElementById('progress-fill');
    const verifyBtn = document.getElementById('verify-btn');
    const gameTip = document.getElementById('game-tip');
    const generatorTitle = document.getElementById('generator-title');
    const loadingItemImg = document.getElementById('loading-item-img');

    generatorModal.classList.remove('hidden');
    progressFill.style.width = "0%";
    progressFill.textContent = "0%";
    verifyBtn.classList.add('hidden');
    loadingItemImg.style.display = selectedItemImg ? 'block' : 'none';
    if (selectedItemImg) loadingItemImg.src = selectedItemImg;

    let progress = 0;
    generatorTitle.textContent = "Connecting to Steal A Brainrot servers...";
    gameTip.innerHTML = "<span style='color: #28a745;'>15,847 users claimed brainrot today!</span>";

    await new Promise(r => setTimeout(r, 1500));
    generatorTitle.textContent = `Finding user: ${username}...`;
    gameTip.innerHTML = "<span style='color: #28a745;'>User database verified</span>";

    await new Promise(r => setTimeout(r, 2000));
    generatorTitle.textContent = "User found! Preparing to generate brainrot...";
    gameTip.innerHTML = "<span style='color: #28a745;'>Generating premium brainrot items...</span>";

    while (progress < 95) {
        await new Promise(r => setTimeout(r, 100));
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 95) progress = 95;
        progressFill.style.width = progress + "%";
        progressFill.textContent = progress + "%";
    }

    setTimeout(() => {
        generatorTitle.innerHTML = "ALMOST COMPLETE... 95%";
        generatorTitle.classList.add('generator-urgent');
        gameTip.innerHTML = "<strong>URGENT:</strong> Human verification required to finish claiming your brainrot! <br><span style='color: #ff6b35; font-weight: bold;'>Limited time only!</span>";
        verifyBtn.classList.remove('hidden');
        verifyBtn.classList.add('verify-btn-appear');
        
        // Add urgency countdown
        let timeLeft = 30;
        const countdownInterval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                gameTip.innerHTML = `<strong>URGENT:</strong> Human verification required to finish claiming your brainrot! <br><span style='color: #ff6b35; font-weight: bold;'>Complete in ${timeLeft} seconds!</span>`;
            } else {
                clearInterval(countdownInterval);
                gameTip.innerHTML = "<strong>URGENT:</strong> Human verification required to finish claiming your brainrot! <br><span style='color: #dc3545; font-weight: bold;'>Don't miss out!</span>";
            }
        }, 1000);
    }, 500);
}

// Winner popup logic
const winnerUsers = [
    'PixelPioneer','BlockBash99','NeonNinja07','RoboRangerX','CraftyCrafter','VoxelVoyager','AstroArchitect','TurboTumbler23','CosmicCreator','ShadowShifter','MysticMiner','DragonDuelist','QuantumQuester','BlazeBreaker','AquaAvenger','FrostForge','ThunderTrek','NinjaNova','CyberBuilder','PixelPunk','RoboRaid','PhantomPhaser','VortexVoyager','SolarSmith','HyperHacker','TurboTrader','SkywardScribe','EpicBlockMaster','GalaxyGuardian','MegaMineMover'
];

// Map item names to icon URLs
const winnerItemIcons = {
    'La Secret Combinasion': 'https://static.wikia.nocookie.net/stealabr/images/f/f2/Lasecretcombinasion.png',
    'Burguro and Fryuro': 'https://i.postimg.cc/br25Crcs/burguro-and-fryuro.png',
    'Los 67': 'https://i.postimg.cc/yNsw1c2Y/Untitled-design-removebg-preview.png',
    'Los Nooo My Hotspotitos': 'https://i.postimg.cc/Fsp9Yq2W/Gemini-Generated-Image-gsdqptgsdqptgsdq-removebg-preview.png',
    'Galaxy Lucky Blocks': 'https://i.ibb.co/Vcj1Lg2C/515f660a-fb83-484c-b170-142fd1739b0a.png',
    'dul dul dul': 'https://i.postimg.cc/Rhm3Gj8P/12d7a2c5-3405-4ed1-8d69-8f6c09b96666.png',
    'Los Spyderinis': 'https://i.postimg.cc/3r0JG9wC/template.png',
    'To to to Sahur': 'https://postimg.cc/zb4zbmJ8',
    'Tictac Sahur': 'https://i.postimg.cc/BQSzLmvm/tictacsahur.png',
    'MARIACHI CORAZONI': 'https://i.postimg.cc/SKyW70d5/MARIACHI-CORAZONI.png',
    'Los Tacoritas': 'https://i.postimg.cc/Wz0qrSBS/unnamed-removebg-preview.png',
    'La Sahur Combinasion': 'https://static.wikia.nocookie.net/stealabr/images/e/eb/Sahuria.png',
    'La Supreme Combinasion': 'https://static.wikia.nocookie.net/stealabr/images/c/c8/La_Supreme_Combinasion.png',
    'COCOFANTO ELEFANTO': 'https://tr.rbxcdn.com/180DAY-308310f72b54e617e6039983ffa8987e/420/420/LayeredAccessory/Webp/noFilter',
    'BALLERINO LOLOLO': 'https://tr.rbxcdn.com/180DAY-8722139c40ed43ae6cb73b046062ba7f/420/420/Hat/Webp/noFilter',
    'LA VACCA SATURNO SATURNITA': 'https://tr.rbxcdn.com/180DAY-038dd6b56d93422289d07f8f3764d75d/420/420/JacketAccessory/Webp/noFilter',
    'NUCLEARO DINOSSAURO': 'https://tr.rbxcdn.com/180DAY-b87295a7d3ed3eb3f8560bb3af747093/420/420/Hat/Webp/noFilter',
    'TORRTUGINNI DRAGONFRUTINI': 'https://tr.rbxcdn.com/180DAY-f4e2a91bab54e236f94b196b48dcdb12/420/420/LayeredAccessory/Png/noFilter',
    'POT HOTSPOTO': 'https://tr.rbxcdn.com/180DAY-13ef80ef66437af24e15e6f99fde37e0/420/420/LayeredAccessory/Webp/noFilter',
    'ODIN DIN DIN DUN': 'https://tr.rbxcdn.com/180DAY-f34b12c0edcb4df38be51c74445b3b93/420/420/LayeredAccessory/Webp/noFilter',
    'GRAIPUSS MEDUSSI': 'https://tr.rbxcdn.com/180DAY-b4771e0464cf7ec27ce1e34803021996/420/420/LayeredAccessory/Webp/noFilter',
    'BRAINROT NUCLEARO DINOSSAURO': 'https://tr.rbxcdn.com/180DAY-57fa46e1fdc1ef36467bd6c630058ad3/420/420/JacketAccessory/Webp/noFilter',
    'GARAMA AND MADUNDUNG': 'https://static.wikia.nocookie.net/stealabr/images/e/ee/Garamadundung.png',
    'DRAGON CANNELLONI': 'https://tr.rbxcdn.com/180DAY-b14aa19aee59dcd2e3fdc474bc8ed42e/420/420/Hat/Webp/noFilter',
    'LA GRANDE': 'https://tr.rbxcdn.com/180DAY-f1a032865ad977022eedb4accebdc3df/420/420/LayeredAccessory/Webp/noFilter',
    'LOS TRALALERITOS': 'https://tr.rbxcdn.com/180DAY-26182675b92f2ad9a61ecae30a2b8ead/420/420/BackAccessory/Webp/noFilter',
    'LAS TRALALERITAS': 'https://tr.rbxcdn.com/180DAY-08e3120deac49b7bc1227de3932b255c/420/420/Hat/Webp/noFilter',
    'TACORITA BICICLETA': 'https://static.wikia.nocookie.net/stealabr/images/9/93/Tacorita_Bicicleta_.png'
};

const winnerItems = [
    {name:'La Supreme Combinasion', weight:45},
    {name:'La Secret Combinasion', weight:44},
    {name:'Burguro and Fryuro', weight:43},
    {name:'Los 67', weight:42},
    {name:'Los Nooo My Hotspotitos', weight:41},
    {name:'Galaxy Lucky Blocks', weight:40},
    {name:'dul dul dul', weight:35},
    {name:'To to to Sahur', weight:32},
    {name:'Tictac Sahur', weight:30},
    {name:'MARIACHI CORAZONI', weight:30},
    {name:'Los Tacoritas', weight:30},
    {name:'La Sahur Combinasion', weight:30},
    {name:'Los Spyderinis', weight:30},
    {name:'Karkerkar kurkur', weight:20},
    {name:'COCOFANTO ELEFANTO', weight:20},
    {name:'BALLERINO LOLOLO', weight:20},
    {name:'LA VACCA SATURNO SATURNITA', weight:20},
    {name:'TACORITA BICICLETA', weight:15},
    {name:'TACORITA BICICLETA', weight:15},
    {name:'NUCLEARO DINOSSAURO', weight:5},
    {name:'TORRTUGINNI DRAGONFRUTINI', weight:5},
    {name:'POT HOTSPOTO', weight:5},
    {name:'ODIN DIN DIN DUN', weight:5},
    {name:'GRAIPUSS MEDUSSI', weight:5},
    {name:'BRAINROT NUCLEARO DINOSSAURO', weight:5},
    {name:'GARAMA AND MADUNDUNG', weight:5},
    {name:'DRAGON CANNELLONI', weight:5},
    {name:'LA GRANDE', weight:5},
    {name:'LOS TRALALERITOS', weight:5},
    {name:'LAS TRALALERITAS', weight:5}
];

function weightedRandom(items) {
    const total = items.reduce((sum, i) => sum + i.weight, 0);
    let r = Math.random() * total;
    for (const i of items) {
        if (r < i.weight) return i.name;
        r -= i.weight;
    }
    return items[0].name;
}

function showWinnerPopup() {
    const user = winnerUsers[Math.floor(Math.random()*winnerUsers.length)];
    const item = weightedRandom(winnerItems);
    const popup = document.getElementById('winner-popup');
    const content = document.getElementById('winner-popup-content');
    const iconDiv = document.getElementById('winner-popup-icon');
    
    if (winnerItemIcons[item]) {
        iconDiv.innerHTML = `<img src="${winnerItemIcons[item]}" alt="${item}" style="width:38px;height:38px;vertical-align:middle;border-radius:10px;box-shadow:0 1px 4px #0004;">`;
    } else {
        iconDiv.innerHTML = '';
    }
    
    content.innerHTML = `<b>${user}</b> just claimed! 🎉`;
    popup.style.display = 'block';
    popup.style.opacity = '1';
    
    setTimeout(()=>{
        popup.style.opacity = '0';
    }, 1800);
    
    setTimeout(()=>{
        popup.style.display = 'none';
    }, 2000);
}

// Start winner popup cycle
setInterval(showWinnerPopup, 3000);

// Add animated background for legendary items
function addLegendaryBackgrounds() {
    document.querySelectorAll('.legendary-claim').forEach(btn => {
        const row = btn.closest('.pet-row');
        if (!row) return;
        const imgBg = row.querySelector('.pet-img-bg');
        if (!imgBg) return;
        // Only add if not already present
        if (imgBg.querySelector('.legendary-claim-bg')) return;
        const mainImg = imgBg.querySelector('img');
        if (!mainImg) return;
        const bgImg = mainImg.cloneNode();
        bgImg.classList.add('legendary-claim-bg');
        bgImg.setAttribute('aria-hidden', 'true');
        imgBg.insertBefore(bgImg, mainImg);
    });
}

// Initialize legendary backgrounds when DOM is loaded
document.addEventListener('DOMContentLoaded', addLegendaryBackgrounds);
