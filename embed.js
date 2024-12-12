// Configuration and Initialization Script
<script>
document.addEventListener('DOMContentLoaded', function() {
    initPersonalAIChat({
        apiKey: 'YOUR_API_KEY_HERE',
        domainName: 'YOUR_DOMAIN_NAME',
        aiAvatarUrl: 'YOUR_AI_AVATAR_URL',
        userAvatarUrl: 'YOUR_USER_AVATAR_URL',
        chatbotName: 'AI Assistant',
        sendButtonColor: '#0387eb',
        messageIconColor: '#0387eb',
        userMessageColor: '#ffffff',
        userMessageTextColor: '#000000',
        aiMessageColor: '#ffffff',
        bubbleColor: '#0387eb',
        bubbleSize: '8px',
        size: 'large' // can be 'small', 'medium', or 'large'
    });
});
</script>


<script>
(function() {
    window.initPersonalAIChat = function(config) {
        // Size presets
        const sizePresets = {
            small: {
                height: '400px',
                width: '300px'
            },
            medium: {
                height: '600px',
                width: '600px'
            },
            large: {
                height: '100vh',
                width: '1000px'
            }
        };

        // Get size settings from config or default to large
        const size = sizePresets[config.size || 'large'];

        // Merge config with defaults
        config = {
            ...config,
            userMessageColor: config.userMessageColor || '#007bff',
            aiMessageColor: config.aiMessageColor || '#ffffff',
            bubbleColor: config.bubbleColor || '#6566FF',
            bubbleSize: config.bubbleSize || '8px'
        };

        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css?family=Inter');

            #personal-ai-chat {
                font-family: "Inter", sans-serif !important;
                height: ${size.height};
                display: flex;
                flex-direction: column;
                max-width: ${size.width};
                margin-left: auto;
                margin-right: auto;
                width: 90%;
            }

            .pai-chat-window {
                display: flex;
                flex-direction: column;
                height: 100%;
                background-color: #fff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }

            .pai-chat-header {
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px 10px;
                border-bottom: 1px solid #EFF0F6;
                background-color: #fff;
            }

            .pai-chat-header-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .pai-chat-avatar-header {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            .pai-chat-title {
                font-size: 16px;
                font-weight: bold;
                color: #2B263E;
            }

            .pai-chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                background-color: #f5f5f5;
            }

            .pai-chat-message {
                display: flex;
                align-items: flex-start;
                margin-bottom: 15px;
                max-width: 80%;
            }

            .pai-chat-message.ai {
                margin-right: auto;
            }

            .pai-chat-message.user {
                margin-left: auto;
                flex-direction: row-reverse;
            }

            .pai-chat-message-avatar {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                margin: 0 10px;
            }

            .pai-chat-message-content {
                padding: 15px 20px;
                border-radius: 15px;
                box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }

            .pai-chat-message-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                font-size: 12px;
            }

            .pai-chat-message.ai .pai-chat-message-content {
                background-color: #fff;
                color: #000;
                border: 1px solid ${config.aiMessageColor};
            }

            .pai-chat-message.user .pai-chat-message-content {
                background-color: ${config.userMessageColor};
                color: ${config.userMessageTextColor || '#000000'};
            }

            .pai-chat-message-time {
                font-size: 11px;
                color: #666;
                text-align: right;
                margin-top: 5px;
                padding-right: 2px;
            }

            .pai-chat-message-name {
                font-weight: bold;
                padding-right: 24px;
            }

            .pai-chat-input-wrapper {
                padding: 20px;
                background: #fff;
                border-top: 1px solid #EFF0F6;
                display: flex;
                align-items: center;
                gap: 10px;
            }

            .pai-chat-input {
                flex: 1;
                border: 1px solid #EFF0F6;
                border-radius: 20px;
                padding: 12px 15px;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                line-height: 1.4;
                resize: none;
                outline: none;
                max-height: 100px;
                overflow-y: auto;
            }

            .pai-chat-send {
                background: none;
                border: none;
                cursor: pointer;
                padding: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .pai-chat-send svg {
                width: 24px;
                height: 24px;
                fill: ${config.sendButtonColor};
            }

            .pai-chat-typing-indicator {
                display: inline-flex;
                align-items: center;
                padding: 8px 0;
            }

            .pai-chat-typing-indicator span {
                height: ${config.bubbleSize};
                width: ${config.bubbleSize};
                background-color: ${config.bubbleColor};
                border-radius: 50%;
                display: inline-block;
                margin-right: 5px;
                animation: typing 0.5s infinite ease-in-out;
            }

            .pai-chat-typing-indicator span:nth-child(1) {
                animation-delay: 0s;
            }

            .pai-chat-typing-indicator span:nth-child(2) {
                animation-delay: 0.2s;
            }

            .pai-chat-typing-indicator span:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes typing {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-5px); }
            }

            .pai-chat-loading {
                text-align: center;
                padding: 20px;
                color: #666;
            }
        `;
        document.head.appendChild(style);

        const chatHtml = `
            <div id="personal-ai-chat">
                <div class="pai-chat-window">
                    <div class="pai-chat-header">
                        <div class="pai-chat-header-content">
                            <img src="${config.aiAvatarUrl}" alt="AI Avatar" class="pai-chat-avatar-header">
                            <span class="pai-chat-title">Chat with ${config.chatbotName}</span>
                        </div>
                    </div>
                    <div class="pai-chat-messages"></div>
                    <div class="pai-chat-input-wrapper">
                        <textarea class="pai-chat-input" placeholder="Type your message..."></textarea>
                        <button class="pai-chat-send">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('chat-container');
        if (!container) {
            console.error('Container element with id "chat-container" not found');
            return;
        }
        container.innerHTML = chatHtml;

        const chatMessages = document.querySelector('.pai-chat-messages');
        const input = document.querySelector('.pai-chat-input');
        const sendButton = document.querySelector('.pai-chat-send');

        let sessionId = localStorage.getItem('chat_session');

        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
        }

        function processMessage(message) {
            return message;
        }

        async function sendMessage(message) {
            if (!message.trim()) return;

            input.value = '';
            input.style.height = 'auto';

            // Create user message
            const userMessage = document.createElement('div');
            userMessage.classList.add('pai-chat-message', 'user');
            const userTime = getCurrentTime();
            
            userMessage.innerHTML = `
            <img src="${config.userAvatarUrl}" alt="User Avatar" class="pai-chat-message-avatar">
            <div class="pai-chat-message-content">
                <div class="pai-chat-message-header">
                    <span class="pai-chat-message-name">You</span>
                    <span class="pai-chat-message-time">${userTime}</span>
                </div>
                <div class="pai-chat-message-text">${message}</div>
            </div>
            `;
            chatMessages.appendChild(userMessage);

            // Create AI message with typing indicator
            const aiMessage = document.createElement('div');
            aiMessage.classList.add('pai-chat-message', 'ai');
            const aiTime = getCurrentTime();
            
            aiMessage.innerHTML = `
            <img src="${config.aiAvatarUrl}" alt="AI Avatar" class="pai-chat-message-avatar">
            <div class="pai-chat-message-content">
                <div class="pai-chat-message-header">
                    <span class="pai-chat-message-name">${config.chatbotName}</span>
                    <span class="pai-chat-message-time">${aiTime}</span>
                </div>
                <div class="pai-chat-message-text">
                    <div class="pai-chat-typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
           `;
            chatMessages.appendChild(aiMessage);
            
            const aiMessageText = aiMessage.querySelector('.pai-chat-message-text');

            try {
                const response = await fetch('https://api.personal.ai/v1/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': config.apiKey
                    },
                    body: JSON.stringify({
                        Text: message,
                        UserName: 'Visitor',
                        SourceName: "WebChat",
                        SessionId: sessionId,
                        DomainName: config.domainName,
                        is_draft: false
                    })
                });
            
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                const typingIndicator = aiMessageText.querySelector('.pai-chat-typing-indicator');
                if (typingIndicator) {
                    typingIndicator.remove();
                }

                if (data.ai_message) {
                    aiMessageText.innerHTML = processMessage(data.ai_message);
                }
                
                if (data.SessionId) {
                    sessionId = data.SessionId;
                    localStorage.setItem('chat_session', sessionId);
                }

            } catch (error) {
                console.error('API Error:', error);
                const errorMessage = error.message || "Sorry, there was an error processing your request.";
                aiMessageText.innerHTML = errorMessage;
                
                console.log('Full error details:', {
                    message: error.message,
                    stack: error.stack,
                    response: error.response
                });
            }

            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Event listeners
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e.target.value);
            }
        });

        input.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 100) + 'px';
        });

        sendButton.addEventListener('click', () => sendMessage(input.value));
    };
})();
</script>
