const container = document.getElementById('main-row');

function generate(zapadliska) {
    zapadliska.forEach(zapadlisko => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="${zapadlisko.imgSrc}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">${zapadlisko.name}. ${zapadlisko.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a class="btn btn-sm btn-outline-secondary" target='_blank'href="https://www.google.com/maps/search/${zapadlisko.latitude},+${zapadlisko.longitude}">Zobacz mapę</a>
                                <a class="btn btn-sm btn-outline-secondary" href="./images.html?zapadlisko=${zapadlisko.query}">Więcej zdjęć</a>
                            </div>
                        <small class="text-muted">${zapadlisko.date}</small>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    // <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
}

generate(zapadliska);