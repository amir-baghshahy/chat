// ==========================================
// TELEGRAM WEB CLONE - FULL JAVASCRIPT
// ==========================================

// ===== Current User Profile =====
const currentUser = {
    firstName: 'John',
    lastName: 'Doe',
    username: '@johndoe',
    bio: 'Hey there! I am using Telegram.',
    phone: '+1 234 567 8900',
    avatar: 'https://i.pravatar.cc/150?img=10'
};

// ===== Call History Data =====
const callHistoryData = [
    { id: 1, name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=1', type: 'incoming', duration: '5:23', time: 'Today 12:30', missed: false },
    { id: 2, name: 'Mary Johnson', avatar: 'https://i.pravatar.cc/150?img=3', type: 'outgoing', duration: '12:45', time: 'Today 10:20', missed: false },
    { id: 3, name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?img=5', type: 'incoming', duration: '0:00', time: 'Yesterday 18:00', missed: true },
    { id: 4, name: 'Sarah Davis', avatar: 'https://i.pravatar.cc/150?img=7', type: 'video', duration: '3:10', time: 'Monday 15:30', missed: false },
    { id: 5, name: 'Developers Group', avatar: 'https://i.pravatar.cc/150?img=2', type: 'outgoing', duration: '25:00', time: 'Monday 11:00', missed: false }
];

// ===== Mock Data - Sample Chats and Messages =====
const chatsData = [
    {
        id: 1,
        name: 'John Smith',
        username: '@johnsmith',
        avatar: 'https://i.pravatar.cc/150?img=1',
        lastMessage: 'Check out this photo!',
        time: '12:30',
        unread: 2,
        online: true,
        messages: [
            { id: 1, text: 'Hey there!', time: '12:25', outgoing: true, status: 'read' },
            { id: 2, type: 'image', url: 'https://picsum.photos/400/300?random=1', text: 'Check out this photo!', time: '12:30', outgoing: false }
        ]
    },
    {
        id: 2,
        name: 'Developers Group',
        avatar: 'https://i.pravatar.cc/150?img=2',
        lastMessage: 'Sarah: Great tutorial video!',
        time: '11:45',
        unread: 5,
        online: false,
        messages: [
            { id: 1, text: 'Hello everyone', time: '11:30', outgoing: false },
            { id: 2, text: 'Hi!', time: '11:35', outgoing: true, status: 'read' },
            { id: 3, type: 'video', url: 'https://picsum.photos/400/300?random=2', text: 'Great tutorial video!', time: '11:45', outgoing: false }
        ]
    },
    {
        id: 3,
        name: 'Mary Johnson',
        username: '@maryj',
        avatar: 'https://i.pravatar.cc/150?img=3',
        lastMessage: 'Thanks a lot',
        time: '10:20',
        unread: 0,
        online: true,
        messages: [
            { id: 1, type: 'image', url: 'https://picsum.photos/400/300?random=3', text: 'I sent the file', time: '10:15', outgoing: true, status: 'read' },
            { id: 2, text: 'Thanks a lot', time: '10:20', outgoing: false }
        ]
    },
    {
        id: 4,
        name: 'News Channel',
        avatar: 'https://i.pravatar.cc/150?img=4',
        lastMessage: 'Breaking news:...',
        time: '09:00',
        unread: 0,
        online: false,
        messages: [
            { id: 1, text: 'Breaking news: Today major changes happened in the tech world...', time: '09:00', outgoing: false }
        ]
    },
    {
        id: 5,
        name: 'David Wilson',
        username: '@davidw',
        avatar: 'https://i.pravatar.cc/150?img=5',
        lastMessage: 'See you tomorrow',
        time: 'Yesterday',
        unread: 0,
        online: false,
        messages: [
            { id: 1, text: 'Free tomorrow?', time: '18:00', outgoing: false },
            { id: 2, text: 'Yeah, what time?', time: '18:05', outgoing: true, status: 'read' },
            { id: 3, text: 'See you tomorrow', time: '18:10', outgoing: false }
        ]
    },
    {
        id: 6,
        name: 'Friends Group',
        avatar: 'https://i.pravatar.cc/150?img=6',
        lastMessage: 'Mike: Let\'s grab dinner',
        time: 'Yesterday',
        unread: 12,
        online: false,
        messages: [
            { id: 1, type: 'image', url: 'https://picsum.photos/400/300?random=4', text: 'Anyone free Friday?', time: '15:00', outgoing: false },
            { id: 2, text: 'Let\'s grab dinner', time: '15:30', outgoing: false }
        ]
    },
    {
        id: 7,
        name: 'Sarah Davis',
        username: '@sarahd',
        avatar: 'https://i.pravatar.cc/150?img=7',
        lastMessage: 'Done 👍',
        time: 'Monday',
        unread: 0,
        online: true,
        messages: [
            { id: 1, text: 'Did you finish the project?', time: '10:00', outgoing: true, status: 'read' },
            { id: 2, text: 'Done 👍', time: '10:30', outgoing: false }
        ]
    },
    {
        id: 8,
        name: 'Tech Updates',
        avatar: 'https://i.pravatar.cc/150?img=8',
        lastMessage: 'New system login detected',
        time: 'Monday',
        unread: 0,
        online: false,
        messages: [
            { id: 1, text: 'New system login detected', time: '09:00', outgoing: false }
        ]
    },
    {
        id: 999,
        name: 'Saved Messages',
        isSaved: true,
        avatar: 'https://web.telegram.org/img/file_icon_7.png',
        lastMessage: 'Important notes...',
        time: 'Recently',
        unread: 0,
        online: false,
        messages: [
            { id: 1, text: 'My important notes and saved messages', time: '10:00', outgoing: true, status: 'read' },
            { id: 2, type: 'image', url: 'https://picsum.photos/400/300?random=5', text: 'Saved photo', time: '11:00', outgoing: true, status: 'read' }
        ]
    }
];

// Contacts data for modal
const contactsData = [
    { id: 1, name: 'Alice Brown', username: '@aliceb', avatar: 'https://i.pravatar.cc/150?img=11', status: 'online' },
    { id: 2, name: 'Bob Taylor', username: '@bobtaylor', avatar: 'https://i.pravatar.cc/150?img=12', status: 'last seen recently' },
    { id: 3, name: 'Charlie Miller', username: '@charlie_m', avatar: 'https://i.pravatar.cc/150?img=13', status: 'online' },
    { id: 4, name: 'Diana Garcia', username: '@dianag', avatar: 'https://i.pravatar.cc/150?img=14', status: 'last seen yesterday' },
    { id: 5, name: 'Edward Martinez', username: '@edward_m', avatar: 'https://i.pravatar.cc/150?img=15', status: 'online' },
    { id: 6, name: 'Fiona Anderson', username: '@fionaa', avatar: 'https://i.pravatar.cc/150?img=16', status: 'last seen 2h ago' },
    { id: 7, name: 'George Thomas', username: '@geothomas', avatar: 'https://i.pravatar.cc/150?img=17', status: 'online' },
    { id: 8, name: 'Hannah Jackson', username: '@hannahj', avatar: 'https://i.pravatar.cc/150?img=18', status: 'last seen recently' }
];

// ===== State Management =====
let currentChat = null;
let isMobile = window.innerWidth <= 768;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let selectedMembers = new Set();
let activeCall = null;
let callDuration = 0;
let callInterval = null;
let isMuted = false;
let isVideoOn = true;
let selectedChatId = null;
// Reply/Forward/Edit state
let replyingTo = null;
let editingMessage = null;
let forwardingMessage = null;

// ===== DOM Elements =====
const chatList = document.getElementById('chatList');
const chatView = document.getElementById('chatView');
const emptyState = document.getElementById('emptyState');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const sidebar = document.getElementById('sidebar');
const chatArea = document.getElementById('chatArea');
const backBtn = document.getElementById('backBtn');
const chatInfo = document.getElementById('chatInfo');
const chatAvatar = document.getElementById('chatAvatar');
const chatName = document.getElementById('chatName');
const chatStatus = document.getElementById('chatStatus');
const headerAvatar = document.getElementById('headerAvatar');
const headerName = document.getElementById('headerName');
const headerStatus = document.getElementById('headerStatus');
const searchInput = document.getElementById('searchInput');

// Hamburger menu elements
const menuBtn = document.getElementById('menuBtn');
const hamburgerMenu = document.getElementById('hamburgerMenu');
const menuOverlay = document.getElementById('menuOverlay');
const darkModeToggle = document.getElementById('darkModeToggle');

// Modal elements
const settingsModal = document.getElementById('settingsModal');
const privacyModal = document.getElementById('privacyModal');
const chatSettingsModal = document.getElementById('chatSettingsModal');
const myAccountModal = document.getElementById('myAccountModal');
const newGroupModal = document.getElementById('newGroupModal');
const contactsModal = document.getElementById('contactsModal');
const profileModal = document.getElementById('profileModal');
const callHistoryModal = document.getElementById('callHistoryModal');
const forwardModal = document.getElementById('forwardModal');
const closeSettings = document.getElementById('closeSettings');
const backFromPrivacy = document.getElementById('backFromPrivacy');
const closePrivacy = document.getElementById('closePrivacy');
const backFromChatSettings = document.getElementById('backFromChatSettings');
const closeChatSettings = document.getElementById('closeChatSettings');
const backFromMyAccount = document.getElementById('backFromMyAccount');
const closeMyAccount = document.getElementById('closeMyAccount');
const closeNewGroup = document.getElementById('closeNewGroup');
const closeContacts = document.getElementById('closeContacts');
const closeProfile = document.getElementById('closeProfile');
const closeCallHistory = document.getElementById('closeCallHistory');
const closeForward = document.getElementById('closeForward');
const settingsDarkMode = document.getElementById('settingsDarkMode');
const memberList = document.getElementById('memberList');
const contactsList = document.getElementById('contactsList');
const contactsSearchInput = document.getElementById('contactsSearchInput');
const groupNameInput = document.getElementById('groupNameInput');
const createGroupBtn = document.getElementById('createGroupBtn');
const toastContainer = document.getElementById('toastContainer');

// New elements
const fileInput = document.getElementById('fileInput');
const chatActionsMenu = document.getElementById('chatActionsMenu');
const headerOnlineIndicator = document.getElementById('headerOnlineIndicator');
const callModal = document.getElementById('callModal');
const callAvatarEl = document.getElementById('callAvatar');
const callNameEl = document.getElementById('callName');
const callStatusEl = document.getElementById('callStatus');
const callDurationEl = document.getElementById('callDuration');
const endCallBtn = document.getElementById('endCallBtn');
const muteBtn = document.getElementById('muteBtn');
const videoBtn = document.getElementById('videoBtn');
const emojiPicker = document.getElementById('emojiPicker');
const emojiGrid = document.getElementById('emojiGrid');
const emojiSearch = document.getElementById('emojiSearch');
const emojiClose = document.getElementById('emojiClose');

// Emoji data
const emojiData = {
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙'],
    people: ['👋', '🤚', '👋', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜'],
    animals: ['🐱', '🐶', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆'],
    food: ['🍕', '🍔', '🍟', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🧇', '🥞', '🧈', '🍞', '🥐', '🥖', '🥨', '🧀', '🥗', '🥙', '🧆'],
    activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🪁'],
    objects: ['💡', '🔦', '🏮', '🪔', '📱', '💻', '🖥️', '🖨️', '⌨️', '🖱️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📞']
};

// ===== Toast Notification System =====
function showToast(title, message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';

    const iconMap = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    toast.innerHTML = `
        <div class="toast-icon ${type}">
            <i class="fas ${iconMap[type]}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            ${message ? `<div class="toast-message">${message}</div>` : ''}
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    const timeout = setTimeout(() => {
        removeToast(toast);
    }, duration);

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(timeout);
        removeToast(toast);
    });
}

function removeToast(toast) {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => {
        toast.remove();
    });
}

// ===== Initialization =====
function init() {
    if (isDarkMode) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        if (settingsDarkMode) settingsDarkMode.checked = true;
    }

    renderChatList();
    renderMemberList();
    renderContactsList();
    renderEmojis('smileys');

    // Add chat context menu listeners
    addChatContextMenuListeners();

    // Setup settings items click handlers
    setupSettingsItems();

    if (window.innerWidth > 768) {
        searchInput.focus();
    }

    showToast('Welcome to Telegram!', 'Your messages are synced across all your devices', 'info', 4000);
}

// ===== Dark Mode Toggle =====
function toggleDarkMode(enabled) {
    isDarkMode = enabled;
    localStorage.setItem('darkMode', enabled);

    if (enabled) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        if (settingsDarkMode) settingsDarkMode.checked = true;
        showToast('Dark Mode Enabled', '', 'success');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        if (settingsDarkMode) settingsDarkMode.checked = false;
        showToast('Light Mode Enabled', '', 'success');
    }
}

// ===== Hamburger Menu =====
function openHamburgerMenu() {
    hamburgerMenu.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeHamburgerMenu() {
    hamburgerMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Render Chat List =====
function renderChatList(filter = '') {
    const filteredChats = filter
        ? chatsData.filter(chat =>
            chat.name.toLowerCase().includes(filter.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(filter.toLowerCase())
          )
        : chatsData;

    chatList.innerHTML = filteredChats.map(chat => `
        <div class="chat-item ${currentChat?.id === chat.id ? 'active' : ''}" data-chat-id="${chat.id}">
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
            openChat(chatId);
        });
    });

    // Add context menu listeners to new chat items
    addChatContextMenuListeners();
}

// ===== Open Chat =====
function openChat(chatId) {
    const chat = chatsData.find(c => c.id === chatId);
    if (!chat) return;

    currentChat = chat;
    chat.unread = 0;

    headerAvatar.src = chat.avatar;
    headerName.textContent = chat.name;
    headerStatus.textContent = chat.online ? 'online' : 'last seen recently';

    // Update online indicator
    if (chat.online) {
        headerOnlineIndicator.classList.add('online');
    } else {
        headerOnlineIndicator.classList.remove('online');
    }

    chatAvatar.src = chat.avatar;
    chatName.textContent = chat.name;
    chatStatus.textContent = chat.online ? 'online' : 'last seen recently';

    emptyState.style.display = 'none';
    chatView.style.display = 'flex';

    renderMessages(chat.messages);
    renderChatList(searchInput.value);

    closeHamburgerMenu();
    closeChatActionsMenu();

    if (window.innerWidth <= 768) {
        sidebar.classList.add('hidden');
        chatArea.classList.add('visible');
        backBtn.style.display = 'block';
        chatInfo.style.display = 'flex';
    }

    setTimeout(() => messageInput.focus(), 100);
}

// ===== Render Messages =====
function renderMessages(messages) {
    messagesContainer.innerHTML = `
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
                    ` : msg.type === 'audio' ? `
                        <div class="message-audio">
                            <div class="message-audio-icon">
                                <i class="fas fa-play"></i>
                            </div>
                            <div class="message-audio-waveform"></div>
                            <div class="message-audio-duration">0:15</div>
                        </div>
                    ` : msg.type === 'file' ? `
                        <div class="message-file">
                            <div class="message-file-icon">
                                <i class="fas fa-file"></i>
                            </div>
                            <div class="message-file-info">
                                <div class="message-file-name">${escapeHtml(msg.text)}</div>
                                <div class="message-file-size">2.4 MB</div>
                            </div>
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

    // Add context menu listeners to messages
    addMessageContextMenuListeners();

    // Add double-click listener for reply (on incoming messages only)
    document.querySelectorAll('.message.incoming').forEach(msgEl => {
        msgEl.addEventListener('dblclick', () => {
            const messageId = parseInt(msgEl.dataset.messageId);
            startReply(messageId);
        });
    });

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ===== Send Message =====
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentChat) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // Handle Edit Mode
    if (editingMessage) {
        const msg = currentChat.messages.find(m => m.id === editingMessage);
        if (msg) {
            msg.text = text;
            msg.edited = true;
            renderMessages(currentChat.messages);
            cancelEdit();
            showToast('Message Edited', '', 'success', 1500);
        }
        return;
    }

    // Handle Reply Mode
    if (replyingTo) {
        const repliedMsg = currentChat.messages.find(m => m.id === replyingTo);
        const newMessage = {
            id: currentChat.messages.length + 1,
            text: text,
            time: time,
            outgoing: true,
            status: 'sent',
            replyTo: repliedMsg ? {
                id: repliedMsg.id,
                text: repliedMsg.text,
                name: currentChat.name
            } : undefined
        };

        currentChat.messages.push(newMessage);
        currentChat.lastMessage = text;
        currentChat.time = time;

        cancelReply();
        messageInput.value = '';

        renderMessages(currentChat.messages);
        renderChatList(searchInput.value);

        showToast('Reply Sent', '', 'success', 2000);

        setTimeout(() => {
            newMessage.status = 'read';
            const statusIcon = messagesContainer.querySelector(`[data-message-id="${newMessage.id}"] .message-status`);
            if (statusIcon) {
                statusIcon.classList.remove('sent');
                statusIcon.classList.add('read');
            }
        }, 1000);
        return;
    }

    // Regular Message
    const newMessage = {
        id: currentChat.messages.length + 1,
        text: text,
        time: time,
        outgoing: true,
        status: 'sent'
    };

    currentChat.messages.push(newMessage);
    currentChat.lastMessage = text;
    currentChat.time = time;

    messageInput.value = '';

    renderMessages(currentChat.messages);
    renderChatList(searchInput.value);

    showToast('Message Sent', '', 'success', 2000);

    // Update only the message status, don't re-render everything
    setTimeout(() => {
        newMessage.status = 'read';
        const statusIcon = messagesContainer.querySelector(`[data-message-id="${newMessage.id}"] .message-status`);
        if (statusIcon) {
            statusIcon.classList.remove('sent');
            statusIcon.classList.add('read');
        }
    }, 1000);
}

// ===== Escape HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Back Button (Mobile) =====
function goBack() {
    sidebar.classList.remove('hidden');
    chatArea.classList.remove('visible');
    backBtn.style.display = 'none';
    chatInfo.style.display = 'none';
    currentChat = null;
    renderChatList(searchInput.value);
}

// ===== Reply, Edit, Forward Helper Functions =====

function startReply(messageId) {
    const msg = currentChat?.messages.find(m => m.id === messageId);
    if (!msg) return;

    replyingTo = messageId;
    editingMessage = null;
    showReplyPreview(msg);
    messageInput.focus();
}

function cancelReply() {
    replyingTo = null;
    hideReplyPreview();
}

function handleEdit(messageId) {
    const msg = currentChat?.messages.find(m => m.id === messageId);
    if (!msg || !msg.text) return;

    editingMessage = messageId;
    replyingTo = null;
    showEditPreview(msg);
    messageInput.value = msg.text;
    messageInput.focus();
}

function cancelEdit() {
    editingMessage = null;
    hideEditPreview();
    messageInput.placeholder = 'Write a message...';
}

function handleForward(messageId) {
    const msg = currentChat?.messages.find(m => m.id === messageId);
    if (!msg) return;

    forwardingMessage = messageId;
    openForwardModal();
}

function showReplyPreview(msg) {
    let preview = messageInput.parentElement.querySelector('.reply-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'reply-preview';
        messageInput.parentElement.insertBefore(preview, messageInput);
    }
    preview.innerHTML = `
        <div class="reply-preview-content">
            <div class="reply-preview-bar"></div>
            <div class="reply-preview-info">
                <div class="reply-preview-name">${currentChat.name}</div>
                <div class="reply-preview-text">${escapeHtml(msg.text || 'Media')}</div>
            </div>
            <button class="reply-preview-cancel" onclick="cancelReply()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    preview.style.display = 'block';
    preview.classList.add('active');
}

function hideReplyPreview() {
    const preview = messageInput.parentElement.querySelector('.reply-preview');
    if (preview) {
        preview.style.display = 'none';
        preview.classList.remove('active');
    }
}

function showEditPreview(msg) {
    let preview = messageInput.parentElement.querySelector('.edit-preview');
    if (!preview) {
        preview = document.createElement('div');
        preview.className = 'edit-preview';
        messageInput.parentElement.insertBefore(preview, messageInput);
    }
    preview.innerHTML = `
        <div class="edit-preview-content">
            <div class="edit-preview-info">
                <i class="fas fa-pen edit-preview-icon"></i>
                <div class="edit-preview-details">
                    <span class="edit-preview-label">Edit message</span>
                    <span class="edit-preview-text">${escapeHtml(msg.text.substring(0, 50))}${msg.text.length > 50 ? '...' : ''}</span>
                </div>
            </div>
            <button class="edit-preview-cancel" onclick="cancelEdit()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    preview.style.display = 'block';
    preview.classList.add('active');
}

function hideEditPreview() {
    const preview = messageInput.parentElement.querySelector('.edit-preview');
    if (preview) {
        preview.style.display = 'none';
        preview.classList.remove('active');
    }
}

function openForwardModal() {
    renderForwardChats();
    openModal(forwardModal);
}

function renderForwardChats() {
    const forwardList = document.getElementById('forwardChatList');
    if (!forwardList) return;

    forwardList.innerHTML = chatsData.filter(c => c.id !== currentChat?.id).map(chat => `
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
            handleForwardToChat(chatId);
        });
    });
}

