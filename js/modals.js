// ===== Modals Module =====
// Modal-related functions

import { state, cancelForward } from './state.js';
import { dom } from './dom.js';
import { renderCallHistory, updateProfileModal, renderForwardChats } from './renderers.js';
import { toggleDarkModeState } from './state.js';

export function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

export function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

export function toggleDarkMode(enabled) {
    toggleDarkModeState(enabled);

    if (enabled) {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        if (dom.settingsDarkMode) dom.settingsDarkMode.checked = true;
        window.dispatchEvent(new CustomEvent('showToast', {
            detail: { title: 'Dark Mode Enabled', message: '', type: 'success' }
        }));
    } else {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        if (dom.settingsDarkMode) dom.settingsDarkMode.checked = false;
        window.dispatchEvent(new CustomEvent('showToast', {
            detail: { title: 'Light Mode Enabled', message: '', type: 'success' }
        }));
    }
}

export function openProfileModal() {
    if (!state.currentChat) return;
    updateProfileModal(state.currentChat);
    openModal(dom.profileModal);
}

export function openCallHistoryModal() {
    renderCallHistory();
    openModal(dom.callHistoryModal);
}

export function openHamburgerMenu() {
    dom.hamburgerMenu.classList.add('active');
    dom.menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

export function closeHamburgerMenu() {
    dom.hamburgerMenu.classList.remove('active');
    dom.menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

export function toggleChatActionsMenu() {
    if (dom.chatActionsMenu.classList.contains('active')) {
        closeChatActionsMenu();
    } else {
        dom.chatActionsMenu.classList.add('active');
    }
}

export function closeChatActionsMenu() {
    dom.chatActionsMenu.classList.remove('active');
}

export function toggleEmojiPicker() {
    if (dom.emojiPicker.classList.contains('active')) {
        dom.emojiPicker.classList.remove('active');
    } else {
        dom.emojiPicker.classList.add('active');
        dom.messageInput.focus();
    }
}

export function closeEmojiPicker() {
    dom.emojiPicker.classList.remove('active');
}

export function openForwardModal() {
    const forwardModal = document.getElementById('forwardModal');
    if (!forwardModal) return;

    renderForwardChats();
    openModal(forwardModal);
}

export function closeForwardModal() {
    const forwardModal = document.getElementById('forwardModal');
    if (forwardModal) {
        closeModal(forwardModal);
    }
    cancelForward();
}
