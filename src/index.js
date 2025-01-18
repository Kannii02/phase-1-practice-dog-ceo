document.addEventListener("DOMContentLoaded", () => {
    console.log('%c HI', 'color: firebrick'); 

    fetchImages();  
    fetchBreeds();  
});

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            renderImages(data.message);
        })
        .catch(error => console.error("Error fetching images:", error));
}

function renderImages(imageUrls) {
    const container = document.getElementById("dog-image-container");
    container.innerHTML = ""; 

    imageUrls.forEach(imageUrl => {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "A Random Dog";
        img.style.width = "200px"; 
        img.style.margin = "10px"; 
        container.appendChild(img);
    });
}

function fetchBreeds() {
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = []; 

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            allBreeds = Object.keys(data.message);
            renderBreeds(allBreeds); 
            enableBreedFiltering(allBreeds); 
        })
        .catch(error => console.error("Error fetching breeds:", error));
}

function renderBreeds(breeds) {
    const breedList = document.getElementById("dog-breeds");
    breedList.innerHTML = ""; 

    breeds.forEach(breed => {
        const li = document.createElement("li");
        li.innerText = breed;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            li.style.color = "blue";
            fetchBreedImages(breed);
        });

        breedList.appendChild(li);
    });
}

function fetchBreedImages(breed) {

    const formattedBreed = breed.includes(" ") ? breed.split(" ").join("/") : breed;
    const breedImageUrl = `https://dog.ceo/api/breed/${formattedBreed}/images/random/4`;

    console.log(`Fetching images for: ${breed} -> API Format: ${formattedBreed}`); 

    fetch(breedImageUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Images:", data.message); 
            renderImages(data.message);
        })
        .catch(error => console.error(`Error fetching images for breed ${breed}:`, error));
}

function enableBreedFiltering(allBreeds) {
    const breedDropdown = document.getElementById("breed-dropdown");

    breedDropdown.addEventListener("change", (event) => {
        const selectedLetter = event.target.value;
        console.log(`Filtering breeds that start with: ${selectedLetter}`); 

        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(selectedLetter));

        console.log("Filtered breeds:", filteredBreeds); 
        renderBreeds(filteredBreeds); 
    });
}
