const addPicButton = document.querySelector('#addPicButton')
addPicButton.addEventListener('click', openNewPicForm)
let formOpen = false

function openNewPicForm(){
    const newPicFormContainer = document.querySelector('#newPicFormContainer')
    if(formOpen){
        newPicFormContainer.style.height = '0px'
        newPicFormContainer.style.padding = '0px'
    }
    else{
        newPicFormContainer.style.height = '280px'
        newPicFormContainer.style.padding = '20px'
    }
    formOpen = !formOpen
}

//****Start coding below****//

//get all photos 
const photoContainer = document.querySelector("#photoContainer");

fetch('http://localhost:3000/photos')
.then(response => response.json())
.then(photoData => {
    photoData.forEach(function(photo) {
        photoContainer.innerHTML += `<div class="photo">
        <h3>${photo.name}</h3>
        <p>${photo.owner}</p>
        <img src="${photo.photo_image_url}">
        <button class="removeButton">Remove</button>
    </div>`
    })
}
    );

    //add a new photo 
    const photoForm = document.querySelector("#newPicFormContainer");
    photoForm.addEventListener("submit", function(event) {
        event.preventDefault()

        const listingObject = {
            name: event.target.name.value,
            owner: event.target.owner.value,
            photo_image_url: event.target.photo_image_url.value
        }

    fetch(`http://localhost:3000/photos`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
},
body: JSON.stringify(listingObject)
})
.then(r => r.json())
.then(photo => {
    photoContainer.innerHTML = `<div class="photo">
        <h3>${photo.name}</h3>
        <p>${photo.owner}</p>
        <img src="${photo.photo_image_url}">
        <button class="removeButton">Remove</button>
    </div>`
    })
    })

    //delete photo 
    photoContainer.addEventListener("click", function(event) {
    if (event.target.matches(".removeButton")) {
        const outerPhoto = event.target.closest(".photo")
    
        fetch(`http://localhost:3000/photos/${outerPhoto.dataset.id}`, {
        method: "DELETE"
        })
        .then(res => {
            if (res.ok) {
            return res.json()
            } else {
            throw new Error(res.statusText)
            }
        })
        .then(data => {
            outerPhoto.remove()
        })
        .catch(err => {
            alert(err)
        })
    }

    });  
