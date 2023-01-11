export function renderHeader() {
    return `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Sierszańskie Zapadliska</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="./">Home</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        <main role="main">
            <section class="jumbotron text-center">
                <div class="container">
                    <h1 class="jumbotron-heading">Sierszańskie Zapadliska</h1>
                    <p class="lead text-muted">Strona o sierszańskich zapadliskach</p>
                    <!-- <p>
                        <a href="#" class="btn btn-primary my-2">Main call to action</a>
                        <a href="#" class="btn btn-secondary my-2">Secondary action</a>
                    </p> -->
                </div>
            </section>
        </main>
    `;
}

export function renderFooter() {
    return `
        <footer class="text-muted">
            <div class="container">
                <p class="float-right">
                    <a href="#">Powrót do góry</a>
                </p>
            </div>
        </footer>
    `;
}