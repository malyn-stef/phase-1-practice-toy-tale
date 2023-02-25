let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }

  });

  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(dataToy => dataToy.forEach(toy => createToyCard(toy)))

  newToySubmit = document.querySelector("input[name = 'submit']")
  newToySubmit.addEventListener('click', e => handleNewToySubmit(e))


});


function createToyCard(toy) {
  const toyCollection = document.querySelector('div#toy-collection')
  const newCard = document.createElement('div')
  const newLikeButton = document.createElement('button')
  newLikeButton.className = 'like-btn'
  newLikeButton.id = toy.id
  newLikeButton.textContent = 'Like ❤️'
  newCard.className = 'card'
  newCard.innerHTML =
    `
  <h2>${toy.name}</h2>
  <img src = '${toy.image}' class='toy-avatar'/>
  <p>Likes: <span>${toy.likes}</span></p>
 `
  newLikeButton.addEventListener('click', e => handleToyLike(e))
  newCard.append(newLikeButton)

  toyCollection.appendChild(newCard)


}


function handleNewToySubmit(e) {
  e.preventDefault()
  const findName = document.querySelector("input[name = 'name']")
  const findImage = document.querySelector("input[name = 'image']")
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json'

    },
    body: JSON.stringify({
      "name": findName.value,
      "image": findImage.value,
      "likes": '0'
    })
  }).then(res => res.json())
    .then(data => createToyCard(data))

}

function handleToyLike(e) {
  const toyId = e.target.id
  const getLikesSection = e.target.parentNode.querySelector('span')

  newLikes = parseInt(getLikesSection.innerText) + 1
  fetch('http://localhost:3000/toys/' + toyId, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  })
    .then(res => res.json())
    .then(getLikesSection.innerText = newLikes)

}