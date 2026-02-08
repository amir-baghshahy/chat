// ===== Main App Module =====
// Application initialization and event listeners

import { state } from './state.js';
import { dom } from './dom.js';
import { emojiData } from './data.js';
import { showToast } from './utils.js';
import {
    renderChatList, renderMemberList, renderContactsList, renderEmojis, updateChatHeader
} from './renderers.js';
import {
    closeModal, toggleDarkMode, closeHamburgerMenu, closeChatActionsMenu, closeEmojiPicker
} from './modals.js';
import {
    handleOpenChat, handleSendMessage, handleGoBack, handleMenuAction, handleChatAction,
    endCall, toggleMute, toggleVideo
} from './handlers.js';

// ===== Initialization =====
function init() {
    // Initialize dark mode
    if (state.isDarkMode) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        if (dom.settingsDarkMode) dom.settingsDarkMode.checked = true;
    }

    // Render initial content
    renderChatList();
    renderMemberList();
    renderContactsList();
    renderEmojis('smileys');

    // Focus search on desktop
    if (window.innerWidth > 768) {
        dom.searchInput.focus();
    }

    showToast('Welcome to Telegram!', 'Your messages are synced across all your devices', 'info', 4000);

    setupEventListeners();
}

// ===== Event Listeners =====
function setupEventListeners() {
    // Send message
    dom.sendBtn.addEventListener('click', handleSendMessage);

    dom.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Back button (mobile)
    dom.backBtn.addEventListener('click', handleGoBack);

    // Search
    dom.searchInput.addEventListener('input', (e) => {
        renderChatList(e.target.value);
    });

    // Hamburger menu
    dom.menuBtn.addEventListener('click', () => window.dispatchEvent(new CustomEvent('openHamburgerMenu')));
    dom.menuOverlay.addEventListener('click', closeHamburgerMenu);

    // Dark mode toggle
    if (dom.settingsDarkMode) {
        dom.settingsDarkMode.addEventListener('change', (e) => {
            toggleDarkMode(e.target.checked);
        });
    }

    // Menu items
    document.querySelectorAll('.menu-item[data-action]').forEach(item => {
        item.addEventListener('click', () => {
            handleMenuAction(item.dataset.action);
        });
    });

    // Modal close buttons
    dom.closeSettings.addEventListener('click', () => closeModal(dom.settingsModal));
    dom.closeNewGroup.addEventListener('click', () => closeModal(dom.newGroupModal));
    dom.closeContacts.addEventListener('click', () => closeModal(dom.contactsModal));
    dom.closeProfile.addEventListener('click', () => closeModal(dom.profileModal));
    dom.closeCallHistory.addEventListener('click', () => closeModal(dom.callHistoryModal));

    // Modal backdrop clicks
    [dom.settingsModal, dom.newGroupModal, dom.contactsModal, dom.profileModal, dom.callHistoryModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Chat header clickable
    const chatHeaderInfo = document.querySelector('.chat-header-info');
    if (chatHeaderInfo) {
        chatHeaderInfo.style.cursor = 'pointer';
        chatHeaderInfo.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('openProfileModal'));
        });
    }

    // Chat action buttons
    document.querySelectorAll('.chat-header-actions .icon-btn, .attach-btn, .emoji-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            if (action) {
                handleChatAction(action);
            }
        });
    });

    // Chat actions menu items
    document.querySelectorAll('.chat-actions-item').forEach(item => {
        item.addEventListener('click', () => {
            handleChatAction(item.dataset.action);
            closeChatActionsMenu();
        });
    });

    // Contacts search
    dom.contactsSearchInput.addEventListener('input', (e) => {
        renderContactsList(e.target.value);
    });

    // Create group
    dom.createGroupBtn.addEventListener('click', () => {
        const groupName = dom.groupNameInput.value.trim();
        if (!groupName) {
            showToast('Error', 'Please enter a group name', 'error');
            return;
        }
        if (state.selectedMembers.size === 0) {
            showToast('Error', 'Please select at least one member', 'error');
            return;
        }

        showToast('Group Created', 'Group: ' + groupName + ' with ' + state.selectedMembers.size + ' members', 'success');

        dom.groupNameInput.value = '';
        state.selectedMembers.clear();
        renderMemberList();
        closeModal(dom.newGroupModal);
    });

    // Call buttons
    dom.endCallBtn.addEventListener('click', endCall);
    dom.muteBtn.addEventListener('click', toggleMute);
    dom.videoBtn.addEventListener('click', toggleVideo);

    // Emoji picker
    dom.emojiClose.addEventListener('click', closeEmojiPicker);

    document.querySelectorAll('.emoji-category').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.emoji-category').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEmojis(btn.dataset.category);
        });
    });

    // Emoji search
    dom.emojiSearch.addEventListener('input', (e) => {
        const filter = e.target.value.toLowerCase();
        const allEmojis = Object.values(emojiData).flat();
        const filtered = allEmojis.filter(emoji => emoji.includes(filter));

        dom.emojiGrid.innerHTML = filtered.map(emoji =>
            '<div class="emoji-item" data-emoji="' + emoji + '">' + emoji + '</div>'
        ).join('');

        document.querySelectorAll('.emoji-item').forEach(item => {
            item.addEventListener('click', () => {
                dom.messageInput.value += item.dataset.emoji;
                dom.messageInput.focus();
            });
        });
    });

    // File upload
    dom.fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            const fileNames = Array.from(files).map(f => f.name).join(', ');
            showToast('File Selected', `${files.length} file(s): ${fileNames}`, 'success');

            setTimeout(() => {
                dom.fileInput.value = '';
            }, 100);
        }
    });

    // Close menus when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chat-header-actions') && !e.target.closest('.chat-actions-menu')) {
            closeChatActionsMenu();
        }
    });

    // Window resize
    window.addEventListener('resize', () => {
        const wasMobile = state.isMobile;
        state.isMobile = window.innerWidth <= 768;

        if (wasMobile && !state.isMobile && state.currentChat) {
            dom.sidebar.classList.remove('hidden');
            dom.chatArea.classList.remove('visible');
            dom.backBtn.style.display = 'none';
            dom.chatInfo.style.display = 'none';
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (dom.settingsModal.classList.contains('active')) {
                closeModal(dom.settingsModal);
            } else if (dom.newGroupModal.classList.contains('active')) {
                closeModal(dom.newGroupModal);
            } else if (dom.contactsModal.classList.contains('active')) {
                closeModal(dom.contactsModal);
            } else if (dom.profileModal.classList.contains('active')) {
                closeModal(dom.profileModal);
            } else if (dom.callHistoryModal.classList.contains('active')) {
                closeModal(dom.callHistoryModal);
            } else if (dom.hamburgerMenu.classList.contains('active')) {
                closeHamburgerMenu();
            } else if (dom.callModal.classList.contains('active')) {
                endCall();
            } else if (dom.emojiPicker.classList.contains('active')) {
                closeEmojiPicker();
            } else if (dom.chatActionsMenu.classList.contains('active')) {
                closeChatActionsMenu();
            }
        }

        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            dom.searchInput.focus();
        }
    });
}

