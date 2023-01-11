(() => {
    const container = document.getElementById('main-row');
    const query = location.search.split('=')[1];
    let images;

    depressions.forEach(d => {
        if (d.query === query) {
            images = d.images;
            return;
        }
    });

    if (images.length < 1) {
        container.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Na ten moment nie ma większej ilości zdjęć dla tego zapadliska. :(
            </div>
        `;
        return;
    }
    
    images.forEach(image => {
        container.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                    <img class="card-img-top" src="${image}">
                </div>
            </div>
        `
    });
})();