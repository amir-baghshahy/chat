// ===== Handlers Module =====
// Event handlers

import { state, setState, startReply, cancelReply, startEdit, cancelEdit, startForward, cancelForward } from './state.js';
import { dom } from './dom.js';
import { chatsData } from './data.js';
import { formatTime, showToast } from './utils.js';
import { renderMessages, renderChatList, showReplyPreview, hideReplyPreview, showEditPreview, hideEditPreview } from './renderers.js';
import {
    closeModal, openModal, toggleDarkMode,
    openProfileModal, openCallHistoryModal, openHamburgerMenu, closeHamburgerMenu,
    toggleChatActionsMenu, closeChatActionsMenu, toggleEmojiPicker, closeEmojiPicker,
    openForwardModal
} from './modals.js';

export function handleOpenChat(chatId) {
    const chat = chatsData.find(c => c.id === chatId);
    if (!chat) return;

    setState({ currentChat: chat });
    chat.unread = 0;

    window.dispatchEvent(new CustomEvent('updateChatHeader', { detail: { chat } }));

    dom.emptyState.style.display = 'none';
    dom.chatView.style.display = 'flex';

    renderMessages(chat.messages);
    renderChatList(dom.searchInput.value);

    closeHamburgerMenu();
    closeChatActionsMenu();

    if (window.innerWidth <= 768) {
        dom.sidebar.classList.add('hidden');
        dom.chatArea.classList.add('visible');
        dom.backBtn.style.display = 'block';
        dom.chatInfo.style.display = 'flex';
    }

    setTimeout(() => dom.messageInput.focus(), 100);
}

export function handleSendMessage() {
    const text = dom.messageInput.value.trim();
    if (!text || !state.currentChat) return;

    const now = new Date();
    const time = formatTime(now.getHours(), now.getMinutes());

    // Handle Edit Mode
    if (state.editingMessage) {
        const msg = state.currentChat.messages.find(m => m.id === state.editingMessage);
        if (msg) {
            msg.text = text;
            renderMessages(state.currentChat.messages);
            cancelEdit();
            hideEditPreview();
            showToast('Message Edited', '', 'success', 1500);
        }
        return;
    }

    // Handle Reply Mode
    if (state.replyingTo) {
        const repliedMsg = state.currentChat.messages.find(m => m.id === state.replyingTo);
        const newMessage = {
            id: state.currentChat.messages.length + 1,
            text: text,
            time: time,
            outgoing: true,
            status: 'sent',
            replyTo: repliedMsg ? {
                id: repliedMsg.id,
                text: repliedMsg.text,
                name: state.currentChat.name
            } : undefined
        };

        state.currentChat.messages.push(newMessage);
        state.currentChat.lastMessage = text;
        state.currentChat.time = time;

        cancelReply();
        hideReplyPreview();
        dom.messageInput.value = '';

        renderMessages(state.currentChat.messages);
        renderChatList(dom.searchInput.value);

        showToast('Reply Sent', '', 'success', 2000);

        setTimeout(() => {
            newMessage.status = 'read';
            const statusIcon = dom.messagesContainer.querySelector(`[data-message-id="${newMessage.id}"] .message-status`);
            if (statusIcon) {
                statusIcon.classList.remove('sent');
                statusIcon.classList.add('read');
            }
        }, 1000);
        return;
    }

    // Regular Message
    const newMessage = {
        id: state.currentChat.messages.length + 1,
        text: text,
        time: time,
        outgoing: true,
        status: 'sent'
    };

    state.currentChat.messages.push(newMessage);
    state.currentChat.lastMessage = text;
    state.currentChat.time = time;

    dom.messageInput.value = '';

    renderMessages(state.currentChat.messages);
    renderChatList(dom.searchInput.value);

    showToast('Message Sent', '', 'success', 2000);

    setTimeout(() => {
        newMessage.status = 'read';
        const statusIcon = dom.messagesContainer.querySelector(`[data-message-id="${newMessage.id}"] .message-status`);
        if (statusIcon) {
            statusIcon.classList.remove('sent');
            statusIcon.classList.add('read');
        }
    }, 1000);
}

export function handleGoBack() {
    dom.sidebar.classList.remove('hidden');
    dom.chatArea.classList.remove('visible');
    dom.backBtn.style.display = 'none';
    dom.chatInfo.style.display = 'none';
    setState({ currentChat: null });
    renderChatList(dom.searchInput.value);
}

export function handleMenuAction(action) {
    closeHamburgerMenu();

    switch(action) {
        case 'new-group':
            openModal(dom.newGroupModal);
            showToast('New Group', 'Create a group to start chatting with multiple people', 'info');
            break;
        case 'contacts':
            openModal(dom.contactsModal);
            break;
        case 'calls':
            openCallHistoryModal();
            break;
        case 'saved':
            handleOpenChat(999);
            break;
        case 'settings':
            openModal(dom.settingsModal);
            break;
        case 'dark-mode':
            toggleDarkMode(!state.isDarkMode);
            break;
        case 'help':
            showToast('Help Center', 'Telegram FAQ and support', 'info');
            break;
    }
}