// ===== Custom Event Listeners =====
window.addEventListener('openChat', (e) => {
    handleOpenChat(e.detail.chatId);
});

window.addEventListener('updateChatHeader', (e) => {
    updateChatHeader(e.detail.chat);
});

window.addEventListener('showToast', (e) => {
    showToast(e.detail.title, e.detail.message, e.detail.type, e.detail.duration);
});

window.addEventListener('closeModal', (e) => {
    closeModal(e.detail.modal);
});

window.addEventListener('openHamburgerMenu', () => {
    dom.hamburgerMenu.classList.add('active');
    dom.menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

window.addEventListener('openProfileModal', () => {
    if (!state.currentChat) return;
    window.dispatchEvent(new CustomEvent('updateProfileModal', { detail: { chat: state.currentChat } }));
    dom.profileModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

window.addEventListener('updateProfileModal', (e) => {
    const chat = e.detail.chat;
    dom.profileAvatar.src = chat.avatar || 'https://i.pravatar.cc/150?img=10';
    dom.profileName.textContent = chat.name || 'John Doe';
    dom.profileStatus.textContent = chat.online ? 'online' : 'last seen recently';
    dom.profileUsername.textContent = chat.username || '@johndoe';
    dom.profilePhone.textContent = '+1 234 567 8900';
    dom.profileBio.textContent = chat.bio || 'Hey there! I am using Telegram.';
});

// ===== Initialize App =====
init();

console.log('Telegram Web Clone initialized');
console.log('Keyboard shortcuts:');
console.log('  ESC - Close modals/menu');
console.log('  Ctrl/Cmd + K - Focus search');
