function userRequest(type) {
  addMessage(type, "user");
  addTypingToChat();
  fetchContent(type)
    .then((content) => {
      addMessage(content, "dad");
    })
    .catch((error) => {
      console.error("Error:", error);
      addMessage("I'm sorry, The server is not responding", "dad");
    })
    .finally(() => {
      removeTypingFromChat();
    });
}

function localRequest(type) {
  switch (type) {
    case "how-are-you":
      addMessage("How are you?", "user");
      addEmoji("👍", "dad");
      break;
    default:
      addMessage("I'm sorry, I don't understand", "dad");
  }
}

async function fetchContent(type) {
  const url = `/api/${type}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data[type][0].content)
    .then((content) => {
      return content;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "I'm sorry, The server is not responding";
    });
}

function addTypingToChat() {
  const chat = document.getElementById("chat");
  const typingElem = document.createElement("div");
  typingElem.innerText = "Typing...";
  typingElem.classList.add("typing");
  chat.appendChild(typingElem);
  chat.scrollTop = chat.scrollHeight; // Scroll to bottom
}

function removeTypingFromChat() {
  const chat = document.getElementById("chat");
  const typingElem = document.querySelector(".typing");
  chat.removeChild(typingElem);
}

function addMessage(text, className) {
  const chat = document.getElementById("chat");
  const messageElem = document.createElement("div");
  messageElem.classList.add("message", className);
  messageElem.innerText = text;
  chat.appendChild(messageElem);
  chat.scrollTop = chat.scrollHeight; // Scroll to bottom
}

function addEmoji(emoji, className) {
  const chat = document.getElementById("chat");
  const emojiElem = document.createElement("div");
  emojiElem.classList.add("emoji", className);
  emojiElem.innerText = emoji;
  chat.appendChild(emojiElem);
  chat.scrollTop = chat.scrollHeight; // Scroll to bottom
}

// Pill Listeners
document
  .getElementById("joke-pill")
  .addEventListener("click", () => userRequest("joke"));

document
  .getElementById("pickup-pill")
  .addEventListener("click", () => userRequest("pickup"));

document
  .getElementById("how-are-you-pill")
  .addEventListener("click", () => localRequest("how-are-you"));
