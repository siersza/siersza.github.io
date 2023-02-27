export const renderErrorMessage = message => `
    <div class="alert alert-danger" role="alert">
        ${message}
    </div>
`;

export const renderCard = depression => `
    <div class="col-md-4">
        <div class="card mb-4 box-shadow">
            <img class="card-img-top" src="${depression.imgSrc}"/>
            <div class="card-body">
                <p class="card-text">${depression.name}. ${depression.description}</p>
                <ul>
                    <li>Głębokość: ${depression.depth} ${depression.depth === 'b.d.' ? '' : 'metry/ów.'}</li>
                    <li>Średnica: ${depression.diameter} ${depression.diameter === 'b.d.' ? '' : 'metry/ów.'}</li>
                </ul>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <a class="btn btn-sm btn-outline-primary" target='_blank' href="https://www.google.com/maps/search/${depression.latitude},+${depression.longitude}">Zobacz mapę</a>
                        <button class="btn btn-sm btn-outline-success" data-id="${depression.id}">Więcej zdjęć</button>
                        <button class="btn btn-sm btn-outline-danger" data-id="${depression.id}" href="./pages/media.html?zapadlisko=${depression.query}">Media</button>
                    </div>
                    <small class="text-muted">${depression.date}</small>
                </div>
            </div>
        </div>
    </div>
`;

export const renderURL = url => {
    return `
        <a href=${url.href} target="_blank" class="list-group-item list-group-item-action">${url.title !== '' ? url.title : url.href}</a>
    `;
}

export const renderGalleryImage = url => `
    <div class="col-md-4">
        <div class="mb-4 box-shadow">
            <a href=${url} target="_blank"><img class="card-img-top" src="${url}"></a>
        </div>
    </div>
`;

export const renderImage = url => `
    <a href="${url}" target="_blank">
        <img src="${url}" class="rounded mx-auto d-block" style="margin: 30px"></img>
    </a>
`;