document.addEventListener('DOMContentLoaded', function() {
    const messages = document.querySelectorAll('.message');
    const chatBox = document.querySelector('.chat-box');
    const form = document.querySelector('#chatForm');
    const input = document.querySelector('input[name="user_input"]');
    const typingIndicator = document.querySelector('#typingIndicator');

    // Add animation class to all messages for initial load
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.classList.add('animate-in');
        }, index * 100); // Stagger animations slightly for each message
    });

    // Scroll to the bottom of the chat box on load
    if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Handle form submission (via button or Enter key)
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const userInput = input.value.trim();
            if (userInput) {
                // Show typing indicator
                if (typingIndicator) {
                    typingIndicator.style.display = 'block';
                    chatBox.scrollTop = chatBox.scrollHeight;
                }

                // Submit the form to Flask
                form.submit();

                // Hide typing indicator after submission (handled by Flask reload)
                if (typingIndicator) {
                    typingIndicator.style.display = 'none';
                }
            }
        });

        // Allow Enter key to submit
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                form.dispatchEvent(new Event('submit'));
            }
        });
    }

    // Handle new messages after Flask reload (scroll to bottom)
    setTimeout(() => {
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, 100); // Small delay to ensure DOM is ready

    // Remove typing animation logic for bot messages.
    // This ensures bot responses appear instantly.
    const botMessages = chatBox.querySelectorAll('.bot-message');
    botMessages.forEach((message) => {
        message.querySelector('.bot-text').textContent = message.getAttribute('data-response');
    });
});
