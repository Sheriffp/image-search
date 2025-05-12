const searchForm = document.getElementById("search-form");

const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more");
const apiKey = "uDfKcxHlebFV0wydOyOVyeFtmfZ2nQWFdjLqZqxt9aY";
let page = 1;
let keyword = "";

async function searchImages() {
	keyword = searchBox.value;
	const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&per_page=12&client_id=${apiKey}`;
	try {
		const response = await fetch(url);
		const data = await response.json();
		const results = data.results;

		results.map(result => {
			const image = document.createElement("img");
			image.src = result.urls.small;
			const imageLink = document.createElement("a");
			imageLink.href = result.links.html;
			imageLink.target = "_blank";
			const imageTitle = document.createElement("p");
			imageTitle.textContent = result.alt_description;
			imageLink.appendChild(image);
			imageLink.appendChild(imageTitle);
			searchResult.appendChild(imageLink);
		});
	} catch (error) {
		console.error("error fetching images", error);
	}
	showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", e => {
	e.preventDefault();
	page = 1;
	searchImages();
});

showMoreBtn.addEventListener("click", () => {
	page++;
	searchImages();
});
