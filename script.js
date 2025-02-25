// Function to send a message
function sendMessage() {
    let userInput = document.getElementById("user-input");
    let message = userInput.value.trim();
    if (message === "") return;

    // Add user message to chat
    let chatBox = document.getElementById("chat-box");
    let userMessage = document.createElement("div");
    userMessage.classList.add("user-message");
    userMessage.textContent = message;
    chatBox.appendChild(userMessage);

    // Auto-reply (mock chatbot response)
    setTimeout(() => {
        let botMessage = document.createElement("div");
        botMessage.classList.add("bot-message");
        botMessage.textContent = "I'm here to help with diabetic retinopathy! What would you like to know?";
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);

    // Clear input
    userInput.value = "";
}

// Function to detect "Enter" key press
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents new line in input
        sendMessage(); // Calls sendMessage() when Enter is pressed
    }
});
