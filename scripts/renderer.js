const renderHeader = () => `
    <div class="container">
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            Siersza | Zapadliska
            <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="./" class="nav-link px-2 link-dark">Strona główna</a></li>
                <li><a href="../pages/video.html" class="nav-link px-2 link-dark">Materiały wideo dotyczące zapadlisk</a></li>
            </ul>
        </header>
    </div>
    <div class="px-4 py-1 my-1 text-center">
        <h1 id="title" class="fw-bold"></h1>
        <div class="col-lg-6 mx-auto">
            <p id="description" class="lead mb-4"></p>
            <!--
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
                <button type="button" class="btn btn-outline-secondary btn-lg px-4">Secondary</button>
            </div>
            -->
        </div>
    </div>
    <main role="main">
        <div class="album py-5 bg-light">
            <div id="main-container" class="container"></div>
        </div>
    </main>
`;

const renderFooter = renderHomePageButton => `
    <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
            ${renderHomePageButton ? '<li class="nav-item"><a href="../" class="nav-link px-2 text-muted">Strona główna</a></li>' : ''}
            <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Do góry</a></li>
        </ul>
        <p class="text-center text-muted">&copy; 2023 Siersza</p>
    </footer>
`;

const renderErrorMessage = message => `
    <div class="alert alert-danger" role="alert">
        ${message}
    </div>
`;

const renderCard = depression => `
    <div class="col-md-4">
        <div class="card mb-4 box-shadow">
            <img class="card-img-top" src="${depression.imgSrc}"/>
            <div class="card-body">
                <p class="card-text">${depression.name}. ${depression.description}</p>
                <ul>
                    <li>Głębokość: ${depression.depth} ${depression.depth === 'b.d.' ? '' : 'metrów.'}</li>
                    <li>Średnica: ${depression.diameter} ${depression.diameter === 'b.d.' ? '' : 'metrów.'}</li>
                </ul>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <a class="btn btn-sm btn-outline-primary" target='_blank'href="https://www.google.com/maps/search/${depression.latitude},+${depression.longitude}">Zobacz mapę</a>
                        <a class="btn btn-sm btn-outline-success" href="./pages/images.html?zapadlisko=${depression.query}">Więcej zdjęć</a>
                        <a class="btn btn-sm btn-outline-danger" href="./pages/media.html?zapadlisko=${depression.query}">Media</a>
                    </div>
                    <small class="text-muted">${depression.date}</small>
                </div>
            </div>
        </div>
    </div>
`;

const renderMediaContainer = () => `
    <div id="media-container" class="list-group" style="overflow-wrap: break-word;"></div>
`;

const renderMedia = url => `
    <a href=${url} target="_blank" class="list-group-item list-group-item-action">${url}</a>
`;

const renderImagesContainer = () => `
    <div id="images-container" class="row"></div>
`;

const renderImage = url => `
    <div class="col-md-4">
        <div class="mb-4 box-shadow">
            <a href=${url} target="_blank"><img class="card-img-top" src="${url}"></a>
        </div>
    </div>
`;

const renderBody = (renderHomePageButton, dataContainer) => {
    document.body.insertAdjacentHTML('afterbegin', renderHeader());
    document.body.insertAdjacentHTML('beforeend', renderFooter(renderHomePageButton));

    const container = document.getElementById('main-container');
    if (dataContainer !== undefined) {
        container.innerHTML = dataContainer;
    }
}

export {
    renderHeader,
    renderFooter,
    renderErrorMessage,
    renderCard,
    renderMediaContainer,
    renderMedia,
    renderImagesContainer,
    renderImage,
    renderBody
};
