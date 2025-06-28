
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.scrollable-content');
    const tabs = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.section');
    const warningMessage = document.getElementById('warning-message');
    const generateButton = document.getElementById('generate-button');
    const usernameInput = document.getElementById('username');
    const sequenceContainer = document.getElementById('sequence-container');

    function updateActiveTab(activeIndex) {
        tabs.forEach((tab, index) => {
            tab.classList.toggle('active', index === activeIndex);
        });
    }

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            updateActiveTab(index);
        });
    });

    content?.addEventListener('scroll', () => {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const containerRect = content.getBoundingClientRect();
            if (
                rect.top >= containerRect.top - 100 &&
                rect.top < containerRect.bottom
            ) {
                updateActiveTab(index);
            }
        });
    });

    document.querySelectorAll('.grid-image, .tab3-grid-image, .grid-image-large, .grid-image-pose').forEach((img) => {
        const wrapper = img.parentElement;
        if (!wrapper.classList.contains('image-wrapper')) return;

        img.addEventListener('click', () => {
            const selectedCount = document.querySelectorAll('.image-wrapper.selected').length;
            const isSelected = wrapper.classList.contains('selected');
            if (!isSelected && selectedCount >= 5) {
                if (warningMessage) {
                    warningMessage.textContent = "You can only select up to 5 items!";
                    warningMessage.style.display = 'block';
                    warningMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setTimeout(() => {
                        warningMessage.style.display = 'none';
                    }, 3000);
                }
                return;
            }
            wrapper.classList.toggle('selected');
        });
    });

    generateButton?.addEventListener('click', () => {
        const selectedWrappers = document.querySelectorAll('.image-wrapper.selected');
        const username = usernameInput.value.trim();

        if (!username || username.length <= 2 || username.length > 25) {
            warningMessage.textContent = "Please enter a valid username!";
            warningMessage.style.display = 'block';
            warningMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                warningMessage.style.display = 'none';
            }, 3000);
            return;
        }

        if (selectedWrappers.length === 0) {
            warningMessage.textContent = "You must select at least 1 item!";
            warningMessage.style.display = 'block';
            warningMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
                warningMessage.style.display = 'none';
            }, 3000);
            return;
        }

        const selectedItems = [];
        selectedWrappers.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            if (img?.alt) selectedItems.push(img.alt);
        });

        const mainContainer = document.querySelector('.main-container');
        if (mainContainer) {
            mainContainer.classList.add('bounce-out');
            setTimeout(() => {
                mainContainer.style.display = 'none';
            }, 600);
        }

        setTimeout(() => {
            sequenceContainer.classList.remove('hidden');
            sequenceContainer.classList.add('bounce-in');

            const step1 = document.getElementById('step-1');
            const step2 = document.getElementById('step-2');
            const step3 = document.getElementById('step-3');
            const step4 = document.getElementById('step-4');
            const step5 = document.getElementById('step-5');
            const step6 = document.getElementById('step-6');
            const step7 = document.getElementById('step-7');
            const step8 = document.getElementById('step-8');
            const step9 = document.getElementById('step-9');
            const step10 = document.getElementById('step-10');
            const usernamePlaceholder = document.getElementById('username-placeholder');
            const usernameDisplay = document.getElementById('username-display');
            const usernamePlaceholder8 = document.getElementById('username-placeholder-8');
            if (usernamePlaceholder) usernamePlaceholder.textContent = username;
            if (usernameDisplay) usernameDisplay.textContent = username;
            if (usernamePlaceholder8) usernamePlaceholder8.textContent = username;

            step1.classList.remove('hidden');
            step1.classList.add('bounce-in');

            setTimeout(() => {
                step1.classList.add('hidden');
                step2.classList.remove('hidden');
                step2.classList.add('bounce-in');

                setTimeout(() => {
                    step2.classList.add('hidden');
                    step3.classList.remove('hidden');

                    const platformButtons = document.querySelectorAll('#step-3-buttons button');
                    platformButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            step3.classList.add('hidden');
                            step4.classList.remove('hidden');
                            const loadingText = document.getElementById("step-4-text");
                            const messages = [
                                "Connecting to Servers..",
                                "Authenticating...",
                                "Verifying connection...",
                                "Transferring items..."
                            ];
                            let msgIndex = 0;
                            const msgInterval = setInterval(() => {
                                if (msgIndex < messages.length) {
                                    loadingText.textContent = messages[msgIndex];
                                    msgIndex++;
                                } else {
                                    clearInterval(msgInterval);
                                }
                            }, 1500);

                            setTimeout(() => {
                                step4.classList.add('hidden');
                                step5.classList.remove('hidden');
                                setTimeout(() => {
                                    step5.classList.add('hidden');
                                    step6.classList.remove('hidden');
                                    let itemIndex = 0;
                                    const step6Text = document.getElementById("step-6-text");
                                    const interval = setInterval(() => {
                                        if (itemIndex < selectedItems.length) {
                                            step6Text.textContent = "Generating " + selectedItems[itemIndex];
                                            itemIndex++;
                                        } else {
                                            clearInterval(interval);
                                            step6.classList.add('hidden');
                                            step7.classList.remove('hidden');
                                            setTimeout(() => {
                                                step7.classList.add('hidden');
                                                step8.classList.remove('hidden');
                                                setTimeout(() => {
                                                    step8.classList.add('hidden');
                                                    step9.classList.remove('hidden');
                                                    setTimeout(() => {
                                                        step9.classList.add('hidden');
                                                        step10.classList.remove('hidden');
                                                        const verifyBtn = document.querySelector('.verify-button');
                                                        if (verifyBtn) verifyBtn.classList.remove('hidden');
                                                    }, 2000);
                                                }, 2000);
                                            }, 2000);
                                        }
                                    }, 1500);
                                }, 2000);
                            }, 6000);
                        }, { once: true });
                    });
                }, 2000);
            }, 2500);
        }, 1000);
    });
});


function showNotification(message) {
    const container = document.getElementById('notification-container');
    if (!container) return;
  
    const notification = document.createElement('div');
    notification.className = 'notification-card';
    notification.innerText = message;
  
    container.appendChild(notification);
  
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => {
        notification.remove();
      }, 400);
    }, 3000);
  }
  
  // Demo loop
  const usernames = ['Luna12', 'PixelPro', 'GameMasterX', 'Guest_005', 'UltraNoob', 'StarGirl', 'BuilderDude'];
  const rewards = [
    "Vip Access",
    "Custom Makeup",
    "x2 Money",
    "the Increased Item Limit",
    "$6000 Money",
    "Robux Items"
  ];
  
  setInterval(() => {
    const randomUser = usernames[Math.floor(Math.random() * usernames.length)];
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    showNotification(`🎉 ${randomUser} just claimed ${randomReward}!`);
  }, 5000);
  
  