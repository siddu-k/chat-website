const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');
const usernameInput = document.getElementById('username');

let userColor = null;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value && usernameInput.value) {
        if (!userColor) {
            userColor = getRandomColor();
        }
        const message = {
            name: usernameInput.value,
            text: input.value,
            color: userColor
        };
        socket.emit('chat message', message);
        input.value = '';
    } else {
        alert('Please enter your name and a message.');
    }
});

// Handle loading previous messages
socket.on('load previous messages', (messages) => {
    messages.forEach((msg) => {
        displayMessage(msg);
    });
});

socket.on('chat message', (msg) => {
    displayMessage(msg);
});

function displayMessage(msg) {
    const item = document.createElement('li');
    item.innerHTML = `<strong style="color: ${msg.color};">${msg.name}:</strong> ${msg.text}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
