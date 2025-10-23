const composerForm = document.querySelector('#composer');
const messageInput = document.querySelector('#message-input');
const chatScroll = document.querySelector('#chat-scroll');
const template = document.querySelector('#message-template');

const chatbotReplies = [
  "That's interesting! Tell me more.",
  "I hear you. How does that make you feel?",
  "Let's think about another angle. What else comes to mind?",
  "I appreciate you sharing that!",
  "Could you clarify a bit more?",
  "Sounds like we're onto something exciting!",
  "Hmm, have you considered a different approach?",
  "Great question! I'll have to ponder that.",
];

function createMessage({ text, sender, direction }) {
  const clone = template.content.cloneNode(true);
  const message = clone.querySelector('.message');
  const avatar = clone.querySelector('.message__avatar');
  const bubble = clone.querySelector('.message__bubble');
  const name = clone.querySelector('.message__sender');
  const timestamp = clone.querySelector('.message__timestamp');

  const now = new Date();
  timestamp.dateTime = now.toISOString();
  timestamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  name.textContent = sender;
  bubble.textContent = text;

  if (direction === 'outgoing') {
    message.classList.add('message--outgoing');
    avatar.textContent = '🧑';
  } else {
    message.classList.add('message--incoming');
    avatar.textContent = '🤖';
  }

  return clone;
}

function addMessage(messageDetails) {
  const messageNode = createMessage(messageDetails);
  chatScroll.appendChild(messageNode);
  chatScroll.scrollTop = chatScroll.scrollHeight;
}

function replyFromBot() {
  const reply = chatbotReplies[Math.floor(Math.random() * chatbotReplies.length)];
  addMessage({ text: reply, sender: 'Chatbot', direction: 'incoming' });
}

composerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = messageInput.value.trim();

  if (!text) {
    messageInput.focus();
    return;
  }

  addMessage({ text, sender: 'You', direction: 'outgoing' });
  messageInput.value = '';
  messageInput.focus();

  window.requestAnimationFrame(() => {
    setTimeout(replyFromBot, 450);
  });
});

messageInput.addEventListener('input', () => {
  messageInput.style.height = 'auto';
  messageInput.style.height = `${Math.min(messageInput.scrollHeight, 140)}px`;
});

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    composerForm.requestSubmit();
  }
});

messageInput.focus();
