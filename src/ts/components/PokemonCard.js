export default function PokemonCard(data) {
  // obj destructuring
  const { image, link, description, name } = data;
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `
             <div class="card">
                  <img src="${image}" class="card-img-top" alt="${name}">
                  <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${description}</p>
                    ${
                      link
                        ? `<a class="btn btn-primary" href="${link}" role="button">Visit</a>`
                        : ""
                    }
      
            </div>`;
  return div;
}
