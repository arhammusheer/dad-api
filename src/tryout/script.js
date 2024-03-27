document.getElementById("jokeBtn").onclick = function () {
	fetchJoke("https://dad.croissant.one/api/joke", "joke");
};

document.getElementById("pickupBtn").onclick = function () {
	fetchJoke("https://dad.croissant.one/api/pickup", "pickup");
};

function fetchJoke(url, elementId) {
	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const elem = document.getElementById(elementId);
			elem.style.opacity = "0";
			setTimeout(() => {
				elem.textContent = data[elementId][0].content;
				elem.style.opacity = "1";
			}, 300); // Wait for the fade out to finish before changing the text and fading back in
		})
		.catch((error) => console.error("Error:", error));
}