// ===== Renderers Module =====
// All rendering functions

import { state } from './state.js';
import { dom } from './dom.js';
import { escapeHtml } from './utils.js';
import { chatsData, contactsData, emojiData, callHistoryData, currentUser } from './data.js';

export function renderChatList(filter = '') {
    const filteredChats = filter
        ? chatsData.filter(chat =>
            chat.name.toLowerCase().includes(filter.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(filter.toLowerCase())
          )
        : chatsData;

    dom.chatList.innerHTML = filteredChats.map(chat => `
        <div class="chat-item ${state.currentChat?.id === chat.id ? 'active' : ''}" data-chat-id="${chat.id}">
            <div class="avatar-wrapper">
                <img src="${chat.avatar}" alt="${chat.name}" class="chat-avatar">
                ${chat.online ? '<div class="online-indicator online"></div>' : ''}
            </div>
            <div class="chat-item-info">
                <div class="chat-item-header">
                    <span class="chat-item-name">${chat.name}</span>
                    <span class="chat-item-time">${chat.time}</span>
                </div>
                <div class="chat-item-preview">
                    <span class="chat-item-last-message">${chat.lastMessage}</span>
                    ${chat.unread > 0 ? `<span class="chat-item-badge">${chat.unread > 99 ? '99+' : chat.unread}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.chat-item').forEach(item => {
        item.addEventListener('click', () => {
            const chatId = parseInt(item.dataset.chatId);
            // This will be handled by the openChat function in handlers module
            window.dispatchEvent(new CustomEvent('openChat', { detail: { chatId } }));
        });
    });
}

export function renderMessages(messages) {
    dom.messagesContainer.innerHTML = `
        <div class="date-divider"><span>Today</span></div>
        ${messages.map(msg => `
            <div class="message ${msg.outgoing ? 'outgoing' : 'incoming'}" data-message-id="${msg.id}">
                ${msg.replyTo ? `
                    <div class="message-reply-context">
                        <div class="reply-context-bar"></div>
                        <div class="reply-context-content">
                            <div class="reply-context-name">${escapeHtml(msg.replyTo.name)}</div>
                            <div class="reply-context-text">${escapeHtml(msg.replyTo.text || 'Media')}</div>
                        </div>
                    </div>
                ` : ''}
                <div class="message-bubble">
                    ${msg.type === 'image' ? `
                        <div class="message-media">
                            <img src="${msg.url}" alt="${escapeHtml(msg.text)}" loading="lazy">
                            ${msg.text ? `<div class="message-text">${escapeHtml(msg.text)}</div>` : ''}
                        </div>
                    ` : msg.type === 'video' ? `
                        <div class="message-media">
                            <div class="video-thumbnail">
                                <img src="${msg.url}" alt="${escapeHtml(msg.text)}" loading="lazy">
                                <div class="video-play-icon">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                            ${msg.text ? `<div class="message-text">${escapeHtml(msg.text)}</div>` : ''}
                        </div>
                    ` : `
                        <div class="message-text">${escapeHtml(msg.text)}</div>
                    `}
                    <div class="message-time">
                        ${msg.edited ? '<span class="edited-badge">edited</span>' : ''}
                        ${msg.time}
                        ${msg.outgoing ? `
                            <i class="fas fa-check-double message-status ${msg.status}"></i>
                        ` : ''}
                        ${msg.forwardedFrom ? `<i class="fas fa-share forwarded-badge" title="Forwarded from ${msg.forwardedFrom}"></i>` : ''}
                    </div>
                </div>
            </div>
        `).join('')}
    `;

    // Add double-click listener for reply
    document.querySelectorAll('.message').forEach(msgEl => {
        msgEl.addEventListener('dblclick', () => {
            const messageId = parseInt(msgEl.dataset.messageId);
            window.dispatchEvent(new CustomEvent('messageDblClick', { detail: { messageId } }));
        });
    });

    dom.messagesContainer.scrollTop = dom.messagesContainer.scrollHeight;
}

