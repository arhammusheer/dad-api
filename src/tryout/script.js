function userRequest(type) {
	const userMessage = type === 'joke' ? "Tell me a joke" : "Tell me a pickup line";
	addMessage(userMessage, 'user');
	fetchContent(type);
}

function fetchContent(type) {
	const url = `https://dad.croissant.one/api/${type}`;
	fetch(url)
			.then(response => response.json())
			.then(data => {
					addMessage(data[type][0].content, 'dad');
			})
			.catch(error => console.error('Error:', error));
}

function addMessage(text, className) {
	const chat = document.getElementById('chat');
	const messageElem = document.createElement('div');
	messageElem.classList.add('message', className);
	messageElem.innerText = text;
	chat.appendChild(messageElem);
	chat.scrollTop = chat.scrollHeight; // Scroll to bottom
}