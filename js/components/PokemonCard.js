const dataRow = document.querySelector("[data-row]");

 export default function PokemonCard(data) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card">
                  <img src="${data.image}" class="card-img-top" alt="${data.name}">
                  <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">${data.description}</p>
                    <a class="btn btn-primary" href="${data.link}" role="button">Visit</a>
      
                  </div>`;
    dataRow.appendChild(div);
  }

  