export function renderMemberList(filter = '') {
    const filteredContacts = filter
        ? contactsData.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
        : contactsData;

    dom.memberList.innerHTML = filteredContacts.map(contact => `
        <div class="member-item ${state.selectedMembers.has(contact.id) ? 'selected' : ''}" data-member-id="${contact.id}">
            <img src="${contact.avatar}" alt="${contact.name}">
            <span class="member-item-name">${contact.name}</span>
            <div class="member-checkbox">
                ${state.selectedMembers.has(contact.id) ? '<i class="fas fa-check"></i>' : ''}
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.member-item').forEach(item => {
        item.addEventListener('click', () => {
            const memberId = parseInt(item.dataset.memberId);
            if (state.selectedMembers.has(memberId)) {
                state.selectedMembers.delete(memberId);
            } else {
                state.selectedMembers.add(memberId);
            }
            renderMemberList(filter);
        });
    });
}

export function renderContactsList(filter = '') {
    const filteredContacts = filter
        ? contactsData.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
        : contactsData;

    dom.contactsList.innerHTML = filteredContacts.map(contact => `
        <div class="contact-item" data-contact-id="${contact.id}">
            <div class="avatar-wrapper">
                <img src="${contact.avatar}" alt="${contact.name}">
                ${contact.status === 'online' ? '<div class="online-indicator online"></div>' : ''}
            </div>
            <div class="contact-info">
                <div class="contact-name">${contact.name}</div>
                <div class="contact-status">${contact.status}</div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', () => {
            const contactId = parseInt(item.dataset.contactId);
            const contact = contactsData.find(c => c.id === contactId);
            window.dispatchEvent(new CustomEvent('closeModal', { detail: { modal: dom.contactsModal } }));
            window.dispatchEvent(new CustomEvent('showToast', {
                detail: { title: 'Chat Opened', message: `Starting conversation with ${contact.name}`, type: 'success' }
            }));
        });
    });
}

export function renderEmojis(category) {
    const emojis = emojiData[category] || emojiData.smileys;

    dom.emojiGrid.innerHTML = emojis.map(emoji => `
        <div class="emoji-item" data-emoji="${emoji}">${emoji}</div>
    `).join('');

    document.querySelectorAll('.emoji-item').forEach(item => {
        item.addEventListener('click', () => {
            const emoji = item.dataset.emoji;
            dom.messageInput.value += emoji;
            dom.messageInput.focus();
        });
    });
}

export function renderCallHistory() {
    dom.callHistoryList.innerHTML = callHistoryData.map(call => `
        <div class="call-history-item" data-call-id="${call.id}">
            <img src="${call.avatar}" alt="${call.name}" class="call-history-avatar">
            <div class="call-history-info">
                <div class="call-history-name">${call.name}</div>
                <div class="call-history-details">
                    <i class="fas ${call.type === 'video' ? 'fa-video' : call.type === 'outgoing' ? 'fa-phone' : 'fa-phone'} ${call.type === 'incoming' ? 'fa-flip-horizontal' : ''}"></i>
                    <span>${call.type === 'video' ? 'Video call' : call.type === 'outgoing' ? 'Outgoing call' : 'Incoming call'}</span>
                    ${call.missed ? '<span class="missed-call">(missed)</span>' : ''}
                    <span class="call-time">${call.time}</span>
                </div>
            </div>
            <div class="call-history-duration">${call.duration}</div>
            <div class="call-history-actions">
                <button class="call-history-btn" data-action="voice-call"><i class="fas fa-phone"></i></button>
                <button class="call-history-btn" data-action="video-call"><i class="fas fa-video"></i></button>
            </div>
        </div>
    `).join('');
}

