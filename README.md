## Installation

1. Add a container div to your HTML:
```html
<div id="chat-container"></div>
```

2. Include the chat window script:
```html
<script src="path/to/chat-window.js"></script>
```

## Configuration

Initialize the chat window with your desired configuration:

```javascript
initPersonalAIChat({
    apiKey: 'YOUR_API_KEY_HERE',
    domainName: 'YOUR_DOMAIN_NAME',
    aiAvatarUrl: 'YOUR_AI_AVATAR_URL',
    userAvatarUrl: 'YOUR_USER_AVATAR_URL',
    chatbotName: 'AI Assistant',
    size: 'large',  // 'small', 'medium', or 'large'
    
    // Optional styling
    sendButtonColor: '#0387eb',
    messageIconColor: '#0387eb',
    userMessageColor: '#ffffff',
    userMessageTextColor: '#000000',
    aiMessageColor: '#ffffff',
    bubbleColor: '#0387eb',
    bubbleSize: '8px'
});
```

## Size Options

- Small: 300px × 400px
- Medium: 600px × 600px
- Large: 1000px × 100vh (full viewport height)

## Required Configuration

| Parameter | Description |
|-----------|-------------|
| apiKey | Your Personal AI API key |
| domainName | Your domain name for routing |
| aiAvatarUrl | URL for the AI avatar image |
| userAvatarUrl | URL for the user avatar image |