function handleForwardToChat(targetChatId) {
    if (!forwardingMessage) return;

    const sourceChat = currentChat;
    const msg = sourceChat?.messages.find(m => m.id === forwardingMessage);
    if (!msg) return;

    const targetChat = chatsData.find(c => c.id === targetChatId);
    if (!targetChat) return;

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

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

    forwardingMessage = null;
    closeModal(forwardModal);

    if (currentChat?.id === targetChatId) {
        renderMessages(targetChat.messages);
    }
    renderChatList(searchInput.value);
    showToast('Forwarded', `Message forwarded to ${targetChat.name}`, 'success');
}

// ===== Modal Functions =====
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Profile Modal =====
function openProfileModal() {
    if (!currentChat) return;

    // Update profile modal content
    document.getElementById('profileAvatar').src = currentChat.avatar || currentUser.avatar;
    document.getElementById('profileName').textContent = currentChat.name || currentUser.firstName + ' ' + currentUser.lastName;
    document.getElementById('profileStatus').textContent = currentChat.online ? 'online' : 'last seen recently';
    document.getElementById('profileUsername').textContent = currentChat.username || currentUser.username;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    document.getElementById('profileBio').textContent = currentChat.bio || currentUser.bio;

    openModal(profileModal);
}

function renderCallHistory() {
    const callHistoryList = document.getElementById('callHistoryList');
    callHistoryList.innerHTML = callHistoryData.map(call => `
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

function openCallHistoryModal() {
    renderCallHistory();
    openModal(callHistoryModal);
}

// ===== Chat Actions Menu (Three-dot) =====
function toggleChatActionsMenu() {
    if (chatActionsMenu.classList.contains('active')) {
        closeChatActionsMenu();
    } else {
        chatActionsMenu.classList.add('active');
    }
}

function closeChatActionsMenu() {
    chatActionsMenu.classList.remove('active');
}

// ===== File Upload =====
function handleFileUpload() {
    fileInput.click();
}

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        const fileNames = Array.from(files).map(f => f.name).join(', ');
        showToast('File Selected', `${files.length} file(s): ${fileNames}`, 'success');

        // Reset for next upload
        setTimeout(() => {
            fileInput.value = '';
        }, 100);
    }
});

// ===== Call Functions =====
function startCall(type) {
    if (!currentChat) return;

    activeCall = type;
    callDuration = 0;

    callAvatarEl.src = currentChat.avatar;
    callNameEl.textContent = currentChat.name;
    callStatusEl.textContent = type === 'video' ? 'Video calling...' : 'Calling...';
    callDurationEl.textContent = '00:00';

    callModal.classList.add('active');

    // Simulate call connecting after 2 seconds
    setTimeout(() => {
        if (activeCall) {
            callStatusEl.textContent = 'Connected';
            startCallDuration();
        }
    }, 2000);
}

function startCallDuration() {
    callInterval = setInterval(() => {
        callDuration++;
        const minutes = Math.floor(callDuration / 60).toString().padStart(2, '0');
        const seconds = (callDuration % 60).toString().padStart(2, '0');
        callDurationEl.textContent = `${minutes}:${seconds}`;
    }, 1000);
}

function endCall() {
    if (callInterval) {
        clearInterval(callInterval);
        callInterval = null;
    }

    activeCall = null;
    callDuration = 0;

    callModal.classList.remove('active');
    showToast('Call Ended', `Duration: ${callDurationEl.textContent}`, 'info');
}

function toggleMute() {
    isMuted = !isMuted;
    muteBtn.classList.toggle('active', isMuted);
    muteBtn.innerHTML = isMuted ? '<i class="fas fa-microphone-slash"></i>' : '<i class="fas fa-microphone"></i>';
}

function toggleVideo() {
    isVideoOn = !isVideoOn;
    videoBtn.classList.toggle('active', !isVideoOn);
}

// ===== Emoji Picker =====
function toggleEmojiPicker() {
    if (emojiPicker.classList.contains('active')) {
        emojiPicker.classList.remove('active');
    } else {
        emojiPicker.classList.add('active');
        messageInput.focus();
    }
}

function closeEmojiPicker() {
    emojiPicker.classList.remove('active');
}

function renderEmojis(category) {
    const emojis = emojiData[category] || emojiData.smileys;

    emojiGrid.innerHTML = emojis.map(emoji => `
        <div class="emoji-item" data-emoji="${emoji}">${emoji}</div>
    `).join('');

    document.querySelectorAll('.emoji-item').forEach(item => {
        item.addEventListener('click', () => {
            const emoji = item.dataset.emoji;
            messageInput.value += emoji;
            messageInput.focus();
        });
    });
}

// ===== Render Member List =====
function renderMemberList(filter = '') {
    const filteredContacts = filter
        ? contactsData.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
        : contactsData;

    memberList.innerHTML = filteredContacts.map(contact => `
        <div class="member-item ${selectedMembers.has(contact.id) ? 'selected' : ''}" data-member-id="${contact.id}">
            <img src="${contact.avatar}" alt="${contact.name}">
            <span class="member-item-name">${contact.name}</span>
            <div class="member-checkbox">
                ${selectedMembers.has(contact.id) ? '<i class="fas fa-check"></i>' : ''}
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.member-item').forEach(item => {
        item.addEventListener('click', () => {
            const memberId = parseInt(item.dataset.memberId);
            if (selectedMembers.has(memberId)) {
                selectedMembers.delete(memberId);
            } else {
                selectedMembers.add(memberId);
            }
            renderMemberList(filter);
        });
    });
}