export function updateChatHeader(chat) {
    dom.headerAvatar.src = chat.avatar || currentUser.avatar;
    dom.headerName.textContent = chat.name || currentUser.firstName + ' ' + currentUser.lastName;
    dom.headerStatus.textContent = chat.online ? 'online' : 'last seen recently';

    if (chat.online) {
        dom.headerOnlineIndicator.classList.add('online');
    } else {
        dom.headerOnlineIndicator.classList.remove('online');
    }

    dom.chatAvatar.src = chat.avatar;
    dom.chatName.textContent = chat.name;
    dom.chatStatus.textContent = chat.online ? 'online' : 'last seen recently';
}

export function updateProfileModal(chat) {
    dom.profileAvatar.src = chat.avatar || currentUser.avatar;
    dom.profileName.textContent = chat.name || currentUser.firstName + ' ' + currentUser.lastName;
    dom.profileStatus.textContent = chat.online ? 'online' : 'last seen recently';
    dom.profileUsername.textContent = chat.username || currentUser.username;
    dom.profilePhone.textContent = currentUser.phone;
    dom.profileBio.textContent = chat.bio || currentUser.bio;
}

// ===== Reply Preview =====
export function showReplyPreview(msg) {
    let preview = dom.messageInput.parentElement.querySelector('.reply-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'reply-preview';
        dom.messageInput.parentElement.insertBefore(preview, dom.messageInput);
    }
    preview.innerHTML = `
        <div class="reply-preview-content">
            <div class="reply-preview-bar"></div>
            <div class="reply-preview-info">
                <div class="reply-preview-name">${state.currentChat.name}</div>
                <div class="reply-preview-text">${escapeHtml(msg.text || 'Media')}</div>
            </div>
            <button class="reply-preview-cancel" onclick="window.dispatchEvent(new CustomEvent('cancelReply'))">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    preview.style.display = 'block';
}

export function hideReplyPreview() {
    const preview = dom.messageInput.parentElement.querySelector('.reply-preview');
    if (preview) {
        preview.style.display = 'none';
    }
}

// ===== Edit Preview =====
export function showEditPreview(msg) {
    let preview = dom.messageInput.parentElement.querySelector('.edit-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'edit-preview';
        dom.messageInput.parentElement.insertBefore(preview, dom.messageInput);
    }
    preview.innerHTML = `
        <div class="edit-preview-content">
            <div class="edit-preview-info">
                <i class="fas fa-pen edit-preview-icon"></i>
                <div class="edit-preview-details">
                    <span class="edit-preview-label">Edit message</span>
                    ${msg?.text ? `<span class="edit-preview-text">${escapeHtml(msg.text.substring(0, 50))}${msg.text.length > 50 ? '...' : ''}</span>` : ''}
                </div>
            </div>
            <button class="edit-preview-cancel" onclick="window.dispatchEvent(new CustomEvent('cancelEdit'))">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    preview.style.display = 'block';
}

export function hideEditPreview() {
    const preview = dom.messageInput.parentElement.querySelector('.edit-preview');
    if (preview) {
        preview.style.display = 'none';
    }
}

// ===== Forward Modal =====
export function renderForwardChats() {
    const forwardList = document.getElementById('forwardChatList');
    if (!forwardList) return;

    forwardList.innerHTML = chatsData.filter(c => c.id !== state.currentChat?.id).map(chat => `
        <div class="forward-chat-item" data-chat-id="${chat.id}">
            <img src="${chat.avatar}" alt="${chat.name}" class="forward-chat-avatar">
            <div class="forward-chat-info">
                <div class="forward-chat-name">${escapeHtml(chat.name)}</div>
                <div class="forward-chat-status">${chat.online ? 'online' : 'last seen recently'}</div>
            </div>
            <i class="fas fa-chevron-right forward-chat-chevron"></i>
        </div>
    `).join('');

    document.querySelectorAll('.forward-chat-item').forEach(item => {
        item.addEventListener('click', () => {
            const chatId = parseInt(item.dataset.chatId);
            window.dispatchEvent(new CustomEvent('forwardToChat', { detail: { chatId } }));
        });
    });
}

