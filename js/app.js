// Coding by Mr. xx1337 

(function() {
    'use strict';
    
    function checkDomain() {
        const allowedDomain = 'd44y.site';
        const currentDomain = window.location.hostname;

        if (currentDomain !== allowedDomain) {
            if (window.location.href !== `https://${allowedDomain}`) {
                window.location.replace(`https://${allowedDomain}`);
            }
            document.body.innerHTML = `
                <div style="
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    color: #ff0000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-family: Arial, sans-serif;
                    font-size: 24px;
                    font-weight: bold;
                    z-index: 999999;
                ">
                    Access Denied by Developer :)
                </div>
            `;
            throw new Error('Domain Access Denied');
        }
    }
    
    function antiDevTools() {
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
                    window.location.replace('https://d44y.site');
                }
            } else {
                devtools = false;
            }
        }, 500);
    }
    
    function protectContent() {
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            if (scripts[i].innerHTML.includes('xx1337')) {
                scripts[i].innerHTML = btoa(scripts[i].innerHTML);
            }
        }
        
        console.clear();
        console.log('%cAccess Monitoring Active', 'color: red; font-size: 20px; font-weight: bold;');
        console.log('%cUnauthorized access will be reported', 'color: orange; font-size: 14px;');
        
        window.console.log = function() {};
        window.console.info = function() {};
        window.console.warn = function() {};
        window.console.error = function() {};
    }
    
    checkDomain();
    antiDevTools();
    protectContent();
    
    const originalCode = atob('Ly8gT3JpZ2luYWwgY29kZSBzdGFydHMgaGVyZQ==');
    
    let allData = {
        mods: [],
        maps: [],
        texturePacks: []
    };

    let currentCategory = 'all';
    let currentPage = 0;
    let itemsPerPage = 12;
    let isLoading = false;

    const contentGrid = document.getElementById('contentGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const navTabs = document.querySelectorAll('.nav-tab');
    const loadingOverlay = document.getElementById('loadingOverlay');

    function translateToEnglish(arabicText) {
        const translations = {
            'هل سئمت من حزم قوام لاعب ضد لاعب المملة؟': 'An amazing Minecraft modification that enhances your gaming experience with new features, improved graphics, and exciting gameplay elements. Download now to discover all the incredible features this mod has to offer!',
        };

        let englishText = arabicText;
        for (const [arabic, english] of Object.entries(translations)) {
            englishText = englishText.replace(new RegExp(arabic, 'g'), english);
        }

        if (englishText === arabicText && /[\u0600-\u06FF]/.test(arabicText)) {
            return 'An amazing Minecraft modification that enhances your gaming experience with new features, improved graphics, and exciting gameplay elements. Download now to discover all the incredible features this mod has to offer!';
        }

        return englishText;
    }

    async function init() {
        checkDomain();
        showLoading();
        await loadAllData();
        setupEventListeners();
        setupTheme();
        displayContent();
        hideLoading();
    }

    async function loadAllData() {
        checkDomain();
        try {
            const [modsResponse, mapsResponse, texturePacksResponse] = await Promise.all([
                fetch('./data/AllMods48.json'),
                fetch('./data/map.json'),
                fetch('./data/TexturePacks.json')
            ]);

            allData.mods = await modsResponse.json();
            allData.maps = await mapsResponse.json();
            allData.texturePacks = await texturePacksResponse.json();

            console.log('Data loaded successfully:', {
                mods: allData.mods.length,
                maps: allData.maps.length,
                texturePacks: allData.texturePacks.length
            });
        } catch (error) {
            console.error('Error loading data:', error);
            contentGrid.innerHTML = `
                <div class="error-message" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                    <h3 style="color: var(--minecraft-red); margin-bottom: 1rem;">Error Loading Content</h3>
                    <p style="color: var(--text-secondary);">Sorry, we couldn't load the content. Please try again later.</p>
                </div>
            `;
        }
    }

    function setupEventListeners() {
        checkDomain();
        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                checkDomain();
                const category = tab.dataset.category;
                switchCategory(category);
            });
        });

        loadMoreBtn.addEventListener('click', () => {
            checkDomain();
            loadMoreContent();
        });

        themeToggle.addEventListener('click', () => {
            checkDomain();
            toggleTheme();
        });

        const captchaCheckbox = document.getElementById('captchaCheckbox');
        if (captchaCheckbox) {
            captchaCheckbox.addEventListener('change', function() {
                checkDomain();
                if (this.checked) {
                    this.disabled = true;
                    setTimeout(() => {
                        if (typeof _yi === 'function') {
                            _yi();
                        }
                        const captchaModal = bootstrap.Modal.getInstance(document.getElementById('captchaModal'));
                        if (captchaModal) {
                            captchaModal.hide();
                        }
                    }, 1000);
                }
            });
        }
    }

    function setupTheme() {
        checkDomain();
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    function toggleTheme() {
        checkDomain();
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    }

    function updateThemeIcon(theme) {
        checkDomain();
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    function switchCategory(category) {
        checkDomain();
        if (currentCategory === category) return;

        navTabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.category === category);
        });

        currentCategory = category;
        currentPage = 0;
        contentGrid.innerHTML = '';
        displayContent();
    }

    function getCurrentData() {
        checkDomain();
        switch (currentCategory) {
            case 'mods':
                return allData.mods;
            case 'maps':
                return allData.maps;
            case 'texture-packs':
                return allData.texturePacks;
            case 'all':
            default:
                return [...allData.mods, ...allData.maps, ...allData.texturePacks];
        }
    }

    function displayContent() {
        checkDomain();
        const data = getCurrentData();
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        pageData.forEach(item => {
            const itemElement = createItemElement(item);
            contentGrid.appendChild(itemElement);
        });

        if (data.length > end) {
            loadMoreBtn.style.display = 'inline-block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    function loadMoreContent() {
        checkDomain();
        currentPage++;
        displayContent();
    }

    function createItemElement(item) {
        checkDomain();
        const element = document.createElement('div');
        element.classList.add('item');
        element.innerHTML = `
            <div class="item-thumbnail">
                <img src="${item.thumbnail}" alt="${item.name}">
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${translateToEnglish(item.description)}</p>
                <a href="${item.link}" class="btn btn-primary">Download</a>
            </div>
        `;
        return element;
    }

    function showLoading() {
        checkDomain();
        loadingOverlay.style.display = 'flex';
    }

    function hideLoading() {
        checkDomain();
        loadingOverlay.style.display = 'none';
    }

    init();

})();
