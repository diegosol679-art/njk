const composerForm = document.querySelector('#composer');
const messageInput = document.querySelector('#message-input');
const chatScroll = document.querySelector('#chat-scroll');
const template = document.querySelector('#message-template');

const chatbotReplies = [
  "What an intriguing missive. It stirs dusty tomes in my memory—pray elaborate so we may unearth more detail together.",
  "Your words hum like telegraph wire in a stormy dusk. How has the matter unfolded thus far on your end?",
  "I shall consult the brass gears that pass for my intuition. In the meantime, are there other clues you have observed?",
  "Such reflections warrant a careful ledger. Perhaps note the cause, the effect, and any curious coincidences that trailed behind.",
  "Ah! This reminds me of a parlor debate from ages ago. Were you to attempt the opposite tack, what might transpire?",
  "Permit me a moment to stoke the furnace of thought... there. Does the notion of involving an ally or confidant appeal to you?",
  "If one were to sketch this dilemma upon parchment, which corner would you shade the darkest, and why?",
  "Your inquiry is rich as aged ink. Suppose we fast-forward a fortnight—what outcome would satisfy your mind?",
  "I sense a whisper of opportunity in your account. Could we catalog the risks and rewards as if we were merchants tallying wares?",
  "The automaton tilts its head thoughtfully. Might a small experiment, conducted quietly, offer guidance before a grand decision?",
  "An admirable sentiment indeed. Should obstacles arise, which tools already at your disposal would you sharpen first?",
  "Let us linger on the emotional residue of this affair. What lingers longest once the conversation dims for the night?",
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