export function handleChatAction(action) {
    switch(action) {
        case 'view-profile':
            openProfileModal();
            break;
        case 'search-chat':
            showToast('Search', 'Search in this conversation', 'info');
            break;
        case 'mute-notifications':
            showToast('Notifications Muted', 'You won\'t receive notifications from this chat', 'success');
            break;
        case 'clear-history':
            showToast('Clear History', 'Chat history cleared', 'success');
            break;
        case 'delete-chat':
            showToast('Delete Chat', 'Chat deleted', 'error');
            break;
        case 'attach':
            dom.fileInput.click();
            break;
        case 'emoji':
            toggleEmojiPicker();
            break;
        case 'phone-call':
            startCall('voice');
            break;
        case 'video-call':
            startCall('video');
            break;
        case 'more-options':
            toggleChatActionsMenu();
            break;
    }
}

// Call functions
export function startCall(type) {
    if (!state.currentChat) return;

    setState({ activeCall: type, callDuration: 0 });

    dom.callAvatar.src = state.currentChat.avatar;
    dom.callName.textContent = state.currentChat.name;
    dom.callStatus.textContent = type === 'video' ? 'Video calling...' : 'Calling...';
    dom.callDuration.textContent = '00:00';

    dom.callModal.classList.add('active');

    setTimeout(() => {
        if (state.activeCall) {
            dom.callStatus.textContent = 'Connected';
            startCallDuration();
        }
    }, 2000);
}

function startCallDuration() {
    state.callInterval = setInterval(() => {
        state.callDuration++;
        const minutes = Math.floor(state.callDuration / 60).toString().padStart(2, '0');
        const seconds = (state.callDuration % 60).toString().padStart(2, '0');
        dom.callDuration.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

export function endCall() {
    if (state.callInterval) {
        clearInterval(state.callInterval);
        setState({ callInterval: null });
    }

    setState({ activeCall: null, callDuration: 0 });
    dom.callModal.classList.remove('active');
    showToast('Call Ended', `Duration: ${dom.callDuration.textContent}`, 'info');
}

export function toggleMute() {
    state.isMuted = !state.isMuted;
    dom.muteBtn.classList.toggle('active', state.isMuted);
    dom.muteBtn.innerHTML = state.isMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
}

export function toggleVideo() {
    state.isVideoOn = !state.isVideoOn;
    dom.videoBtn.classList.toggle('active', !state.isVideoOn);
}

// ===== Reply, Forward, Edit Handlers =====

export function handleReply(messageId) {
    const msg = state.currentChat?.messages.find(m => m.id === messageId);
    if (!msg) return;

    startReply(messageId);
    showReplyPreview(msg);
    dom.messageInput.focus();
}

export function handleForward(messageId) {
    const msg = state.currentChat?.messages.find(m => m.id === messageId);
    if (!msg) return;

    startForward(messageId);
    openForwardModal(msg);
}

export function handleEdit(messageId) {
    const msg = state.currentChat?.messages.find(m => m.id === messageId);
    if (!msg || !msg.text) return;

    startEdit(messageId);
    showEditPreview(msg);
    dom.messageInput.value = msg.text;
    dom.messageInput.focus();
}

export function handleCancelReply() {
    cancelReply();
    hideReplyPreview();
}

export function handleCancelEdit() {
    cancelEdit();
    hideEditPreview();
    dom.messageInput.value = '';
}

export function handleForwardToChat(targetChatId) {
    if (!state.forwardingMessage) return;

    const sourceChat = state.currentChat;
    const msg = sourceChat?.messages.find(m => m.id === state.forwardingMessage);
    if (!msg) return;

    const targetChat = chatsData.find(c => c.id === targetChatId);
    if (!targetChat) return;

    const now = new Date();
    const time = formatTime(now.getHours(), now.getMinutes());

    const forwardedMsg = {
        id: targetChat.messages.length + 1,
        text: msg.text,
        type: msg.type,
        url: msg.url,
        time: time,
        outgoing: true,
        status: 'sent',
        forwardedFrom: sourceChat.name
    };

    targetChat.messages.push(forwardedMsg);
    targetChat.lastMessage = msg.text || (msg.type === 'image' ? '📷 Photo' : '🎬 Video');
    targetChat.time = time;

    cancelForward();
    closeModal(dom.forwardModal);

    if (state.currentChat?.id === targetChatId) {
        renderMessages(targetChat.messages);
    }
    renderChatList(dom.searchInput.value);
    showToast('Forwarded', `Message forwarded to ${targetChat.name}`, 'success');
}