// ===== Render Contacts List =====
function renderContactsList(filter = '') {
    const filteredContacts = filter
        ? contactsData.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )
        : contactsData;

    contactsList.innerHTML = filteredContacts.map(contact => `
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
            closeModal(contactsModal);
            showToast('Chat Opened', `Starting conversation with ${contact.name}`, 'success');
        });
    });
}

// ===== Hamburger Menu Actions =====
function handleMenuAction(action) {
    closeHamburgerMenu();

    switch(action) {
        case 'new-group':
            openModal(newGroupModal);
            showToast('New Group', 'Create a group to start chatting with multiple people', 'info');
            break;
        case 'contacts':
            openModal(contactsModal);
            break;
        case 'calls':
            openCallHistoryModal();
            break;
        case 'saved':
            openChat(999); // Saved Messages chat ID
            break;
        case 'settings':
            openModal(settingsModal);
            break;
        case 'dark-mode':
            toggleDarkMode(!isDarkMode);
            break;
        case 'help':
            showToast('Help Center', 'Telegram FAQ and support', 'info');
            break;
    }
}

// ===== Chat Action Handlers =====
function handleChatAction(action) {
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
            const attachBtn = document.querySelector('.attach-btn');
            showAttachmentMenu(attachBtn);
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

// ===== Event Listeners =====
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

backBtn.addEventListener('click', goBack);

searchInput.addEventListener('input', (e) => {
    renderChatList(e.target.value);
});

menuBtn.addEventListener('click', openHamburgerMenu);
menuOverlay.addEventListener('click', closeHamburgerMenu);

if (settingsDarkMode) {
    settingsDarkMode.addEventListener('change', (e) => {
        toggleDarkMode(e.target.checked);
    });
}

document.querySelectorAll('.menu-item[data-action]').forEach(item => {
    item.addEventListener('click', () => {
        handleMenuAction(item.dataset.action);
    });
});

closeSettings.addEventListener('click', () => closeModal(settingsModal));
closeNewGroup.addEventListener('click', () => closeModal(newGroupModal));
closeContacts.addEventListener('click', () => closeModal(contactsModal));
closeProfile.addEventListener('click', () => closeModal(profileModal));
closeCallHistory.addEventListener('click', () => closeModal(callHistoryModal));
closeForward.addEventListener('click', () => {
    closeModal(forwardModal);
    forwardingMessage = null;
});

// Privacy modal listeners
backFromPrivacy.addEventListener('click', () => {
    closeModal(privacyModal);
    openModal(settingsModal);
});
closePrivacy.addEventListener('click', () => closeModal(privacyModal));

// Chat settings modal listeners
backFromChatSettings.addEventListener('click', () => {
    closeModal(chatSettingsModal);
    openModal(settingsModal);
});
closeChatSettings.addEventListener('click', () => closeModal(chatSettingsModal));

// My Account modal listeners
backFromMyAccount.addEventListener('click', () => {
    closeModal(myAccountModal);
    openModal(settingsModal);
});
closeMyAccount.addEventListener('click', () => closeModal(myAccountModal));

[settingsModal, privacyModal, chatSettingsModal, myAccountModal, newGroupModal, contactsModal, profileModal, callHistoryModal, forwardModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
            if (modal === forwardModal) {
                forwardingMessage = null;
            }
        }
    });
});

// Make chat header clickable to show profile
const chatHeaderInfo = document.querySelector('.chat-header-info');
if (chatHeaderInfo) {
    chatHeaderInfo.style.cursor = 'pointer';
    chatHeaderInfo.addEventListener('click', () => {
        openProfileModal();
    });
}

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
        const action = item.dataset.action;
        handleChatAction(action);
        closeChatActionsMenu();
    });
});

contactsSearchInput.addEventListener('input', (e) => {
    renderContactsList(e.target.value);
});

createGroupBtn.addEventListener('click', () => {
    const groupName = groupNameInput.value.trim();
    if (!groupName) {
        showToast('Error', 'Please enter a group name', 'error');
        return;
    }
    if (selectedMembers.size === 0) {
        showToast('Error', 'Please select at least one member', 'error');
        return;
    }

    showToast('Group Created', 'Group: ' + groupName + ' with ' + selectedMembers.size + ' members', 'success');

    groupNameInput.value = '';
    selectedMembers.clear();
    renderMemberList();
    closeModal(newGroupModal);
});

// Call buttons
endCallBtn.addEventListener('click', endCall);
muteBtn.addEventListener('click', toggleMute);
videoBtn.addEventListener('click', toggleVideo);

// Emoji picker
emojiClose.addEventListener('click', closeEmojiPicker);

document.querySelectorAll('.emoji-category').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.emoji-category').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderEmojis(btn.dataset.category);
    });
});

emojiSearch.addEventListener('input', (e) => {
    const filter = e.target.value.toLowerCase();
    const allEmojis = Object.values(emojiData).flat();
    const filtered = allEmojis.filter(emoji => emoji.includes(filter));

    emojiGrid.innerHTML = filtered.map(emoji => '<div class="emoji-item" data-emoji="' + emoji + '">' + emoji + '</div>').join('');

    document.querySelectorAll('.emoji-item').forEach(item => {
        item.addEventListener('click', () => {
            messageInput.value += item.dataset.emoji;
            messageInput.focus();
        });
    });
});

// Close menus when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.chat-header-actions') && !e.target.closest('.chat-actions-menu')) {
        closeChatActionsMenu();
    }
});

// ===== Message Context Menu (Right-click) =====
let messageContextMenu = null;
let selectedMessageId = null;

function createMessageContextMenu() {
    if (messageContextMenu) {
        messageContextMenu.remove();
    }

    messageContextMenu = document.createElement('div');
    messageContextMenu.className = 'message-context-menu';
    messageContextMenu.innerHTML = `
        <div class="message-context-item" data-action="reply">
            <i class="fas fa-reply"></i>
            <span>Reply</span>
        </div>
        <div class="message-context-item" data-action="forward">
            <i class="fas fa-share"></i>
            <span>Forward</span>
        </div>
        <div class="message-context-divider"></div>
        <div class="message-context-item" data-action="edit">
            <i class="fas fa-pen"></i>
            <span>Edit</span>
        </div>
        <div class="message-context-item" data-action="delete">
            <i class="fas fa-trash"></i>
            <span>Delete</span>
        </div>
    `;

    document.body.appendChild(messageContextMenu);

    messageContextMenu.querySelectorAll('.message-context-item').forEach(item => {
        item.addEventListener('click', () => {
            handleMessageContextAction(item.dataset.action);
            hideMessageContextMenu();
        });
    });
}

function showMessageContextMenu(x, y, messageId) {
    selectedMessageId = messageId;
    if (!messageContextMenu) {
        createMessageContextMenu();
    }

    messageContextMenu.style.left = x + 'px';
    messageContextMenu.style.top = y + 'px';
    messageContextMenu.classList.add('active');
}

function hideMessageContextMenu() {
    if (messageContextMenu) {
        messageContextMenu.classList.remove('active');
    }
}

function handleMessageContextAction(action) {
    const msg = currentChat.messages.find(m => m.id === selectedMessageId);
    if (!msg) return;

    switch(action) {
        case 'reply':
            startReply(selectedMessageId);
            break;
        case 'forward':
            handleForward(selectedMessageId);
            break;
        case 'edit':
            handleEdit(selectedMessageId);
            break;
        case 'delete':
            const index = currentChat.messages.indexOf(msg);
            if (index > -1) {
                currentChat.messages.splice(index, 1);
                renderMessages(currentChat.messages);
            }
            showToast('Deleted', 'Message deleted', 'success');
            break;
    }
}

function addMessageContextMenuListeners() {
    document.querySelectorAll('.message-bubble').forEach(bubble => {
        const messageEl = bubble.closest('.message');
        const messageId = parseInt(messageEl.dataset.messageId);

        messageEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showMessageContextMenu(e.clientX, e.clientY, messageId);
        });

        // For mobile - long press
        let longPressTimer;
        messageEl.addEventListener('touchstart', () => {
            longPressTimer = setTimeout(() => {
                const touch = e.touches[0];
                showMessageContextMenu(touch.clientX, touch.clientY, messageId);
            }, 500);
        });

        messageEl.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });

        messageEl.addEventListener('touchmove', () => {
            clearTimeout(longPressTimer);
        });
    });
}

// ===== Chat List Context Menu =====
let chatContextMenu = null;

function createChatContextMenu() {
    if (chatContextMenu) {
        chatContextMenu.remove();
    }

    chatContextMenu = document.createElement('div');
    chatContextMenu.className = 'chat-context-menu';
    chatContextMenu.innerHTML = `
        <div class="chat-context-item" data-action="mark-read">
            <i class="fas fa-check-double"></i>
            <span>Mark as Read</span>
        </div>
        <div class="chat-context-item" data-action="mute">
            <i class="fas fa-bell-slash"></i>
            <span>Mute Notifications</span>
        </div>
        <div class="chat-context-divider"></div>
        <div class="chat-context-item" data-action="archive">
            <i class="fas fa-archive"></i>
            <span>Archive</span>
        </div>
        <div class="chat-context-item" data-action="delete-chat">
            <i class="fas fa-trash"></i>
            <span>Delete Chat</span>
        </div>
    `;

    document.body.appendChild(chatContextMenu);

    chatContextMenu.querySelectorAll('.chat-context-item').forEach(item => {
        item.addEventListener('click', () => {
            handleChatContextAction(item.dataset.action);
            hideChatContextMenu();
        });
    });
}

function showChatContextMenu(x, y, chatId) {
    selectedChatId = chatId;
    if (!chatContextMenu) {
        createChatContextMenu();
    }

    chatContextMenu.style.left = x + 'px';
    chatContextMenu.style.top = y + 'px';
    chatContextMenu.classList.add('active');
}

function hideChatContextMenu() {
    if (chatContextMenu) {
        chatContextMenu.classList.remove('active');
    }
}

function handleChatContextAction(action) {
    const chat = chatsData.find(c => c.id === selectedChatId);
    if (!chat) return;

    switch(action) {
        case 'mark-read':
            chat.unread = 0;
            renderChatList(searchInput.value);
            showToast('Marked as Read', '', 'success');
            break;
        case 'mute':
            showToast('Notifications Muted', `Notifications muted for ${chat.name}`, 'success');
            break;
        case 'archive':
            showToast('Archived', `${chat.name} archived`, 'info');
            break;
        case 'delete-chat':
            const index = chatsData.indexOf(chat);
            if (index > -1) {
                chatsData.splice(index, 1);
                renderChatList(searchInput.value);
                if (currentChat?.id === chat.id) {
                    currentChat = null;
                    emptyState.style.display = 'flex';
                    chatView.style.display = 'none';
                }
            }
            showToast('Chat Deleted', '', 'error');
            break;
    }
}

// Add context menu to chat items
function addChatContextMenuListeners() {
    document.querySelectorAll('.chat-item').forEach(item => {
        const chatId = parseInt(item.dataset.chatId);

        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showChatContextMenu(e.clientX, e.clientY, chatId);
        });

        // For mobile - long press
        let longPressTimer;
        item.addEventListener('touchstart', () => {
            longPressTimer = setTimeout(() => {
                const touch = e.touches[0];
                showChatContextMenu(touch.clientX, touch.clientY, chatId);
            }, 500);
        });

        item.addEventListener('touchend', () => {
            clearTimeout(longPressTimer);
        });

        item.addEventListener('touchmove', () => {
            clearTimeout(longPressTimer);
        });
    });
}

// ===== Media Attachment Menu =====
let attachmentMenu = null;

function createAttachmentMenu() {
    if (attachmentMenu) {
        attachmentMenu.remove();
    }

    attachmentMenu = document.createElement('div');
    attachmentMenu.className = 'attachment-menu';
    attachmentMenu.innerHTML = `
        <div class="attachment-item" data-type="image">
            <i class="fas fa-image"></i>
            <span>Photo</span>
        </div>
        <div class="attachment-item" data-type="video">
            <i class="fas fa-video"></i>
            <span>Video</span>
        </div>
        <div class="attachment-item" data-type="audio">
            <i class="fas fa-microphone"></i>
            <span>Audio</span>
        </div>
        <div class="attachment-item" data-type="file">
            <i class="fas fa-file"></i>
            <span>Document</span>
        </div>
    `;

    document.body.appendChild(attachmentMenu);

    attachmentMenu.querySelectorAll('.attachment-item').forEach(item => {
        item.addEventListener('click', () => {
            handleMediaAttachment(item.dataset.type);
            hideAttachmentMenu();
        });
    });
}

function showAttachmentMenu(button) {
    if (!attachmentMenu) {
        createAttachmentMenu();
    }

    const rect = button.getBoundingClientRect();
    attachmentMenu.style.left = rect.left + 'px';
    attachmentMenu.style.bottom = (window.innerHeight - rect.top + 10) + 'px';
    attachmentMenu.classList.add('active');
}

function hideAttachmentMenu() {
    if (attachmentMenu) {
        attachmentMenu.classList.remove('active');
    }
}

function handleMediaAttachment(type) {
    if (!currentChat) {
        showToast('Error', 'Please select a chat first', 'error');
        return;
    }

    const now = new Date();
    const time = formatTime(now.getHours(), now.getMinutes());

    let newMessage = {
        id: currentChat.messages.length + 1,
        time: time,
        outgoing: true,
        status: 'sent'
    };

    switch(type) {
        case 'image':
            newMessage.type = 'image';
            newMessage.url = `https://picsum.photos/400/300?random=${Date.now()}`;
            newMessage.text = 'Photo';
            break;
        case 'video':
            newMessage.type = 'video';
            newMessage.url = `https://picsum.photos/400/300?random=${Date.now()}`;
            newMessage.text = 'Video';
            break;
        case 'audio':
            newMessage.type = 'audio';
            newMessage.text = '🎤 Voice message (0:15)';
            break;
        case 'file':
            newMessage.type = 'file';
            newMessage.text = '📎 Document: file.pdf (2.4 MB)';
            break;
    }

    currentChat.messages.push(newMessage);
    currentChat.lastMessage = newMessage.text || (newMessage.type === 'image' ? '📷 Photo' : '🎬 Video');
    currentChat.time = time;

    renderMessages(currentChat.messages);
    renderChatList(searchInput.value);

    showToast('Media Sent', `${type.charAt(0).toUpperCase() + type.slice(1)} sent`, 'success', 2000);

    setTimeout(() => {
        newMessage.status = 'read';
        const statusIcon = messagesContainer.querySelector(`[data-message-id="${newMessage.id}"] .message-status`);
        if (statusIcon) {
            statusIcon.classList.remove('sent');
            statusIcon.classList.add('read');
        }
    }, 1000);
}

