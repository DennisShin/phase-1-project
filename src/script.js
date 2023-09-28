
let currentAnimalElement;
const form = document.querySelector("#animalForm");
const logo = document.querySelector(".logo-img")
let lastScrollY = window.scrollY;
const nav = document.querySelector(".navbar")


window.addEventListener("scroll", () => {
    if(lastScrollY < window.scrollY){
        nav.classList.add("nav--hidden");
    }else{
        nav.classList.remove("nav--hidden")
    }

    lastScrollY = window.scrollY
})

// Close the modal when clicked outside of it
// window.onclick = function (event) {
//     if (event.target === document.getElementById('detailsModal')) {
//         document.getElementById('detailsModal').style.display = 'none';
//     }
// }
logo.addEventListener("dblclick", (e) => {
    document.body.classList.toggle("dark");
    document.querySelector("#landing-image").classList.toggle("landing-dark")
    document.querySelector(".testimonial-section").classList.toggle("testimonial-dark")
    // console.log("dark")
})



function addAnimal(animal) {
    //Get animal details
    const name = animal.name;
    const breed = animal.breed;
    const image = animal.image;
    const description = animal.description;
    const id = animal.id;

    // Create the new animal element
    const animalDiv = document.createElement('div');
    animalDiv.id = id
    animalDiv.classList.add('animal');
    animalDiv.onclick = function () { showDetails(name, breed, image, description) };

    const animalImg = document.createElement('img');
    animalImg.src = image;
    animalImg.alt = breed;

    const animalName = document.createElement('h3');
    animalName.innerText = name;

    const animalBreed = document.createElement('p');
    animalBreed.innerText = breed;

    animalDiv.appendChild(animalImg);
    animalDiv.appendChild(animalName);
    animalDiv.appendChild(animalBreed);

    // Append the new animal element to the animals grid
    document.querySelector('.animals-grid').appendChild(animalDiv);

    // Clear the form
    document.getElementById('animalForm').reset();
}



function showDetails(name, breed, imgSrc, description) {
    document.getElementById('animalName').innerText = name + " (" + breed + ")";
    document.getElementById('animalImage').src = imgSrc;
    document.getElementById('animalDescription').innerText = description;
    document.getElementById('detailsModal').style.display = 'block';
    document.getElementById('modalContainer').style.display = 'block';

    // Find the animal element based on its name (assuming unique names for simplicity)
    const animals = document.querySelectorAll('.animal');
    for (let animal of animals) {
        if (animal.querySelector('h3').innerText === name) {
            currentAnimalElement = animal;
            break;
        }
    }
}

function hideModal() {
    // Hide the modal container
    document.getElementById('modalContainer').style.display = 'none';
}


function deleteAnimal() {
    //Confirm the user wants to remove the animal
    const isConfirmed = confirm("Are you sure you want to delete this animal from the list?")

    if (!isConfirmed) return;
    // Remove the animal from the grid
    if (currentAnimalElement) {
        currentAnimalElement.remove();
        console.log(currentAnimalElement)
        fetch("http://localhost:3000/animals/" + currentAnimalElement.id, {
            method: "DELETE"
        })
        // Hide the modal
        document.getElementById('detailsModal').style.display = 'none';
        hideModal();
    }


}

fetch("http://localhost:3000/animals")
    .then(response => response.json())
    .then((animals) => {
        animals.forEach(animal => {
            addAnimal(animal)
        });
    })


form.addEventListener("submit", (e) => {
    e.preventDefault()
    let newName = e.target.name.value;
    let newBreed = e.target.breed.value;
    let newImage = e.target.image.value;
    let newDesc = e.target.description.value;

    fetch("http://localhost:3000/animals", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "name": newName,
            "breed": newBreed,
            "description": newDesc,
            "image": newImage
        })
    })
        .then(res => res.json())
        .then(data => {
            addAnimal(data)
        })
})











