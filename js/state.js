// ===== State Module =====
// Application state management

export const state = {
    currentChat: null,
    isMobile: window.innerWidth <= 768,
    isDarkMode: localStorage.getItem('darkMode') === 'true',
    selectedMembers: new Set(),
    activeCall: null,
    callDuration: 0,
    callInterval: null,
    isMuted: false,
    isVideoOn: true,
    // Reply/Forward/Edit state
    replyingTo: null,
    forwardingMessage: null,
    editingMessage: null,
    selectedChatId: null,
    selectedMessageId: null
};

export const setState = (updates) => {
    Object.assign(state, updates);
};

export const toggleDarkModeState = (enabled) => {
    state.isDarkMode = enabled;
    localStorage.setItem('darkMode', enabled);
    return enabled;
};

export const startReply = (messageId) => {
    state.replyingTo = messageId;
    state.editingMessage = null;
    state.forwardingMessage = null;
};

export const cancelReply = () => {
    state.replyingTo = null;
};

export const startEdit = (messageId) => {
    state.editingMessage = messageId;
    state.replyingTo = null;
    state.forwardingMessage = null;
};

export const cancelEdit = () => {
    state.editingMessage = null;
};

export const startForward = (messageId) => {
    state.forwardingMessage = messageId;
    state.replyingTo = null;
    state.editingMessage = null;
};

export const cancelForward = () => {
    state.forwardingMessage = null;
};
