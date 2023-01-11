(() => {
    const container = document.getElementById('main-row');
    depressions.forEach(d => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                    <img class="card-img-top" src="${d.imgSrc}"/>
                    <div class="card-body">
                        <p class="card-text">${d.name}. ${d.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <a class="btn btn-sm btn-outline-secondary" target='_blank'href="https://www.google.com/maps/search/${d.latitude},+${d.longitude}">Zobacz mapę</a>
                                <a class="btn btn-sm btn-outline-secondary" href="./images.html?zapadlisko=${d.query}">Więcej zdjęć</a>
                                <a class="btn btn-sm btn-outline-secondary" href="./media.html?zapadlisko=${d.query}">Media</a>
                            </div>
                            <small class="text-muted">${d.date}</small>
                        </div>
                    </div>
                </div>
            </div>
        `
    });
})();