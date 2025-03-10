document.addEventListener('DOMContentLoaded', function() {
    const messages = document.querySelectorAll('.message');
    const chatBox = document.querySelector('.chat-box');
    const form = document.querySelector('#chatForm');
    const input = document.querySelector('input[name="user_input"]');
    const typingIndicator = document.querySelector('#typingIndicator');

    // Animate messages on load
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.classList.add('animate-in');
        }, index * 100);
    });

    // Scroll to bottom of chat box
    if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const userInput = input.value.trim();
            if (userInput) {
                typingIndicator.style.display = 'flex';
                chatBox.scrollTop = chatBox.scrollHeight;

                setTimeout(() => {
                    typingIndicator.style.display = 'none';
                    form.submit();
                }, 1200);
            }
        });

        // Allow Enter key to send message
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                form.dispatchEvent(new Event('submit'));
            }
        });
    }

    // Update bot messages after Flask reload
    const botMessages = chatBox.querySelectorAll('.bot-message');
    botMessages.forEach((message) => {
        message.querySelector('.bot-text').textContent = message.getAttribute('data-response');
    });
});