// ===== Typing Indicator =====
function showTypingIndicator() {
    if (!currentChat) return;

    const existing = document.querySelector('.typing-indicator');
    if (existing) existing.remove();

    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.querySelector('.typing-indicator');
    if (typing) typing.remove();
}

// Show typing indicator when user starts typing
messageInput.addEventListener('input', () => {
    if (messageInput.value.length > 0 && currentChat) {
        // In a real app, this would send to server
        // For demo, we just show it locally
    }
});

// ===== Settings Sub-pages =====
function openSettingsSubPage(page) {
    closeModal(settingsModal);

    const subPages = {
        'notifications': `
            <h2>Notifications</h2>
            <div class="sub-settings">
                <div class="setting-row">
                    <span>Message Notifications</span>
                    <label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>
                </div>
                <div class="setting-row">
                    <span>Sound</span>
                    <label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>
                </div>
                <div class="setting-row">
                    <span>Vibrate</span>
                    <label class="switch"><input type="checkbox" checked><span class="slider round"></span></label>
                </div>
            </div>
        `,
        'privacy': `
            <h2>Privacy & Security</h2>
            <div class="sub-settings">
                <div class="setting-row clickable">
                    <span>Privacy Settings</span>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="setting-row clickable">
                    <span>Two-Step Verification</span>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="setting-row clickable">
                    <span>Active Sessions</span>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `,
        'data-storage': `
            <h2>Data & Storage</h2>
            <div class="sub-settings">
                <div class="setting-row clickable">
                    <span>Storage Usage</span>
                    <i class="fas fa-chevron-right"></i>
                </div>
                <div class="setting-row clickable">
                    <span>Auto-Download Media</span>
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `,
        'chat-settings': `
            <h2>Chat Settings</h2>
            <div class="sub-settings">
                <div class="setting-row">
                    <span>Chat Background</span>
                    <button class="btn-small">Change</button>
                </div>
                <div class="setting-row">
                    <span>Text Size</span>
                    <button class="btn-small">Medium</button>
                </div>
            </div>
        `
    };

    const content = subPages[page] || '<h2>Page Not Found</h2>';

    // Create a temporary modal for the sub-page
    const subModal = document.createElement('div');
    subModal.className = 'modal-overlay active';
    subModal.innerHTML = `
        <div class="modal-content sub-page-modal">
            <div class="modal-header">
                <button class="modal-back-btn" id="backToSettings">
                    <i class="fas fa-arrow-left"></i>
                </button>
                ${content}
                <button class="modal-close-btn" onclick="this.closest('.modal-overlay').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(subModal);
    document.body.style.overflow = 'hidden';

    document.getElementById('backToSettings').addEventListener('click', () => {
        subModal.remove();
        openModal(settingsModal);
    });
}

// Update settings items to be clickable
function setupSettingsItems() {
    document.querySelectorAll('.settings-item').forEach(item => {
        item.addEventListener('click', () => {
            const action = item.dataset.action;
            if (action === 'privacy') {
                closeModal(settingsModal);
                openModal(privacyModal);
            } else if (action === 'chat-settings') {
                closeModal(settingsModal);
                openModal(chatSettingsModal);
            } else if (action === 'notifications') {
                showToast('Notifications', 'Notifications and Sounds settings coming soon', 'info');
            } else if (action === 'my-account') {
                closeModal(settingsModal);
                openModal(myAccountModal);
                showToast('My Account', 'Account settings opened', 'info');
            } else if (action === 'folders') {
                showToast('Folders', 'Chat folders coming soon', 'info');
            } else if (action === 'advanced') {
                showToast('Advanced', 'Advanced settings coming soon', 'info');
            } else if (action === 'speakers') {
                showToast('Speakers and Camera', 'Media settings coming soon', 'info');
            } else if (action === 'battery') {
                showToast('Battery', 'Battery and Animations settings coming soon', 'info');
            } else if (action === 'language') {
                showToast('Language', 'Language settings coming soon', 'info');
            } else if (action === 'interface-scale') {
                showToast('Interface Scale', 'Scale settings coming soon', 'info');
            } else if (action === 'faq') {
                showToast('FAQ', 'Opening Telegram FAQ...', 'info');
            }
        });
    });
}

// ===== Custom Event Listeners for Reply/Edit/Forward =====
window.addEventListener('cancelReply', cancelReply);
window.addEventListener('cancelEdit', cancelEdit);

window.addEventListener('forwardToChat', (e) => {
    handleForwardToChat(e.detail.chatId);
});

// Close context menus when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.message-context-menu') && !e.target.closest('.message')) {
        hideMessageContextMenu();
    }
    if (!e.target.closest('.chat-context-menu') && !e.target.closest('.chat-item')) {
        hideChatContextMenu();
    }
    if (!e.target.closest('.attachment-menu') && !e.target.closest('.attach-btn')) {
        hideAttachmentMenu();
    }
});

window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 768;

    if (wasMobile && !isMobile && currentChat) {
        sidebar.classList.remove('hidden');
        chatArea.classList.remove('visible');
        backBtn.style.display = 'none';
        chatInfo.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (settingsModal.classList.contains('active')) {
            closeModal(settingsModal);
        } else if (privacyModal.classList.contains('active')) {
            closeModal(privacyModal);
        } else if (chatSettingsModal.classList.contains('active')) {
            closeModal(chatSettingsModal);
        } else if (myAccountModal.classList.contains('active')) {
            closeModal(myAccountModal);
        } else if (newGroupModal.classList.contains('active')) {
            closeModal(newGroupModal);
        } else if (contactsModal.classList.contains('active')) {
            closeModal(contactsModal);
        } else if (profileModal.classList.contains('active')) {
            closeModal(profileModal);
        } else if (callHistoryModal.classList.contains('active')) {
            closeModal(callHistoryModal);
        } else if (forwardModal.classList.contains('active')) {
            closeModal(forwardModal);
            forwardingMessage = null;
        } else if (hamburgerMenu.classList.contains('active')) {
            closeHamburgerMenu();
        } else if (callModal.classList.contains('active')) {
            endCall();
        } else if (emojiPicker.classList.contains('active')) {
            closeEmojiPicker();
        } else if (chatActionsMenu.classList.contains('active')) {
            closeChatActionsMenu();
        } else if (replyingTo) {
            cancelReply();
        } else if (editingMessage) {
            cancelEdit();
        }
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// ===== Initialize App =====
init();

console.log('Telegram Web Clone initialized');
console.log('Keyboard shortcuts:');
console.log('  ESC - Close modals/menu');
console.log('  Ctrl/Cmd + K - Focus search');
